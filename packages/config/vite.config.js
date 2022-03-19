// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
});
