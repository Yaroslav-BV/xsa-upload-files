const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')

const app = express()
const PORT = 4000

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use(multer().single('avatar'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.post('/upload-files', (req, res) => {
  if (!req.file) return res.status(418).json({ message: 'Файл не был загружен' })

  const imageBuffer = req.file.buffer
  const imageName = `uploads/${req.file.originalname}`

  fs.createWriteStream(imageName).write(imageBuffer)

  res.status(201).json({ message: 'Файл загружен' })
})

app.listen(PORT, () => console.log(`Start app http://localhost:${PORT}`))
