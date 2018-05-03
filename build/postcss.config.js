module.exports = () => {
  return {
    use: [
      'postcss-flexbugs-fixes',
      'autoprefixer',
    ],
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true,
    },
    plugins: {
      autoprefixer: {
        cascade: false,
        // https://github.com/twbs/bootstrap/blob/v4.0.0/package.json#L136-L147
        browsers: [
          'last 1 major version',
          '>= 1%',
          'Chrome >= 45',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 9',
          'Safari >= 9',
          'Android >= 4.4',
          'Opera >= 30',
        ],
      },
    },
  };
};
