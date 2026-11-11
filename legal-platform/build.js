const esbuild = require('esbuild');

async function build() {
  try {
    const result = await esbuild.build({
      entryPoints: ['src/app/index.jsx'],
      bundle: true,
      outfile: 'src/app/bundle.js',
      format: 'iife',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.json': 'json'
      },
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      minify: true,
      sourcemap: false
    });
    console.log('React Bundle build successful!');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

build();

