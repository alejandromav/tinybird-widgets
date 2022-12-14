module.exports = process.env.NODE_ENV != 'production' ? { plugins: {} } : {
  plugins: {
    "posthtml-replace": [{
      match: {
        tag: 'iframe'
      },
      attrs: {
        src: {
          from: 'http://localhost:1337',
          to: 'https://tinybird-widgets-flame.vercel.app'
        }
      }
    }]
  }
};
