# Changelog

## 0.1.2 (2026-11-25)

- The band stops when the system asks for reduced motion. The scene's CSS has a `@media (prefers-reduced-motion: reduce)` rule that turns off both the drift and the glow pulse. The band then stays centered at its resting glow.
- README: says the band stays still under reduced motion again, now that something makes it true.

## 0.1.1 (2026-11-25)

- The terminal no longer shows `⚠ dither-night: no attached desktop or mobile client draws themes yet; …` under the prompt. In the CLI no desktop or mobile client is attached, so this line showed on every start and took a row of height.
- The reason now goes to the debug log. Start a session with `claude --debug-file <path>` and search the file for `dither-night` to see it.
- The "Desktop won't paint" toast is unchanged. It still shows when the palette itself has a problem.
- README: new section "No warning in the terminal".

## 0.1.0 (2026-11-21)

- First release. A dark theme for the Claude desktop and mobile apps: near-black surfaces and a diagonal rainbow band (blue, cream, orange, red) behind the conversation, drawn through a halftone dot mask so it looks dithered.
- The band drifts slowly (60 s) and its glow pulses (18 s).
- Dark only. It sets the dark palette and asks the app to draw in dark mode.
- Terminal and editors don't draw themes, so nothing changes there.
- A 1024px plugin icon.
