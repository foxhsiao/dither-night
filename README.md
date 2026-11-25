# dither-night

A dark theme mod for Claude Code. Surfaces go near-black, and behind the conversation a diagonal rainbow band (blue, cream, orange, red) is drawn through a halftone dot mask, so it looks dithered. The band drifts slowly.

深黑色的 Claude Code 主題 mod：面板接近純黑，背景是一條用點陣遮罩畫出抖動質感的對角彩虹光帶，會緩慢漂移。

## Install

At the prompt of a terminal session:

```
/plugin install dither-night --marketplace foxhsiao/dither-night
```

From a shell:

```bash
claude plugin install dither-night --marketplace foxhsiao/dither-night
```

Answer `y` to add the marketplace, then pick a scope (user applies it to every session). Start a new session to see it.

## Where it shows

- **Claude desktop app and mobile app**: colors and the backdrop.
- **Terminal and editors**: nothing changes; they don't draw themes.

It is a dark-only look: it sets the dark palette and asks the app to draw in dark mode.

### No warning in the terminal

In the terminal, no desktop or mobile client is attached, so the theme is set but nothing draws it. Since 0.1.1 the mod says nothing about this on screen. Before, every start showed this line under the prompt:

```
⚠ dither-night: no attached desktop or mobile client draws themes yet; the theme stands and draws when one attaches
```

The reason now goes to the debug log only. To see it, start a session with a debug file and search it:

```bash
claude --debug-file /tmp/claude-debug.txt
grep dither-night /tmp/claude-debug.txt
```

It shows up as `[dither-night] $.ui.log (to debug): no attached desktop or mobile client draws themes yet; …`.

The "Desktop won't paint" toast still appears on screen. It only fires when the palette itself has a problem.

終端機裡沒有桌面或手機 app 連上，主題設好了但不會畫出來。從 0.1.1 起不再在畫面上顯示那行警告，原因改寫進 debug 紀錄（用 `claude --debug-file` 開就看得到）。

## Change the look

Everything lives in `mods/dither-night/hooks/register.tsx`:

- the palette is the `makeColors({ ... })` call at the top (surfaces, text and the five role colors);
- the backdrop is the `SCENE` SVG: edit the `band` gradient stops for the colors, the `rotate(28 ...)` for the angle, and the `dots` pattern for the dot size.

`hooks/make-colors.js` is the palette helper from Claude Code's plugin-authoring skill; keep it as is.

## Remove

```bash
claude plugin uninstall dither-night@dither-night
```

## License

MIT
