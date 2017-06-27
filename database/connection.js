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
  url: { // NOT NULL
    type: Sequelize.STRING
  },
  html: { // COULD BE NULL OR W/ CONTENT
    type: Sequelize.STRING
  }
});

// const Task = sequelize.define('queue')
// ID -- autoincrementing -- primary ID
// reference to site Id
// id incrementing
// always fetch first 5 (lowest primID)

// Task.hasOne(Site) // adds Task to site
// Task.belongsTo(Site)  // adds Site to Task

sequelize.sync();

sequelize.authenticate().then(() => {
  console.log('db connection authenticated');
})
.catch((err) => {
  console.error('unable to connect', err)
})
// sequelize.drop();

module.exports = {
  Site: Site,
  sequelize: sequelize
};
