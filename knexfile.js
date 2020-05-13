module.exports = {
  development: {
    client: 'sqlite3',
    useDefaultAsNull: true,
    connection: {
      filename: './data/user.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
