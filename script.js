const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const snapBtn = document.getElementById('snap-btn');
const photoPreview = document.getElementById('photo-preview');
const downloadBtn = document.getElementById('download-btn');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Gagal mengakses kamera: ", err);
        alert("Izin kamera diperlukan untuk menggunakan photobooth.");
    });

snapBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    photoPreview.src = dataUrl;
    
    downloadBtn.href = dataUrl;
    downloadBtn.download = `photobooth-${Date.now()}.png`;
    downloadBtn.style.display = 'inline-block';
});
