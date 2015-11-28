/**
 * Local environment settings
 */

module.exports = {

    /***************************************************************************
   * Set the default database connection for models in the local              *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
    connections: {
        MongoLocal:{
            adapter: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            database: 'local'
        }
    },
    models: {
        connection: 'MongoLocal'
    },
    session: {
        host: 'localhost',
        port: 27017,
        db: 'local'
    }
};
