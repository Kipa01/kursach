const { Router } = require("express")
const router = new Router()
const config = require("config")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/registration", async (req, res) => { // регистрация пользователя
	try {
		const { email, password } = req.body
		const isUsed = await User.findOne({ email })
		if (isUsed) return res.status(400).json({ message: "Пользователь с данным Email уже существует" })

		const hashedPassword = await bcrypt.hash(password + 'vnciu2149cb.asf', 12)
		const user = new User({ email, password: hashedPassword, role: 'user' })
		await user.save()
		return res.status(200).json({ message: "Вы успешно зарегистрировались" })
	} catch (e) {
		res.send({ message: "На сервере произошла ошибка" })
	}
})

router.post("/login", async (req, res) => { // авторизация пользователя
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) return res.status(400).json({ message: "Пользователя с введенным Email не существует" })
		if (!(await bcrypt.compare(password + 'vnciu2149cb.asf', user.password))) return res.status(400).json({ message: "Неверный пароль" })

		const token = jwt.sign(
			{ id: user.id },
			config.get("secretKey"),
			{ expiresIn: '1h' }
		)
		return res.status(200).json({
			token,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				files: user.files
			},
			message: "Вы вошли в аккаунт"
		})
	} catch (error) {
		res.send({ message: "На сервере произошла ошибка" })
	}
})

router.get('/auth', authMiddleware, // чтобы пользователя не разлогинивало после перезагрузки страницы 
	async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.user.id })
			const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
					files: user.files
				}
			})
		} catch (e) { res.send({ message: "ошибка сервера" }) }
	})

module.exports = router