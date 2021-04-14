const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

const notes = require('./routes/notes')
const users = require('./routes/users')
const PORT = process.env.PORT || 8000

// Connection to Database
mongoose.connect(process.env.MONGO,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log("Connection established with Database")
)

app.listen(PORT, () => console.log("Server Up and Running!"))
//Middleware
app.use(express.json())
// Routes
app.use('/notes', notes)
app.use('/users', users)