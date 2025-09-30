// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  return config; // sem mexer em transformer/resolver se não for necessário
})();
