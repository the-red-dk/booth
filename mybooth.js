/*const video = document.getElementById('video');
const strip = document.getElementById('strip');
const countdownEl = document.createElement('div');
countdownEl.className = 'countdown';
document.querySelector('.photo').appendChild(countdownEl);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const images = [];
let timer = 3;

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.style.transform = ''; // Ensure no mirroring effect
    video.style.objectFit = 'contain'; // Ensure the video fills the frame
});

document.getElementById('timer').addEventListener('change', (e) => {
    timer = parseInt(e.target.value);
});

function startCountdown() {
    let count = timer;
    let photoCount = 4;
    countdownEl.style.display = 'block';
    captureSequence(count, photoCount);
}

function captureSequence(interval, remaining) {
    if (remaining === 0) {
        countdownEl.style.display = 'none';
        return;
    }
    let count = interval;
    countdownEl.innerText = count;

    const countdownInterval = setInterval(() => {
        count--;
        if (count === 0) {
            countdownEl.innerText = "Snap!";
            takePhoto();
            clearInterval(countdownInterval);
            setTimeout(() => captureSequence(interval, remaining - 1), 1000);
        } else {
            countdownEl.innerText = count;
        }
    }, 1000);
}

// function takePhoto() {
//     const videoAspectRatio = video.videoWidth / video.videoHeight;
//     const photoWidth = video.offsetWidth;
//     const photoHeight = photoWidth / videoAspectRatio;

//     canvas.width = photoWidth;
//     canvas.height = photoHeight;
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Capture the full video frame

//     const img = document.createElement('img');
//     img.src = canvas.toDataURL('image/png');
//     const box = strip.querySelectorAll('.box')[images.length];
//     if (box) box.style.backgroundImage = `url(${img.src})`;
//     images.push(img.src);
// }


function takePhoto() {
    // Set canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Create an image element and set its source to the canvas data
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');

    // Find the corresponding box in the strip to display the captured image
    const box = strip.querySelectorAll('.box')[images.length];
    if (box) {
        box.style.backgroundImage = `url(${img.src})`;
        box.style.backgroundSize = 'cover'; // Ensure the image covers the box
        box.style.backgroundPosition = 'center'; // Center the image in the box
    }

    // Store the image source in the images array
    images.push(img.src);
}

function downloadImage() {
    const frame = document.getElementById('strip'); // Get the frame container
    const finalCanvas = document.createElement('canvas');
    const ctxFinal = finalCanvas.getContext('2d');

    // Set canvas dimensions to match the frame
    finalCanvas.width = frame.offsetWidth;
    finalCanvas.height = frame.offsetHeight;

    // Draw the frame's background
    ctxFinal.fillStyle = getComputedStyle(frame).backgroundColor; 
    ctxFinal.fillRect(0, 0, finalCanvas.width, finalCanvas.height); 

    // Draw each box's content and corresponding text
    const boxes = frame.getElementsByClassName('box');
    const watermarkTexts = frame.getElementsByClassName('watermark'); // Get all watermark texts

    // Create an array to hold promises for image loading
    const promises = Array.from(boxes).map((box, index) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = box.style.backgroundImage.slice(5, -2); // Extract the URL from the background image
            const x = box.offsetLeft;
            const y = box.offsetTop;
            const width = box.offsetWidth;
            const height = box.offsetHeight;

            img.onload = () => {
                // Draw the image onto the canvas
                ctxFinal.drawImage(img, x, y, width, height);

                // Draw the watermark text below the image
                if (index < watermarkTexts.length) {
                    const textElement = watermarkTexts[index];
                    ctxFinal.fillStyle = 'white'; // Set text color to white
                    ctxFinal.font = '11.67px Borel'; // Set text font and size
                    const textY = y + height + 20; // Adjust y position for text
                    const textX = x + (width / 2) - (ctxFinal.measureText(textElement.innerText).width / 2); // Center the text
                    ctxFinal.fillText(textElement.innerText, textX, textY); // Draw the text
                }
                resolve(); // Resolve the promise when the image is loaded and drawn
            };
        });
    });

    // Wait for all images to load and then trigger download
    Promise.all(promises).then(() => {
        const link = document.createElement('a');
        link.href = finalCanvas.toDataURL('image/png');
        link.download = 'photo_strip.png';
        link.click();
    });
}*/

const video = document.getElementById('video');
const strip = document.getElementById('strip');
const countdownEl = document.createElement('div');
countdownEl.className = 'countdown';
document.querySelector('.photo').appendChild(countdownEl);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const images = [];
let timer = 3;

// Update the date watermark when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Update the date watermark with the current date
    const dateWatermark = document.getElementById('date-watermark');
    if (dateWatermark) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        
        dateWatermark.innerText = `${dd}-${mm}-${yyyy}`;
    }
});

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
    video.style.transform = ''; // Ensure no mirroring effect
    video.style.objectFit = 'contain'; // Ensure the video fills the frame
});

