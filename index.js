'use strict';

const stew = require('broccoli-stew');
const BroccoliDebug = require('broccoli-debug');
const themeName = process.env.EMBER_THEME || 'default';

const debugTree = BroccoliDebug.buildDebugCallback('select-sass-theme');

module.exports = {
  name: require('./package').name,

  preprocessTree(type, tree) {
    if (type === 'css') {
      tree = debugTree(tree, 'input');

      tree = stew.rm(tree, `app/styles/config/themes/_current-theme.scss`);

      tree = stew.mv(
        tree,
        `app/styles/config/themes/_${themeName}.scss`,
        `app/styles/config/themes/_current-theme.scss`
      );

      tree = stew.mv(
        tree,
        `${this.app.name}/styles/config/themes/_${themeName}.scss`,
        `${this.app.name}/styles/config/themes/_current-theme.scss`
      );

      tree = debugTree(tree, 'output');
    }

    return tree;
  },
};
