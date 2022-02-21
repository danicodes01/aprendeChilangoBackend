const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') // helps parse the request cookie
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected'))

mongoose.connection.on('err', err => {
  console.log(`DB connection error: ${err.message}`)
})

const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const chilangoRoutes = require('./routes/chilango')
// apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

//middleware
const learnChilango = (req, res, next) => {
  console.log('☮')
  next()
}
app.use(morgan('dev'))
app.use(learnChilango)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use('/', postRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', chilangoRoutes)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ error: 'umm excuse me... you are not authorized to do that 🙈' })
  }
})
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`🛸 listening on port:${port}`))

