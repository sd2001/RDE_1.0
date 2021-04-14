const express = require('express')
const bcrypt = require("bcrypt");
const Schema = require('../models/schema')
const router = express.Router()

var User = Schema.user_model

// Get all users
router.get('/', async (req, res) => {
	try {
		const users = await User.find({})
		if (!users) {
			return res.status(400).send({
				message: "Data Not Found"
			});
		}
		else res.send(users)
	}
	catch (err) {
		res.status(500).send(err)
	}

})

// Create an user
router.post('/create', async (req, res) => {
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	});

	const salt = await bcrypt.genSalt(10)
	try {
		user.password = await bcrypt.hash(user.password, salt); await user.save()
		res.send(user)
	}
	catch (error) {
		res.status(406).json({ message: error })
	}
})

// Get the data of a particular user
router.get('/:pk', async (req, res) => {
	try {
		const note = await User.findById(req.params.pk)
		if (!note) {
			return res.status(400).send({
				message: "User Not Found"
			});
		}
		else
			res.status(200).send(note)
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
})

// Update the data of an user
router.put('/:pk', async (req, res) => {
	{
		if (!req.body) {
			return res.status(400).send({
				message: "Data to update can not be empty!"
			});
		}
		try {
			const updated = await User.findOneAndUpdate(req.params.pk,
				req.body, { useFindAndModify: false })
			res.status(200).send(updated)
		}
		catch (err) {
			res.status(500).json({ message: err })
		}
	}
})

// Remove an user from Database
router.delete('/:pk', async (req, res) => {
	try {
		const deleted = await User.remove({ _id: req.params.pk })
		if (!deleted) {
			return res.status(400).send({
				message: "User Not Found"
			});
		}
		else res.status(200).send(deleted)
	}
	catch (err) {
		res.status(500).json({ message: err })
	}
})

module.exports = router