document.getElementById('timer').addEventListener('change', (e) => {
    timer = parseInt(e.target.value);
});

function startCountdown() {
    let count = timer;
    let photoCount = 4;
    countdownEl.style.display = 'block';
    captureSequence(count, photoCount);
}

function captureSequence(interval, remaining) {
    if (remaining === 0) {
        countdownEl.style.display = 'none';
        return;
    }
    let count = interval;
    countdownEl.innerText = count;

    const countdownInterval = setInterval(() => {
        count--;
        if (count === 0) {
            countdownEl.innerText = "Snap!";
            takePhoto();
            clearInterval(countdownInterval);
            setTimeout(() => captureSequence(interval, remaining - 1), 1000);
        } else {
            countdownEl.innerText = count;
        }
    }, 1000);
}

function takePhoto() {
    // Set canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Create an image element and set its source to the canvas data
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');

    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);

    // Find the corresponding box in the strip to display the captured image
    const box = strip.querySelectorAll('.box')[images.length];
    if (box) {
        box.style.backgroundImage = `url(${img.src})`;
        box.style.backgroundSize = 'cover'; // Ensure the image covers the box
        box.style.backgroundPosition = 'center'; // Center the image in the box
    }

    // Store the image source in the images array
    images.push(img.src);
}

function downloadImage() {
    const frame = document.getElementById('strip');
    const finalCanvas = document.createElement('canvas');
    const ctxFinal = finalCanvas.getContext('2d');

    // Set canvas dimensions to match the frame
    finalCanvas.width = frame.offsetWidth;
    finalCanvas.height = frame.offsetHeight;

    // Draw the frame's background
    ctxFinal.fillStyle = getComputedStyle(frame).backgroundColor; 
    ctxFinal.fillRect(0, 0, finalCanvas.width, finalCanvas.height); 

    // Draw each box's content
    const boxes = frame.getElementsByClassName('box');
    
    // Create an array to hold promises for image loading
    const promises = Array.from(boxes).map((box) => {
        return new Promise((resolve) => {
            if (!box.style.backgroundImage || box.style.backgroundImage === 'none') {
                resolve(); // No image to load
                return;
            }
            
            const img = new Image();
            const bgImage = box.style.backgroundImage;
            // Extract URL correctly - handles both url("...") and url('...') formats
            const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (!urlMatch) {
                resolve();
                return;
            }
            
            img.src = urlMatch[1];
            const x = box.offsetLeft;
            const y = box.offsetTop;
            const width = box.offsetWidth;
            const height = box.offsetHeight;

            img.onload = () => {
                // Draw the image onto the canvas
                ctxFinal.drawImage(img, x, y, width, height);
                resolve();
            };
            
            img.onerror = () => {
                console.error('Failed to load image:', img.src);
                resolve();
            };
        });
    });

    // Wait for all images to load and then add watermark and trigger download
    Promise.all(promises).then(() => {
        // Draw the watermark text
        const boxy = frame.querySelector('.boxy');
        if (boxy) {
            const watermarks = boxy.getElementsByClassName('watermark');
            
            // Get the position for the watermark (centered at the bottom of the frame)
            const boxesBottom = Array.from(boxes).reduce((max, box) => {
                return Math.max(max, box.offsetTop + box.offsetHeight);
            }, 0);
            
            const watermarkY = boxesBottom + 20; // Position below the images
            
            // Save context state
            ctxFinal.save();
            
            // Set text properties - Reduced font size from 12px to 6px to make it tiny
            ctxFinal.fillStyle = 'white';
            ctxFinal.font = '6px Borel, Arial'; // Reduced to 6px for tiny watermark
            
            // Calculate the total width of all watermarks combined
            let totalWidth = 0;
            const watermarkTexts = [];
            
            for (let i = 0; i < watermarks.length; i++) {
                const text = watermarks[i].innerText;
                watermarkTexts.push(text);
                totalWidth += ctxFinal.measureText(text).width;
            }
            
            // Calculate the starting X position to center all watermarks
            let currentX = (finalCanvas.width - totalWidth) / 2;
            
            // Apply shadow for better visibility (reduced shadow for smaller text)
            ctxFinal.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctxFinal.shadowBlur = 1;  // Reduced from 3 to 1
            ctxFinal.shadowOffsetX = 0.5;  // Reduced from 1 to 0.5
            ctxFinal.shadowOffsetY = 0.5;  // Reduced from 1 to 0.5
            
            // Draw each watermark text
            for (let i = 0; i < watermarkTexts.length; i++) {
                const text = watermarkTexts[i];
                ctxFinal.fillText(text, currentX, watermarkY);
                currentX += ctxFinal.measureText(text).width;
            }
            
            // Restore context state
            ctxFinal.restore();
        }
        
        const link = document.createElement('a');
        link.href = finalCanvas.toDataURL('image/png');
        link.download = 'photo_strip.png';
        link.click();
    });
}