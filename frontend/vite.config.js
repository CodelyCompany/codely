import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    envCompatible(),
    jsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});