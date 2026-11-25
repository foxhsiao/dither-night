import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// 近乎純黑的中性灰，卡片只比底色亮一點點。
const { theme, problems } = makeColors({
  label: 'Dither Night',
  only: 'dark',
  roles: { accent: '#4f8ff7', danger: '#f0503a', success: '#3fbf6a', warning: '#f29a3a', pro: '#9b7cf2' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0c0c0c',
        'surface-1': '#151515',
        'surface-2': '#1a1a1a',
        'surface-3': '#202020',
        'text-primary': '#f2f2f2',
        'text-secondary': '#c4c4c4',
        'text-muted': '#9a9a9a',
      },
    },
  },
})

// 對角彩虹光帶（藍→橘→紅），以兩層點陣圖樣遮罩做出抖動/半色調質感。
const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
.drift { animation: drift 60s ease-in-out infinite alternate; transform-origin: 800px 500px; }
@keyframes drift { from { transform: translate(-40px, 20px); } to { transform: translate(40px, -20px); } }
.glow { animation: pulse 18s ease-in-out infinite alternate; opacity: 0.9; }
@keyframes pulse { from { opacity: 0.75; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .drift, .glow { animation: none; } }
</style>
<defs>
<linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#1e5bd8" stop-opacity="0"/>
<stop offset="0.18" stop-color="#2f7df0" stop-opacity="0.9"/>
<stop offset="0.38" stop-color="#6fb2ff" stop-opacity="1"/>
<stop offset="0.5" stop-color="#e9e2c8" stop-opacity="1"/>
<stop offset="0.62" stop-color="#f39a3c" stop-opacity="1"/>
<stop offset="0.8" stop-color="#e8401f" stop-opacity="0.95"/>
<stop offset="1" stop-color="#7a1208" stop-opacity="0"/>
</linearGradient>
<radialGradient id="fade" cx="0.55" cy="0.4" r="0.75">
<stop offset="0" stop-color="#fff" stop-opacity="1"/>
<stop offset="0.7" stop-color="#fff" stop-opacity="0.55"/>
<stop offset="1" stop-color="#fff" stop-opacity="0"/>
</radialGradient>
<pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
<rect x="0" y="0" width="3" height="3" fill="#fff"/>
<rect x="3" y="3" width="2" height="2" fill="#fff" fill-opacity="0.6"/>
</pattern>
<pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
<rect x="1" y="2" width="1.5" height="1.5" fill="#5a6f9a"/>
<rect x="4" y="5" width="1.5" height="1.5" fill="#8a3a2a"/>
<rect x="5" y="0" width="1" height="1" fill="#3a7a4a"/>
</pattern>
<mask id="dither"><rect width="1600" height="1000" fill="url(#dots)"/></mask>
<mask id="vignette"><rect width="1600" height="1000" fill="url(#fade)"/></mask>
</defs>
<rect width="1600" height="1000" fill="#0a0a0a"/>
<!-- grain over the dark field -->
<rect width="1600" height="1000" fill="url(#grain)" opacity="0.35"/>
<!-- rainbow band, dithered -->
<g mask="url(#vignette)">
<g mask="url(#dither)">
<g class="drift"><g class="glow">
<rect x="-400" y="250" width="2600" height="420" fill="url(#band)" transform="rotate(28 800 500)"/>
</g></g>
</g>
</g>
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'dither-band', glass: { blur: 8, tint: '#0c0c0c', opacity: 0.82 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.log(set.reason, { to: 'debug' })
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.plugin !== 'dither-night') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="點陣抖動的對角彩虹光帶" />
  })
}
