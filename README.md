# dither-night

A dark theme mod for Claude Code. Surfaces go near-black, and behind the conversation a diagonal rainbow band (blue, cream, orange, red) is drawn through a halftone dot mask, so it looks dithered. The band drifts slowly; with reduced motion turned on it stays still.

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
