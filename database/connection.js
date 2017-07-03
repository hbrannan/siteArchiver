const Sequelize = require('sequelize');
const env = process.env.NODE_ENV ? require('dotenv').config({path: '.env.test'}) : require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, 'usr', 'pwd', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: process.env.DB_STORAGE
});

const Site = sequelize.define('sites', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: Sequelize.STRING
  },
  html: {
    type: Sequelize.STRING,
    allowNull: true
  },
  hitCount: {
    type: Sequelize.INTEGER
  }
});

sequelize.sync();

module.exports = {
  Site: Site,
  sequelize: sequelize
};
