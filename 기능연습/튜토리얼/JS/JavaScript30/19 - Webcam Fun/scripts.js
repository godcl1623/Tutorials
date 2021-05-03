const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      alert(`에러 발생 - ${err}`);
    });
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i+0] = pixels.data[i+0]+100; // R
		pixels.data[i+1] = pixels.data[i+1] - 50; // G
		pixels.data[i+2] = pixels.data[i+2] * 0.5; // B
		// pixels[i+3] // 알파
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i-150] = pixels.data[i+0]; // R
		pixels.data[i+100] = pixels.data[i+1]; // G
		pixels.data[i-150] = pixels.data[i+2]; // B
		pixels[i+3] // 알파
	}
	return pixels;
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		// 그림 효과
		// pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1;
		// 효과 적용
		ctx.putImageData(pixels, 0, 0);
	});
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="test_image">`;
	strip.insertBefore(link, strip.firstChild);
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
