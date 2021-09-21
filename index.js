'use strict';

const stew = require('broccoli-stew');
const themeName = process.env.EMBER_THEME || 'default';

module.exports = {
  name: require('./package').name,

  preprocessTree(type, tree) {
    if (type === 'css' && themeName !== 'default') {
      tree = stew.rm(tree, `app/styles/config/themes/_current-theme.scss`);

      tree = stew.mv(
        tree,
        `app/styles/config/themes/_${themeName}.scss`,
        `app/styles/config/themes/_current-theme.scss`
      );

      tree = stew.rm(
        tree,
        `${this.app.name}/styles/config/themes/_current-theme.scss`
      );

      tree = stew.mv(
        tree,
        `${this.app.name}/styles/config/themes/_${themeName}.scss`,
        `${this.app.name}/styles/config/themes/_current-theme.scss`
      );

      return stew.debug(tree);
    }

    return tree;
  },
};
