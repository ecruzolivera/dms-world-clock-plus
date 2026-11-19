import QtQuick
import qs.Common
import qs.Widgets
import qs.Modules.Plugins

PluginSettings {
    id: root
    pluginId: "worldClockPlus"

    StyledText {
        width: parent.width
        text: "Add, rename, reorder and remove clocks from the bar popout (click the widget)."
        color: Theme.surfaceVariantText
        font.pixelSize: Theme.fontSizeSmall
        wrapMode: Text.WordWrap
    }

    ToggleSetting {
        settingKey: "showAll"
        label: "Show all clocks at once"
        description: "When off, the bar cycles through clocks one at a time"
        defaultValue: true
    }

    SliderSetting {
        settingKey: "cycleInterval"
        label: "Cycle interval (seconds)"
        description: "How often to switch clocks when cycling"
        minimum: 3
        maximum: 120
        defaultValue: 15
    }

    ToggleSetting {
        settingKey: "use24h"
        label: "Use 24-hour format"
        description: "14:30 instead of 2:30 PM"
        defaultValue: true
    }
}
