# Aman studio portfolio

Open `dist/index.html` in a browser for the standalone layout preview. Images and Google Fonts require an internet connection.

The editable React page is in `app/page.tsx`; shared styling is in `app/globals.css`. The standalone preview uses `scripts/preview-interactions.js`. Regenerate it with `node scripts/export-preview.cjs` after editing the page or styles (requires TypeScript).

Project names, years, and photography are illustrative. Contact information, studio location, real project metadata, social links, and verified statistics are intentionally pending.

Framework development: install dependencies with `npm install`, then run `npm run dev`. The initial environment could not resolve external hosts, so installation and the framework build could not complete. The standalone preview was successfully generated and its interaction script passed `node --check`; browser rendering has not been verified.
