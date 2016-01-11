/**
 * Test environment settings
 */

module.exports = {

    /***************************************************************************
   * Set the default database connection for models in the test              *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
    connections: {
        MongoTest:{
            adapter: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            database: 'test'
          }
    },
    models: {
        connection: 'MongoTest'
    },
session: {
      db: 'test',
      host: 'localhost',
      port: 27017,
  }
};
