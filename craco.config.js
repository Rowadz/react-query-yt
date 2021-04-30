const { resolve } = require('path')
module.exports = {
  webpack: {
    alias: {
      '@UI': resolve(__dirname, 'src/@UI/'),
      '@Context': resolve(__dirname, 'src/@Context/'),
    },
  },
}
