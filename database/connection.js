const Sequelize = require('sequelize');
const env = process.env.NODE_ENV ? require('dotenv').config({path: '.env.test'}) : require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, 'usr', 'pwd', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: process.env.DB_STORAGE
});

console.log(' L O A D E D   D B');

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

const Task = sequelize.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

Task.belongsTo(Site);

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//FOR DEV
// sequelize.drop();

module.exports = {
  Site: Site,
  Task: Task,
  sequelize: sequelize
};
