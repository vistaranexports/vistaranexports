# Vistaran Exports

This project is configured for deployment to GitHub Pages under the repository:

`vistaran_exports2`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy To GitHub Pages

1. Push this project to the `vistaran_exports2` GitHub repository.
2. Run the deployment command:

```bash
npm run deploy
```

This publishes the `dist` folder to the `gh-pages` branch.

3. In GitHub repository settings:
   - Go to `Settings -> Pages`
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`

## 404 Deep-Link Fix

This app includes GitHub Pages SPA routing support:

- `public/404.html` redirects unknown routes to the app entry.
- `index.html` restores the original route so React Router can load the correct page.

This fixes direct URL access and browser refresh on nested routes (for example `/about` or `/products/rice`).
