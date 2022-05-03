const File = require('../models/File')
const config = require("config")
const fileService = require('../services/fileService')
const path = require('path')

class FileController {
	async getFiles(req, res) { // получение всех картин с сервера
		try {
			const files = await File.find({})
			return res.json(files)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: "Ошибка при получении картин" })
		}
	}

	async uploadFile(req, res) { // загрузка картины на сервер черед админку
		try {
			const { name, author, desc } = req.body
			const file = req.files.file
			let pathFile = path.resolve(__dirname, `../../client/src/static/images/arts/${file.name}`)
			const alreadyExists = await File.findOne({ name: name })
			const alreadyExists2 = await File.findOne({ path: pathFile })

			if (!alreadyExists) {
				if (file.size >= 400000) return res.status(400).json({ message: "Недопустимый размер файла" })
				if (alreadyExists2) return res.status(400).json({ message: "Файл с таким именем уже существует" })
				file.mv(pathFile)

				const type = file.name.split('.').pop()
				if (!config.get("types").split(",").some(el => el === type)) return res.status(400).json({ message: "Недопустимый формат файла" })
				const dbFile = new File({
					name,
					author,
					desc,
					type,
					size: file.size,
					path: pathFile
				})

				await dbFile.save()
				return res.json({ art: dbFile, message: "Картина была добавлена" })
			} else {
				return res.status(400).json({ message: "Картина с таким именем уже существует" })
			}
		} catch (e) {
			return res.status(500).json({ message: "При загрузке произошла ошибка" })
		}
	}

	async deleteFile(req, res) { // удаление картины с сервера через админку
		try {
			const file = await File.findOne({ _id: req.query.id })
			if (!file) {
				return res.status(400).json({ message: 'Картина не найдена' })
			}
			fileService.deleteFile(file)
			await file.remove()
			return res.json({ message: 'Картина успешно удалена' })
		} catch (e) {
			return res.status(400).json({ message: 'Произошла ошибка при удалении картины' })
		}
	}
}

module.exports = new FileController()