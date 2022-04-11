const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject = localMediaStream;
      video.play()
    })
    .catch(err => {
      console.error(err)
    })
}

getVideo();

const paintToCanvas = () => {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height
  console.log(width, height)
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    // Take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height)
    // Mess with them
    pixels = redEffect(pixels)
    // Put them back
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 100 // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
  }
  return pixels
}

const takePhoto = () => {
  // Played the sound
  snap.currentTime = 0
  snap.play()
  // Take data out of the canvas
  const data = canvas.toDataURL('image/png')
  console.log(data)
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src=${data} alt='Img' />`
  strip.insertBefore(link, strip.firstChild)
}

video.addEventListener('canplay', paintToCanvas)