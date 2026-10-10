
const express = require('express')

const app = express()
const PORT = 3002

// Middleware to read JSON data
app.use(express.json())

// Sample event records
let events = [
  {
    id: 1,
    name: 'Tech Fest',
    date: '2026-11-15',
    location: 'GITAM University'
  },
  {
    id: 2,
    name: 'Cultural Night',
    date: '2026-11-20',
    location: 'University Auditorium'
  }
]

// Home route
app.get('/', (req, res) => {
  res.send('Online Event Management API is running!')
})

// GET: Retrieve all events
app.get('/events', (req, res) => {
  res.status(200).json(events)
})

// GET: Retrieve an event by ID
app.get('/events/:id', (req, res) => {
  const id = Number(req.params.id)
  const event = events.find(event => event.id === id)

  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  res.status(200).json(event)
})

// POST: Add a new event
app.post('/events', (req, res) => {
  const { name, date, location } = req.body

  if (!name || !date || !location) {
    return res.status(400).json({
      message: 'Please provide name, date, and location'
    })
  }

  const newEvent = {
    id: events.length
      ? Math.max(...events.map(event => event.id)) + 1
      : 1,
    name,
    date,
    location
  }

  events.push(newEvent)

  res.status(201).json({
    message: 'Event added successfully',
    event: newEvent
  })
})

// PUT: Update an existing event
app.put('/events/:id', (req, res) => {
  const id = Number(req.params.id)
  const event = events.find(event => event.id === id)

  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const { name, date, location } = req.body

  if (!name || !date || !location) {
    return res.status(400).json({
      message: 'Please provide name, date, and location'
    })
  }

  event.name = name
  event.date = date
  event.location = location

  res.status(200).json({
    message: 'Event updated successfully',
    event
  })
})

// DELETE: Remove an event
app.delete('/events/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = events.findIndex(event => event.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const deletedEvent = events.splice(index, 1)[0]

  res.status(200).json({
    message: 'Event deleted successfully',
    event: deletedEvent
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Event API running at http://localhost:${PORT}`)
})
