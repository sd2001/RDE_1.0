const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

const notes = require('./routes/notes')
const PORT = process.env.PORT || 8000


app.listen(PORT, () => console.log("Server Up and Running!"))
app.use(express.json())
app.use('/notes', notes)

mongoose.connect(process.env.MONGO,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log("Connection established with Database"))