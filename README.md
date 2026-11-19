# World Clock Plus for DankMaterialShell

A [DankMaterialShell](https://github.com/AvengeMedia/DankMaterialShell) bar widget that shows multiple timezones, managed entirely from its popout.

## Features

- **Inline search**: type a city, country, IANA zone or abbreviation (`Barcelona`, `japan`, `Europe/Berlin`, `PT`, `CET`) and press Enter. Works offline with ~460 bundled cities plus every zone in `/usr/share/zoneinfo/zone.tab`.
- **Editable labels**: click a clock's label to rename it. Enter saves, Esc cancels, empty restores the default name.
- **Reorder / remove**: ↑/↓ buttons set the bar order, × removes.
- **Click to copy**: click a row to copy e.g. `Tokyo 14:30 (Thu)` to the clipboard.
- **At a glance**: day/night icon, offset relative to local time (`+9h`, `−3h`, `+5:30h`) and a local-time reference row.
- **Bar modes**: show all clocks at once or cycle through them; 12/24-hour format. No limit on clock count.

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

Clocks are managed in the popout. The plugin settings page has:

| Setting | Default |
| --- | --- |
| Show all clocks at once (off = cycle) | on |
| Cycle interval (seconds) | 15 |
| Use 24-hour format | on |

## License

MIT
