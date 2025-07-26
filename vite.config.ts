import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isReact = mode === 'react';

	return {
		plugins: [react(), svgr()],
		resolve: {
			alias: [{ find: '@', replacement: '/src/app' }],
		},
		base: isReact ? '/' : './',
		build: {
			outDir: 'dist-react',
		},
		server: {
			port: 5173,
			strictPort: true,
		},
	};
});
