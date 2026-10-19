const multer = require("multer")
const path = require("path")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter(req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase()

        if (extension !== ".pdf" && extension !== ".docx") {
            const error = new Error("Resume must be a PDF or DOCX file.")
            error.code = "UNSUPPORTED_RESUME_TYPE"
            return callback(error)
        }

        callback(null, true)
    }
})

function uploadResume(req, res, next) {
    upload.single("resume")(req, res, error => {
        if (!error) {
            return next()
        }

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Resume must be 5 MB or smaller." })
        }

        if (error.code === "UNSUPPORTED_RESUME_TYPE") {
            return res.status(400).json({ message: error.message })
        }

        if (error instanceof multer.MulterError) {
            return res.status(400).json({ message: "Upload one resume file at a time." })
        }

        next(error)
    })
}

module.exports = uploadResume