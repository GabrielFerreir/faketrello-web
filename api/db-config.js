const promise = require('bluebird')
const databaseConfig = {
  'host': 'localhost',
  'port': 5432,
  'database': 'fakeTrello',
  'user': 'postgres',
  'password': '91416644'
}
const initOptions = {
  promiseLib: promise
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(databaseConfig)

module.exports = db
