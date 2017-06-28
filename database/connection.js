const Sequelize = require('sequelize');
const sequelize = new Sequelize('sites_archive', 'usr', 'pwd', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: './database.sqlite'
});

console.log(' L O A D E D   D B')

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

const Task = sequelize.define('queue', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

Task.hasOne(Site);


sequelize.sync();
//FOR DEV
// sequelize.drop();

//FOR DEV
// sequelize.authenticate().then(() => {
//   console.log('db connection authenticated');
// })
// .catch((err) => {
//   console.error('unable to connect', err)
// });

module.exports = {
  Site: Site,
  Task: Task,
  sequelize: sequelize
};
