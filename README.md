# Results Card Style

A [feedBack](https://github.com/got-feedback/feedback) plugin that adds a setting to switch the shareable **Song Complete** results card between its two layouts:

| Setting off (default) | Setting on |
|---|---|
| A bar for each song section (intro, verse, chorus...) | One large accuracy percentage with a full-width meter |

Normally feedBack picks the layout for you: charts with sections get the bars, and charts without sections get the big percentage. Since almost every song has sections, you would rarely see the big percentage card. This plugin lets you choose.

## Install

1. In feedBack, open **Plugins**.
2. Under **Install Plugin**, paste this repository's URL and click **Install**:

   ```
   https://github.com/On3xSh0t89/feedBack-plugin-card-style.git
   ```

3. Restart feedBack. The Plugin Manager only activates new plugins after a restart.

## Use

Open **Settings → Mic → Results Card Style** and tick **Big accuracy layout on results cards**.

The change applies to the next card you save, copy, or auto-save from Song Complete. No restart is needed.

## What it changes, and what it does not

- **Changes:** the card image made by the Song Complete **Save** and **Copy** buttons, the card made by Note Detection's **Auto-save a card after every song** option, and any card another plugin draws through `window.noteDetect.renderResultsCard`.
- **Does not change:** the on-screen Song Complete summary, your scores, or anything about note detection.
- The stat strip along the bottom of the card still shows your top section.

## How it works

Note Detection draws the card in one function, `_ndRenderShareCard(data, overlayEl)`. It uses the bars layout when `data.sections` has entries, and the big percentage layout when it is empty.

This plugin wraps that function. When the setting is on, it passes the renderer a copy of the card data with an empty `sections` list. Note Detection's files are never modified, so feedBack updates do not undo the plugin, and uninstalling it restores the default behaviour completely.

The setting is stored in the app's local storage under `card_style_big_accuracy`.

## Example

<img width="1200" height="630" alt="image" src="https://github.com/user-attachments/assets/c7015c9a-d101-4671-baff-dcc2e221e580" />
<img width="1200" height="630" alt="image" src="https://github.com/user-attachments/assets/71098b0a-835d-4a80-81de-e2ce4b7ccff6" />

If a future feedBack version renames or restructures that function, the plugin does nothing rather than breaking anything. The card falls back to feedBack's normal behaviour.

## Tested with

- feedBack Desktop 0.3.0-nightly.20260722
- Note Detection plugin 1.32.0

## License

MIT. See [LICENSE](LICENSE).
