const podcastRoutes = require('./podcastRoutes.js')
const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000
const publicPath = path.join(__dirname, '..', 'build')

app.use(express.json())
app.use(express.static(publicPath))

app.use('/api', podcastRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
