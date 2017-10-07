// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {

    aws: {
      //host: 'localhost',
      host: '18.216.22.175',
      port: 8545,
      network_id: '111' // Match any network id
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}
