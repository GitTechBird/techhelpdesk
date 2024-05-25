import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),cssInjectedByJsPlugin()],
	server: {
		port: 8080,
		proxy: proxyOptions
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	// build: {
	// 	outDir: '../one_tap_v1/public/techhelpdesk',
	// 	emptyOutDir: true,
	// 	target: 'es2015',
	// },
	build: {
		base: '/helpdesk/',
		target: 'esnext',
		polyfillDynamicImport: false,
		outDir: 'dist', // Output directory for production build
		// minify: 'terser', // Minify JavaScript output
		cssCodeSplit: false, // Disable CSS code splitting
		assetsInlineLimit: 0, // Inline all assets regardless of file size
		rollupOptions: {
		  // Generate a single JavaScript file
		//   input: 'src/main.tsx', // Entry point of your application
		  input: {
			app: 'src/main.tsx',
		  },
		  output: {
			entryFileNames: '[name].[hash].js', // Include hash for cache busting
			chunkFileNames: '[name].[hash].js',
			assetFileNames: '[name].[hash].[ext]'
		  }
		}
	  }
});
