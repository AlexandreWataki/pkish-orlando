﻿ï»¿// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: { '@': './src' },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
      }],
      'react-native-worklets/plugin', // ÃšNICO plugin de worklets, e sempre o Ãºltimo
    ],
  };
};
