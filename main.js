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
  }, 16);
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
  link.textContent = 'Download Image'
  strip.insertBefore(link, strip.firstChild)
}

video.addEventListener('canplay', paintToCanvas)