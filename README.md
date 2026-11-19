# World Clock Plus for DankMaterialShell

A [DankMaterialShell](https://github.com/AvengeMedia/DankMaterialShell) bar widget that shows local date and time on the bar (like the default clock) and multiple timezones in its popout.

## Features

- **Inline search**: type a city, country, IANA zone or abbreviation (`Barcelona`, `japan`, `Europe/Berlin`, `PT`, `CET`) and press Enter. Works offline with ~460 bundled cities plus every zone in `/usr/share/zoneinfo/zone.tab`.
- **Editable labels**: click a clock's label to rename it. Enter saves, Esc cancels, empty restores the default name.
- **Reorder / remove**: ↑/↓ buttons set the order, × removes.
- **Click to copy**: click a row to copy e.g. `Tokyo 14:30 (Thu)` to the clipboard.
- **At a glance**: day/night icon, offset relative to local time (`+9h`, `−3h`, `+5:30h`) and a local-time reference row.
- **Bar**: local date and time, e.g. `Thu 19 • 14:30`, styled like the default DMS clock. Follows DMS clock settings (date format, 24-hour, hour padding, seconds). No limit on clock count in the popout.

Keyboard in the popout: type to search, ↑/↓ to select a result, Enter to add, Esc to clear (Esc again closes).

## Requirements

- DankMaterialShell with plugin support
- `bash`, `date` (coreutils), `wl-copy` (wl-clipboard) for click-to-copy

## Install

Clone into the DMS plugin directory:

```sh
git clone https://github.com/ecruzolivera/dms-world-clock-plus.git \
  "${XDG_CONFIG_HOME:-$HOME/.config}/DankMaterialShell/plugins/worldClockPlus"
```

Then enable via Settings → Plugins → Scan for Plugins, or:

```sh
dms ipc call plugin-scan scan
dms ipc call plugins enable worldClockPlus
```

Add the **World Clock Plus** widget to a bar section, click it and start typing.

## Settings

No plugin settings. Clocks are managed in the popout; time and date formats follow the DMS clock settings.

## License

MIT
