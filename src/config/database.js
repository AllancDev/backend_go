module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'go',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
