import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    // Served from the apex of a custom domain (www.inshira.co.uk), not a
    // /repo-name/ subpath, so base stays at root.
    base: '/',

    build: {
      // CRITICAL: Vite defaults to emitting bundles into dist/assets, which
      // would collide with the site's existing /assets folder (team photos,
      // supporter logos, og-image.jpg, logo.png). Those URLs are already
      // indexed and referenced absolutely in the OG tags, so they must keep
      // working. Emitting JS/CSS to dist/static keeps /assets free.
      assetsDir: 'static',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
