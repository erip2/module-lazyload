/**
 * @typedef {import('@roots/bud').Bud} bud
 *
 * @param {bud} app
 */
module.exports = (app) =>
  app
    /**
     * Application entrypoints
     *
     * Paths are relative to your resources directory
     */
    .entry({
      app: ['scripts/app.js', 'styles/app.css'],
      editor: ['scripts/editor.js', 'styles/editor.css'],
    })

    /**
     * These files should be processed as part of the build
     * even if they are not explicitly imported in application assets.
     */
    .assets([app.path('src', 'images')])

    /**
     * These files will trigger a full page reload
     * when modified.
     */
    .watch([
      'tailwind.config.js',
      'resources/views/**/*.blade.php',
      'app/View/**/*.php',
    ])

    /**
     * Define the public path for dynamically imported assets.
     *
     * I am defining it an .env file and accessing it with `bud.env`.
     */
    .define({
      ASSET_PATH: JSON.stringify(app.env.get('ASSET_PATH')),
    })

    /**
     * Target URL to be proxied by the dev server.
     *
     * This is your local dev server.
     */
    .proxy('http://example.test');
