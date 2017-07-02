const Sequelize = require('sequelize');
const sequelize = new Sequelize('sites_archive_test', 'usr', 'pwd', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: './databaseTest.sqlite'
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
//FOR DEV
// sequelize.drop();

module.exports = {
  Site: Site,
  Task: Task,
  sqTest: sequelize
};
