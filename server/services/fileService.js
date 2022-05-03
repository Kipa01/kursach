const fs = require('fs')
const config = require('config')

class FileService {

	deleteFile(file) {
		fs.unlinkSync(file.path)
	}

}


module.exports = new FileService()