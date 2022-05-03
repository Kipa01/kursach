const { Router } = require("express")
const router = new Router()
const User = require("../models/User")

router.post("/add", async (req, res) => { // добавление картины в избранное
	try {
		const { _id, filePath } = req.body
		const user = await User.findOne({ _id })
		if (user.files.find(item => item === filePath)) {
			return res.status(400).json({ message: "Вы уже добавили эту картину в избранное" })
		} else {
			user.files.push(filePath)
			await user.save()
			return res.status(200).json({
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
					files: user.files
				}, message: "Добавлено в избранное"
			})
		}
	} catch (e) {
		res.send({ message: "не удалось добавить картину в избранное" })
	}
})

router.post("/del", async (req, res) => { // удаление картины из избранного
	try {
		const { _id, filePath } = req.body
		const user = await User.findOne({ _id })
		const newArr = user.files.filter(item => item !== filePath)
		user.files = newArr
		await user.save()
		return res.status(200).json({
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				files: user.files
			}, message: "Удалено из избранного"
		})
	} catch (e) {
		res.send({ message: "не удалось добавить картину в избранное" })
	}
})


module.exports = router