// Required for VSC to not throw errors
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],
  emitCss: true
};

export default config;
