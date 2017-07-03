const express = require('express')
const queue = express();
const db = require ('./queue')
const env = process.env.NODE_ENV ? require('dotenv').config({path: '.env.test'}) : require('dotenv').config();
const port = process.env.JOB_PORT;
const path = require('path');
const bodyParser = require('body-parser');
const allowCrossDomain = (req, res, next) => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-method', '*')
  res.header('access-control-allow-headers', 'Content-Type')
  res.header('Content-Type','application/json')
  if (req.method == 'OPTIONS') {
    res.status(200).send(200)
  } else {
    next()
  }
};

// M I D D L E W A R E

queue.use(allowCrossDomain)
queue.use(bodyParser.json())


// R O U T E S

//Add new task to list
//params: siteId (INT), must correspond to added site
//invalid params: -> return 400 + msg
//succ: -> return the input siteId(INT)
//fail: return error
queue.post('/task', (req, res) => {
  if (req.body.siteId) {
    db.Task.create({
      siteId: req.body.siteId
    })
    .then((task) => {
      res.status(201).send({siteId: task.siteId})
    })
    .catch(err => res.status(500).send({error: err}))
  } else {
    res.status(400).send({msg:'Bad request'});
  }
})

//Fetch oldest task (if any)
//params: n/a
//succ: -> exits: return taskId(INT) & siteId(INT) || !exists, return null for ea.
//fail: return error
queue.get('/task', (req, res) => {
  db.Task.findOne({
    attributes: [
      [db.sequelize.fn('min', db.sequelize.col('id')), 'id'],
      [db.sequelize.fn('min', db.sequelize.col('id')), 'siteId'],
    ]
  })
  .then((task) => {
    const site_id = task.siteId ? task.siteId : null;
    res.status(200).send({id: task.id, siteId: site_id });
  })
  .catch(err => res.status(500).send({error: err}))
})

//Delete completed task
//params: task_id
//invalid params: -> return 400 + msg
//succ: -> exits: return siteId(INT) corresponding to completed task
//fail: return error
queue.delete('/task', (req, res) => {
  if (req.body.task_id) {
    db.Task.findOne({
        where: {
          id : req.body.task_id
        }
    })
    .then((task) => task.destroy())
    .then(deletedTask => {
      const siteId = deletedTask.siteId;
      res.status(202).send({ siteId: siteId });
    })
    .catch(err => res.status(500).send({error: err}))

  } else {
    res.status(400).send({msg:'Bad request'});
  }
})

//L I S T E N

queue.listen(port, () => {
  console.log('queue listening at ', port);
})
