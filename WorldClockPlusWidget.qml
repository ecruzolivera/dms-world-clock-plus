import QtQuick
import Quickshell
import Quickshell.Io
import qs.Common
import qs.Widgets
import qs.Modules.Plugins
import "Cities.js" as Cities

PluginComponent {
    id: root

    // ── Settings (pluginData is reloaded by DMS on every save) ──────
    readonly property var timezones: Array.isArray(pluginData.timezones) ? pluginData.timezones : []
    readonly property bool showAll: pluginData.showAll !== false
    readonly property int cycleInterval: pluginData.cycleInterval || 15
    readonly property bool use24h: pluginData.use24h !== false

    // ── Runtime state ───────────────────────────────────────────────
    property int currentIndex: 0
    property var timeMap: ({})          // tz -> {h, m, off, wd}
    property var localInfo: ({ h: 0, m: 0, off: 0, wd: "", date: "" })
    property var zoneNames: []          // IANA zones from system zone.tab
    property bool _rerun: false

    readonly property var weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    onTimezonesChanged: {
        if (currentIndex >= timezones.length)
            currentIndex = 0;
        refreshTimes();
    }

    Component.onCompleted: refreshTimes()

    SystemClock {
        precision: SystemClock.Minutes
        onDateChanged: root.refreshTimes()
    }

    // ── Persistence ─────────────────────────────────────────────────
    function saveTimezones(list) {
        if (pluginService)
            pluginService.savePluginData(pluginId, "timezones", list);
    }

    function addClock(result) {
        var list = timezones.slice();
        list.push({ timezone: result.timezone, label: result.label });
        saveTimezones(list);
    }

    function removeClock(i) {
        var list = timezones.slice();
        list.splice(i, 1);
        saveTimezones(list);
    }

    function moveClock(i, delta) {
        var j = i + delta;
        if (j < 0 || j >= timezones.length)
            return;
        var list = timezones.slice();
        var t = list[i];
        list[i] = list[j];
        list[j] = t;
        saveTimezones(list);
    }

    function renameClock(i, label) {
        var list = timezones.slice();
        list[i] = { timezone: list[i].timezone, label: label.trim() };
        saveTimezones(list);
    }

    // ── Time fetching: one batched `date` call per minute ───────────
    function refreshTimes() {
        var now = new Date();
        localInfo = { h: now.getHours(), m: now.getMinutes(), off: -now.getTimezoneOffset(), wd: weekdays[now.getDay()], date: Qt.formatDate(now, "ddd, MMM d") };

        if (timezones.length === 0)
            return;
        if (timeProc.running) {
            _rerun = true;
            return;
        }
        var cmd = ["bash", "-c", "for z in \"$@\"; do printf '%s|' \"$z\"; TZ=\"$z\" LC_ALL=C date +'%H|%M|%z|%a'; done", "_"];
        for (var i = 0; i < timezones.length; i++)
            cmd.push(timezones[i].timezone);
        timeProc.command = cmd;
        timeProc.running = true;
    }

    Process {
        id: timeProc
        stdout: StdioCollector {
            onStreamFinished: {
                var map = {};
                var lines = text.trim().split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var p = lines[i].split("|");
                    if (p.length !== 5)
                        continue;
                    var sign = p[3][0] === "-" ? -1 : 1;
                    var off = sign * (parseInt(p[3].substr(1, 2), 10) * 60 + parseInt(p[3].substr(3, 2), 10));
                    map[p[0]] = { h: parseInt(p[1], 10), m: parseInt(p[2], 10), off: off, wd: p[4] };
                }
                root.timeMap = map;
            }
        }
        onExited: {
            if (root._rerun) {
                root._rerun = false;
                root.refreshTimes();
            }
        }
    }

    // Zone list for search, loaded lazily on first search.
    FileView {
        id: zoneTab
        path: "/usr/share/zoneinfo/zone.tab"
        blockLoading: true
    }

    function ensureZones() {
        if (zoneNames.length > 0)
            return;
        var names = [];
        var lines = (zoneTab.text() || "").split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i] || lines[i][0] === "#")
                continue;
            var cols = lines[i].split("\t");
            if (cols.length >= 3)
                names.push(cols[2]);
        }
        if (names.length > 0)
            zoneNames = names.concat(["Etc/UTC"]);
    }

    // ── Cycling ─────────────────────────────────────────────────────
    Timer {
        interval: root.cycleInterval * 1000
        running: !root.showAll && root.timezones.length > 1
        repeat: true
        onTriggered: root.currentIndex = (root.currentIndex + 1) % root.timezones.length
    }

    // ── Formatting helpers ──────────────────────────────────────────
    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    function formatHM(info) {
        if (!info)
            return "…";
        if (use24h)
            return pad(info.h) + ":" + pad(info.m);
        return ((info.h % 12) || 12) + ":" + pad(info.m) + " " + (info.h < 12 ? "AM" : "PM");
    }

    function labelFor(entry) {
        return (entry && entry.label) ? entry.label : Cities.cityFromTz(entry ? entry.timezone : "");
    }

    function offsetText(info) {
        if (!info)
            return "";
        var d = info.off - localInfo.off;
        if (d === 0)
            return "same time";
        var a = Math.abs(d);
        var s = (d > 0 ? "+" : "−") + Math.floor(a / 60);
        if (a % 60)
            s += ":" + pad(a % 60);
        return s + "h";
    }

    function isDay(info) {
        return info && info.h >= 6 && info.h < 18;
    }

    function copyText(label, info) {
        if (!info)
            return;
        Quickshell.execDetached(["wl-copy", label + " " + formatHM(info) + " (" + info.wd + ")"]);
    }

    readonly property var visibleModel: {
        if (timezones.length === 0)
            return [];
        if (showAll)
            return timezones;
        return [timezones[Math.min(currentIndex, timezones.length - 1)]];
    }

    // ── Bar pills ───────────────────────────────────────────────────
    horizontalBarPill: Component {
        Row {
            spacing: Theme.spacingS

            Repeater {
                model: root.visibleModel

                Row {
                    spacing: Theme.spacingS
                    anchors.verticalCenter: parent.verticalCenter

                    StyledText {
                        text: "·"
                        font.pixelSize: Theme.fontSizeMedium
                        color: Theme.withAlpha(Theme.surfaceText, 0.4)
                        visible: index > 0
                        anchors.verticalCenter: parent.verticalCenter
                    }

                    StyledText {
                        text: root.labelFor(modelData) + " " + root.formatHM(root.timeMap[modelData.timezone])
                        font.pixelSize: Theme.fontSizeMedium
                        color: Theme.surfaceText
                        anchors.verticalCenter: parent.verticalCenter
                    }
                }
            }

            StyledText {
                text: "World Clock"
                font.pixelSize: Theme.fontSizeMedium
                color: Theme.surfaceVariantText
                anchors.verticalCenter: parent.verticalCenter
                visible: root.timezones.length === 0
            }
        }
    }

    verticalBarPill: Component {
        Column {
            spacing: Theme.spacingXS

            Repeater {
                model: root.visibleModel

                Column {
                    spacing: 1
                    anchors.horizontalCenter: parent.horizontalCenter

                    StyledText {
                        text: root.labelFor(modelData)
                        font.pixelSize: Theme.fontSizeSmall
                        color: Theme.surfaceVariantText
                        anchors.horizontalCenter: parent.horizontalCenter
                    }

                    StyledText {
                        text: root.formatHM(root.timeMap[modelData.timezone])
                        font.pixelSize: Theme.fontSizeSmall
                        color: Theme.surfaceText
                        anchors.horizontalCenter: parent.horizontalCenter
                    }
                }
            }

            DankIcon {
                name: "public"
                size: Theme.iconSize - 4
                color: Theme.surfaceVariantText
                anchors.horizontalCenter: parent.horizontalCenter
                visible: root.timezones.length === 0
            }
        }
    }

    // ── Popout ──────────────────────────────────────────────────────
    popoutWidth: 420

    popoutContent: Component {
        Column {
            id: pop
            spacing: Theme.spacingM

            property var parentPopout: null
            property var results: []
            property int selected: 0
            property int editingIndex: -1
            property int copiedIndex: -99   // -1 = local row

            function runSearch() {
                root.ensureZones();
                results = Cities.search(searchField.text, root.zoneNames, 8);
                selected = 0;
            }

            function pick(i) {
                if (i < 0 || i >= results.length)
                    return;
                root.addClock(results[i]);
                searchField.text = "";
                results = [];
            }

            function markCopied(i) {
                copiedIndex = i;
                copiedTimer.restart();
            }

            Timer {
                id: copiedTimer
                interval: 1200
                onTriggered: pop.copiedIndex = -99
            }

            // Focus the search field whenever the popout opens.
            Connections {
                target: pop.parentPopout
                function onShouldBeVisibleChanged() {
                    if (pop.parentPopout.shouldBeVisible) {
                        root.refreshTimes();
                        focusTimer.restart();
                    } else {
                        pop.editingIndex = -1;
                        searchField.text = "";
                        pop.results = [];
                    }
                }
            }

            Timer {
                id: focusTimer
                interval: 50
                onTriggered: searchField.forceActiveFocus()
            }

            Component.onCompleted: focusTimer.restart()

            // ── Local reference row ──
            Item {
                width: parent.width
                height: localCol.implicitHeight

                Column {
                    id: localCol
                    anchors.left: parent.left
                    anchors.leftMargin: Theme.spacingS
                    anchors.verticalCenter: parent.verticalCenter
                    spacing: 2

                    StyledText {
                        text: pop.copiedIndex === -1 ? "Copied" : "Local · " + root.localInfo.date
                        font.pixelSize: Theme.fontSizeSmall
                        color: Theme.surfaceVariantText
                    }

                    StyledText {
                        text: root.formatHM(root.localInfo)
                        font.pixelSize: Theme.fontSizeXLarge + 6
                        font.weight: Font.Bold
                        color: Theme.surfaceText
                    }
                }

                DankIcon {
                    anchors.right: parent.right
                    anchors.rightMargin: Theme.spacingS
                    anchors.verticalCenter: parent.verticalCenter
                    name: root.isDay(root.localInfo) ? "light_mode" : "dark_mode"
                    size: Theme.iconSize + 4
                    color: Theme.primary
                }

                MouseArea {
                    anchors.fill: parent
                    cursorShape: Qt.PointingHandCursor
                    onClicked: {
                        root.copyText("Local", root.localInfo);
                        pop.markCopied(-1);
                    }
                }
            }

            // ── Search ──
            Item {
                id: searchKeys
                width: 0
                height: 0
                Keys.onPressed: event => {
                    if (event.key === Qt.Key_Down && pop.results.length > 0) {
                        pop.selected = Math.min(pop.selected + 1, pop.results.length - 1);
                        event.accepted = true;
                    } else if (event.key === Qt.Key_Up && pop.results.length > 0) {
                        pop.selected = Math.max(pop.selected - 1, 0);
                        event.accepted = true;
                    } else if (event.key === Qt.Key_Return || event.key === Qt.Key_Enter) {
                        pop.pick(pop.selected);
                        event.accepted = true;
                    } else if (event.key === Qt.Key_Escape && searchField.text.length > 0) {
                        searchField.text = "";
                        pop.results = [];
                        event.accepted = true;
                    }
                }
            }

            DankTextField {
                id: searchField
                width: parent.width
                leftIconName: "search"
                placeholderText: "Add city, timezone or abbreviation…"
                showClearButton: true
                keyForwardTargets: [searchKeys]
                onTextChanged: pop.runSearch()
            }

            Column {
                width: parent.width
                spacing: 2
                visible: searchField.text.length > 0

                Repeater {
                    model: pop.results

                    StyledRect {
                        width: parent.width
                        height: 44
                        radius: Theme.cornerRadius
                        color: index === pop.selected ? Theme.primaryHover : (resultArea.containsMouse ? Theme.withAlpha(Theme.surfaceText, 0.06) : "transparent")

                        Column {
                            anchors.left: parent.left
                            anchors.leftMargin: Theme.spacingM
                            anchors.right: parent.right
                            anchors.rightMargin: Theme.spacingM
                            anchors.verticalCenter: parent.verticalCenter
                            spacing: 1

                            StyledText {
                                text: modelData.label
                                font.pixelSize: Theme.fontSizeMedium
                                font.weight: Font.Medium
                                color: Theme.surfaceText
                            }

                            StyledText {
                                width: parent.width
                                text: modelData.detail
                                font.pixelSize: Theme.fontSizeSmall
                                color: Theme.surfaceVariantText
                                elide: Text.ElideRight
                            }
                        }

                        MouseArea {
                            id: resultArea
                            anchors.fill: parent
                            hoverEnabled: true
                            cursorShape: Qt.PointingHandCursor
                            onEntered: pop.selected = index
                            onClicked: pop.pick(index)
                        }
                    }
                }

                StyledText {
                    text: "No matches"
                    leftPadding: Theme.spacingM
                    font.pixelSize: Theme.fontSizeSmall
                    color: Theme.surfaceVariantText
                    visible: pop.results.length === 0
                }
            }

            // ── Clocks ──
            Flickable {
                width: parent.width
                height: Math.min(clockCol.implicitHeight, 6 * 64)
                contentHeight: clockCol.implicitHeight
                clip: true
                boundsBehavior: Flickable.StopAtBounds
                visible: root.timezones.length > 0

                Column {
                    id: clockCol
                    width: parent.width
                    spacing: Theme.spacingXS

                    Repeater {
                        model: root.timezones

                        StyledRect {
                            id: row
                            readonly property var info: root.timeMap[modelData.timezone]
                            readonly property bool editing: pop.editingIndex === index

                            width: clockCol.width
                            height: 60
                            radius: Theme.cornerRadius
                            color: (!root.showAll && root.currentIndex === index) ? Theme.withAlpha(Theme.primary, 0.15) : Theme.surfaceContainerHigh

                            // Row click (background) = copy
                            MouseArea {
                                anchors.fill: parent
                                cursorShape: Qt.PointingHandCursor
                                onClicked: {
                                    root.copyText(root.labelFor(modelData), row.info);
                                    pop.markCopied(index);
                                }
                            }

                            DankIcon {
                                id: dayIcon
                                anchors.left: parent.left
                                anchors.leftMargin: Theme.spacingM
                                anchors.verticalCenter: parent.verticalCenter
                                name: root.isDay(row.info) ? "light_mode" : "dark_mode"
                                size: Theme.iconSize
                                color: root.isDay(row.info) ? Theme.primary : Theme.surfaceVariantText
                            }

                            Column {
                                anchors.left: dayIcon.right
                                anchors.leftMargin: Theme.spacingM
                                anchors.right: timeText.left
                                anchors.rightMargin: Theme.spacingS
                                anchors.verticalCenter: parent.verticalCenter
                                spacing: 2

                                Item {
                                    width: parent.width
                                    height: row.editing ? editLoader.height : labelText.implicitHeight

                                    StyledText {
                                        id: labelText
                                        visible: !row.editing
                                        width: Math.min(implicitWidth, parent.width)
                                        text: root.labelFor(modelData)
                                        font.pixelSize: Theme.fontSizeLarge
                                        font.weight: Font.Medium
                                        color: Theme.surfaceText
                                        elide: Text.ElideRight

                                        MouseArea {
                                            anchors.fill: parent
                                            cursorShape: Qt.IBeamCursor
                                            onClicked: pop.editingIndex = index
                                        }
                                    }

                                    Loader {
                                        id: editLoader
                                        width: parent.width
                                        active: row.editing
                                        sourceComponent: Component {
                                            Item {
                                                width: editLoader.width
                                                height: editField.height

                                                Item {
                                                    id: editKeys
                                                    Keys.onPressed: event => {
                                                        if (event.key === Qt.Key_Escape) {
                                                            editField.cancelled = true;
                                                            pop.editingIndex = -1;
                                                            event.accepted = true;
                                                        } else if (event.key === Qt.Key_Return || event.key === Qt.Key_Enter) {
                                                            editField.commit();
                                                            event.accepted = true;
                                                        }
                                                    }
                                                }

                                                DankTextField {
                                                    id: editField
                                                    property bool cancelled: false
                                                    property bool done: false
                                                    width: parent.width
                                                    topPadding: 2
                                                    bottomPadding: 2
                                                    text: modelData.label || ""
                                                    placeholderText: Cities.cityFromTz(modelData.timezone)
                                                    keyForwardTargets: [editKeys]

                                                    function commit() {
                                                        if (done || cancelled)
                                                            return;
                                                        done = true;
                                                        var i = index;
                                                        var t = text;
                                                        pop.editingIndex = -1;
                                                        root.renameClock(i, t);
                                                    }

                                                    onFocusStateChanged: hasFocus => {
                                                        if (!hasFocus)
                                                            commit();
                                                    }

                                                    Component.onCompleted: {
                                                        forceActiveFocus();
                                                        selectAll();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                StyledText {
                                    width: parent.width
                                    text: pop.copiedIndex === index ? "Copied" : modelData.timezone + "  ·  " + root.offsetText(row.info)
                                    font.pixelSize: Theme.fontSizeSmall
                                    color: pop.copiedIndex === index ? Theme.primary : Theme.surfaceVariantText
                                    elide: Text.ElideRight
                                }
                            }

                            StyledText {
                                id: timeText
                                anchors.right: buttons.left
                                anchors.rightMargin: Theme.spacingS
                                anchors.verticalCenter: parent.verticalCenter
                                text: root.formatHM(row.info)
                                font.pixelSize: Theme.fontSizeXLarge
                                font.weight: Font.Bold
                                color: Theme.primary
                            }

                            Row {
                                id: buttons
                                anchors.right: parent.right
                                anchors.rightMargin: Theme.spacingXS
                                anchors.verticalCenter: parent.verticalCenter
                                spacing: 0

                                DankActionButton {
                                    buttonSize: 26
                                    iconSize: 16
                                    iconName: "keyboard_arrow_up"
                                    opacity: index > 0 ? 1 : 0.3
                                    enabled: index > 0
                                    onClicked: root.moveClock(index, -1)
                                }
                                DankActionButton {
                                    buttonSize: 26
                                    iconSize: 16
                                    iconName: "keyboard_arrow_down"
                                    opacity: index < root.timezones.length - 1 ? 1 : 0.3
                                    enabled: index < root.timezones.length - 1
                                    onClicked: root.moveClock(index, 1)
                                }
                                DankActionButton {
                                    buttonSize: 26
                                    iconSize: 16
                                    iconName: "close"
                                    iconColor: Theme.error
                                    onClicked: root.removeClock(index)
                                }
                            }
                        }
                    }
                }
            }

            StyledText {
                width: parent.width
                horizontalAlignment: Text.AlignHCenter
                text: "No clocks yet. Search above to add one."
                font.pixelSize: Theme.fontSizeMedium
                color: Theme.surfaceVariantText
                visible: root.timezones.length === 0 && searchField.text.length === 0
                topPadding: Theme.spacingM
                bottomPadding: Theme.spacingM
            }
        }
    }
}
