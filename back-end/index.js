const fs = require('fs');
const express = require('express');
const moment = require('moment');
const cors = require('cors');
const path = require('path');
const app = express()
const PORT = 2500

app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(express.json())
app.use(cors())

// events
app.get('/api/events/:month', function (req, res) {
  const queryDate = req.params.month
  console.log('queryDate', queryDate)

  const filePath = path.join(__dirname, '/static/schedule.json');
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  const events = scheduleObject[queryDate]
  console.log(events)
  res.send(events)
})

app.post('/api/events', function (req, res) {
  const filePath = path.join(__dirname, '/static/schedule.json');
  const event = req.body
  console.log(event)

  const postMonth = moment(event.start).format('YYYY-MM')
  const postDate = moment(event.start).format('YYYY-MM-DD')
  console.log('postMonth', postMonth)
  console.log('postDate', postDate)
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  if (scheduleObject[postMonth]) {
    if (scheduleObject[postMonth][postDate]) {
      scheduleObject[postMonth][postDate].events
        ? scheduleObject[postMonth][postDate].events.push(event)
        : scheduleObject[postMonth][postDate].events = [event]
    }
    else {
      scheduleObject[postMonth][postDate] = {
        events: [event]
      }
    }
  }
  else {
    scheduleObject[postDate] = {
      events: [event]
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(scheduleObject, null, 2))
  res.send({ status: 'ok' })
})

// app.delete('/api/events/:id', function (req, res) {
//   const id = req.params.id
//   console.log('eventId', id)

//   const filePath = path.join(__dirname, '/static/schedule.json');
//   const schedule = fs.readFileSync(filePath, 'utf8')
//   const scheduleArray = JSON.parse(schedule)

//   if (scheduleArray.find((item) => item.id === id)) {
//     const newScheduleArray = scheduleArray.filter((item) => item.id !== id)
//     fs.writeFileSync(filePath, JSON.stringify(newScheduleArray, null, 2))
//     res.send({ status: 'ok' })
//   }
//   else {
//     res.status(404).send({ status: 'error' })
//   }
// })

// todos
app.get('/api/todos/:day', function (req, res) {
  const queryDate = req.params.day
  console.log('queryDate', queryDate)

  const queryMonth = moment(queryDate).format('YYYY-MM')
  console.log(queryMonth)
  const filePath = path.join(__dirname, '/static/schedule.json');
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  const monthObject = scheduleObject[queryMonth]
  const dayObject = monthObject[queryDate]
  const todosArray = dayObject?.todos || []
  res.send(todosArray)
})

app.post('/api/todos', function (req, res) {
  const filePath = path.join(__dirname, '/static/schedule.json');
  const todo = req.body
  console.log(todo)

  const postMonth = moment(todo.start).format('YYYY-MM')
  const postDate = moment(todo.start).format('YYYY-MM-DD')
  console.log('postMonth', postMonth)
  console.log('postDate', postDate)
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  if (scheduleObject[postMonth]) {
    if (scheduleObject[postMonth][postDate]) {
      scheduleObject[postMonth][postDate].todos
        ? scheduleObject[postMonth][postDate].todos.push(todo)
        : scheduleObject[postMonth][postDate].todos = [todo]
    }
    else {
      scheduleObject[postMonth][postDate] = {
        todos: [todo]
      }
    }
  }
  else {
    scheduleObject[postDate] = {
      todos: [todo]
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(scheduleObject, null, 2))
  res.send({ status: 'ok' })
})

app.put('/api/todos', function (req, res) {
  const todo = req.body
  console.log(todo)

  const postMonth = moment(todo[0].start).format('YYYY-MM')
  const postDate = moment(todo[0].start).format('YYYY-MM-DD')

  const filePath = path.join(__dirname, '/static/schedule.json');
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  if (scheduleObject[postMonth]) {
    if (scheduleObject[postMonth][postDate]) {
      scheduleObject[postMonth][postDate].todos = todo
      console.log(scheduleObject[postMonth][postDate].todos)
      fs.writeFileSync(filePath, JSON.stringify(scheduleObject, null, 2))
    }
  }
  res.send({ status: 'ok' })
})

app.delete('/api/todos/', function (req, res) {
  const todo = req.body
  console.log(todo)

  const postMonth = moment(todo[0].start).format('YYYY-MM')
  const postDate = moment(todo[0].start).format('YYYY-MM-DD')

  const filePath = path.join(__dirname, '/static/schedule.json');
  const schedule = fs.readFileSync(filePath, 'utf8')
  const scheduleObject = JSON.parse(schedule)

  if (scheduleObject[postMonth]) {
    if (scheduleObject[postMonth][postDate]) {
      scheduleObject[postMonth][postDate].todos = todo
      console.log(scheduleObject[postMonth][postDate].todos)
      fs.writeFileSync(filePath, JSON.stringify(scheduleObject, null, 2))
    }
  }
  res.send({ status: 'ok' })
})

// carts
app.get('/api/carts', function (req, res) {
  const filePath = path.join(__dirname, '/static/carts.json');
  const cartsJson = fs.readFileSync(filePath, 'utf8')
  const cartsArray = JSON.parse(cartsJson)
  console.log(cartsArray)
  res.send(cartsArray)
})

app.post('/api/carts', function (req, res) {
  const cartsArray = req.body
  console.log(cartsArray)

  const filePath = path.join(__dirname, '/static/carts.json');
  fs.writeFileSync(filePath, JSON.stringify(cartsArray, null, 2))
  
  res.send({ status: 'ok' })
})

// html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front-end/', 'build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})