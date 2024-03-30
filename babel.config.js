module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            constants: './src/constants',
            components: './src/components',
            screens: './src/screens',
            reducers: './src/reducers',
            types: './src/types',
            util: './src/util',
            services: './src/services',
            globalVars: './src/globalVars',
            builders: './src/builders',
            src: './src'

          }
        }
      ]
    ]
  };
};
