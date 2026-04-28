import './index.css';
// it's ok if during dev vite shows a warning for components that don't have styles
// eg: [vite-plugin-svelte:load] failed to load virtual css module ...
const allComponents = import.meta.glob('/**/*.svelte', { eager: true, query: '?svelte&type=style&lang.css' });
