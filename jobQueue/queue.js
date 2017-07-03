const Sequelize = require('sequelize')
const env = process.env.NODE_ENV ?
  require('dotenv').config({path: '.env.test'})
  : require('dotenv').config()

console.log(' Q U E U E    D B ', process.env.QUEUE_NAME)

const sequelize = new Sequelize(process.env.QUEUE_NAME, 'usr', 'pwd', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: process.env.QUEUE_STORAGE
});

const Task = sequelize.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  siteId: {
    type: Sequelize.INTEGER
  }
});

sequelize.sync();

module.exports = {
  Task: Task,
  sequelize: sequelize
};
