import glob from 'glob';
import { resolve } from 'path';

const pages = glob.sync('*.html').map((path) => resolve(__dirname, path));

/** @type {import('vite').UserConfig} */
export default {
  build: { rollupOptions: { input: pages } },
};
