const inputFile = document.getElementById('input-file')
const sendBtn = document.getElementById('send-file')
const imgContainer = document.getElementById('img-container')

// Отображение мини-изображения файла на странице
const getFile = () => {
  imgContainer.innerHTML = ''

  if (!inputFile.files.length) {
    imgContainer.innerHTML = 'Изображение не выбрано'
    return
  }

  Array.from(inputFile.files).forEach(file => {
    const img = document.createElement('img')
    img.file = file
    imgContainer.appendChild(img)

    var reader = new FileReader()
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result
      }
    })(img)
    reader.readAsDataURL(file)
  })
}

inputFile.addEventListener('change', getFile)

// Отправка файла на сервер
const sendFile = async () => {
  if (!inputFile.files.length) {
    imgContainer.innerHTML = 'Изображение не выбрано'
    return
  }

  try {
    const formData = new FormData()
    formData.append('avatar', inputFile.files[0], inputFile.files[0].name)

    const response = await fetch('/upload-files', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    console.log(data)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

sendBtn.addEventListener('click', sendFile)
