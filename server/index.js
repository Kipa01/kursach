const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes.js")
const userRouter = require("./routes/user.routes.js")
const fileRouter = require("./routes/file.routes.js")
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get("PORT") || 5000
const dbUrl = process.env.dbUrl || "mongodb+srv://admin:admin@cluster0.pf2k0.mongodb.net/kursachDatabase?retryWrites=true&w=majority"

app.use(fileUpload({})) // для загрузки изображений
app.use(corsMiddleware) // устраняет ошибку cors
app.use(express.json()) // чтобы express мог распарсить json строку
app.use("/api/auth", authRouter) // подключаем роут для авторизациия юзера
app.use("/api/user", userRouter) // подключаем роут для изменения картин юзера
app.use("/api/arts", fileRouter) // подключаем роут для файлов(картинок)

const start = async () => {
	try {
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log(`started on PORT ${PORT}`))
	} catch (e) { }
}

start()