# Bracelet Studio

A browser-based bead bracelet designer. Pick beads, build a bracelet ring
sized to your wrist, preview it in 3D, and save your favorites — all
client-side, no account required.

## Features

- **2D ring designer** — click beads from the library to add them to a
  circular bracelet ring; click a placed bead to remove it.
- **Accurate sizing** — enter your wrist size (cm) and pick a bead diameter
  (mm); the ring's slot count recalculates automatically, and beads that no
  longer fit are dropped with a notice.
- **Two display styles** — a clear background or a wooden-tray photo behind
  the ring, and a hollow-circles or strung-cord placeholder style for empty
  slots.
- **3D preview** — flip the 3D View switch to see the bracelet rendered in
  three dimensions (drag to rotate, scroll to zoom), built with
  react-three-fiber and three.js.
- **Save & revisit** — save a design to your browser's local storage and
  view or delete it later from the Saved Bracelets page.
- **How it Works** — a walkthrough of the five steps from bead to bracelet,
  illustrated with the app's own live components.

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) +
  [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration)
- [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) /
  [drei](https://github.com/pmndrs/drei) / [three.js](https://threejs.org/)
  for the 3D viewer
- [Framer Motion](https://www.framer.com/motion/) for animation

No backend — all state is client-side, and saved bracelets live in the
browser's `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

Other scripts:

```bash
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint     # run Oxlint
```

## Project structure

```
src/
  components/   UI components (ring, bead library, 3D scene, toggles, etc.)
  pages/        Design, How it Works, and Saved Bracelets pages
  hooks/        useBraceletDesigner — the core ring/slot state
  lib/          geometry, sizing, and localStorage helpers
  data/         the bead catalog
  types/        shared TypeScript types
public/
  beads/        bead thumbnail images
  models/       3D bead model (.glb)
  backgrounds/  wooden tray background photo
```

## License

Copyright (c) 2026 ZhengLong9. All rights reserved.

See [LICENSE](./LICENSE) for details. This code is not licensed for reuse,
modification, or redistribution.
