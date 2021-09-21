@kaliber5/select-sass-theme
==============================================================================

Built-time Sass theme switcher.

This tiny addon lets you define multiple Sass files and include only one of them into your app's build, via an env var.

Define default values of your theme variables in `app/styles/config/themes/_default.scss`.

Define as many theme files as you need. In those files, override any of the theme variables:

* `app/styles/config/themes/client2.scss`
* `app/styles/config/themes/client3.scss`

When you build your app, a `app/styles/config/_theme.scss` file will be created.

If you run your build without the `EMBER_THEME` env var, then `_theme.scss` will simply reexport variables from the `themes/_default.scss` file.

If you run your build with `EMBER_THEME=client2 ember build`, `_theme.scss` will contain the content of `client2.scss` file.




Compatibility
------------------------------------------------------------------------------

Should support really old versions of Ember.

Relies on Broccoli.

Requires [sass](https://www.npmjs.com/package/sass) v1.23.0+. If you use [ember-cli-sass](https://github.com/adopted-ember-addons/ember-cli-sass) v10+, then you're good to go.

Is not compatible with [ember-component-css](https://github.com/ebryn/ember-component-css).

Is not compatible with [ember-css-modules](https://github.com/salsify/ember-css-modules), unless you use this opinionated [workaround](#ember-css-modules workaround).




Installation
------------------------------------------------------------------------------

```
ember install @kaliber5/select-sass-theme
```

Most likely, you need [ember-cli-sass](https://github.com/adopted-ember-addons/ember-cli-sass) as well.




File structure
------------------------------------------------------------------------------

This addon's blueprint will create the following files in your app:

| Filename                                       | Usage                                                                                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/styles/config/themes/_current-theme.scss` | Current theme file. Reexports the default theme. When the app is built with a theme env var, this file is replaced with one of the theme files. |
| `app/styles/config/themes/_default.scss`       | Must define default values of all theme variables.                                                                                              |
| `app/styles/config/themes/_[theme-name].scss`  | Reexports the defaults, may override any of the theme variables.                                                                                |

When the app builds without `EBMER_THEME` env var, nothing happens. You can `@use` the  `app/styles/config/themes/_current-theme.scss` file, which proxies to the default theme.

When the app builds with an `EBMER_THEME` env var, the `app/styles/config/themes/_current-theme.scss` file will be replaced with one of the theme files.

For example, if you have `app/styles/config/themes/_client2.scss` and you build with `EMBER_THEME=client2 ember s`, then `app/styles/config/themes/_current-theme.scss` will be overwritten with the content of `_client2.scss`.




Usage
------------------------------------------------------------------------------

Since DartSass `v1.23.0`, Sass supports the `@use` directive. It lets you import variables, mixins and functions locally, without polluting the global scope and causing potential collisions. `@use` if very similar to JS's `import`. See [documentation](https://sass-lang.com/documentation/at-rules/use) and [this article](https://css-tricks.com/introducing-sass-modules/) for more info.

Whenever you need to reference a theme variable in your Sass code, `@use` the theme file at the top of your Sass file, then use the namespaced variable:

```scss
@use "app/styles/config/themes/current-theme" as theme;

a {
  color: theme.$link-text-normal;
  text-decoration: theme.$link-decoration-normal;

  &:hover {
    color: theme.$link-text-hover;
    text-decoration: theme.$link-decoration-hover;
  }
}
```



ember-css-modules workaround
------------------------------------------------------------------------------

[ember-css-modules](https://github.com/salsify/ember-css-modules) aggressively concatenates all Sass files in your app into a single file, causing Sass to crash with:

> Error: @use rules must be written before any other rules.

Unfortunately, `ember-css-modules` [does not provide](https://github.com/dfreeman/ember-css-modules-sass/issues/3) a way to opt out of concatenating certain Sass files.

You can switch to opt-in with the following configuration in you `ember-cli-build.js`:

```js
cssModules: {
  extension: 'module.scss'
}
```

Now you need to rename your CSS modules (i. e. stylesheets that belong to compnents ant controllers) from `*.scss` to `*.module.scss`. You may think this is too radical, but if you import Sass partials, then `ember-css-modules` may produce duplicate code in the generated CSS without you even realizing.



Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.



License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
