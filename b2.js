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
    
    // Set target size to 2000 pixels for the height
    const targetHeight = 2000;
    // Calculate width based on aspect ratio
    const aspectRatio = frame.offsetWidth / frame.offsetHeight;
    const targetWidth = Math.round(targetHeight * aspectRatio);
    
    // Set canvas to the high resolution dimensions
    finalCanvas.width = targetWidth;
    finalCanvas.height = targetHeight;
    
    // Fill the background
    ctxFinal.fillStyle = getComputedStyle(frame).backgroundColor; 
    ctxFinal.fillRect(0, 0, targetWidth, targetHeight);
    
    // Calculate scaling factor
    const scaleX = targetWidth / frame.offsetWidth;
    const scaleY = targetHeight / frame.offsetHeight;
    
    // Get boxes and prepare to load high-res versions of images
    const boxes = frame.getElementsByClassName('box');
    
    // Create an array to hold promises for image loading
    const promises = [];
    
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (!box.style.backgroundImage || box.style.backgroundImage === 'none') {
            continue;
        }
        
        // Get the original image URL
        const bgImage = box.style.backgroundImage;
        const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
        if (!urlMatch) continue;
        
        // Instead of using the already-rendered small image, let's go back to the canvas data
        const index = Array.from(boxes).indexOf(box);
        if (index >= 0 && index < images.length) {
            const imgSrc = images[index];
            
            // Create a promise for loading the image
            const promise = new Promise((resolve) => {
                const img = new Image();
                img.src = imgSrc;
                
                img.onload = () => {
                    // Calculate position and dimensions scaled up to the high-res canvas
                    const x = Math.round(box.offsetLeft * scaleX);
                    const y = Math.round(box.offsetTop * scaleY);
                    const width = Math.round(box.offsetWidth * scaleX);
                    const height = Math.round(box.offsetHeight * scaleY);
                    
                    // Draw the high-resolution image
                    ctxFinal.drawImage(img, x, y, width, height);
                    resolve();
                };
                
                img.onerror = () => {
                    console.error('Failed to load image:', img.src);
                    resolve();
                };
            });
            
            promises.push(promise);
        }
    }
    
    // Wait for all images to be drawn, then add watermark
    Promise.all(promises).then(() => {
        // Draw the watermark text
        const boxy = frame.querySelector('.boxy');
        if (boxy) {
            const watermarks = boxy.getElementsByClassName('watermark');
            
            // Get the position for the watermark
            const boxesBottom = Math.max(...Array.from(boxes).map(box => 
                (box.offsetTop + box.offsetHeight) * scaleY
            ));
            
            const watermarkY = boxesBottom + (30 * scaleY); // Position below the images, scaled
            
            // Save context state
            ctxFinal.save();
            
            // Set text properties for high resolution
            ctxFinal.fillStyle = 'white';
            
            // Scale the font size based on the height scaling factor
            const fontSize = Math.round(12 * scaleY);
            ctxFinal.font = `${fontSize}px Borel, Arial`;
            
            // Calculate the total width of all watermarks combined
            let totalWidth = 0;
            const watermarkTexts = [];
            
            for (let i = 0; i < watermarks.length; i++) {
                const text = watermarks[i].innerText;
                watermarkTexts.push(text);
                totalWidth += ctxFinal.measureText(text).width;
            }
            
            // Calculate the starting X position to center all watermarks
            let currentX = (targetWidth - totalWidth) / 2;
            
            // Apply shadow for better visibility (scaled)
            ctxFinal.shadowColor = 'rgba(0, 0, 0, 0.7)';
            ctxFinal.shadowBlur = Math.round(3 * scaleX);
            ctxFinal.shadowOffsetX = Math.round(1 * scaleX);
            ctxFinal.shadowOffsetY = Math.round(1 * scaleY);
            
            // Draw each watermark text
            for (let i = 0; i < watermarkTexts.length; i++) {
                const text = watermarkTexts[i];
                ctxFinal.fillText(text, currentX, watermarkY);
                currentX += ctxFinal.measureText(text).width;
            }
            
            // Restore context state
            ctxFinal.restore();
        }
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        
        // Use maximum quality
        link.href = finalCanvas.toDataURL('image/png', 1.0);
        link.download = 'photo_strip_high_res.png';
        link.click();
        
        console.log(`Downloaded high-resolution image: ${finalCanvas.width}x${finalCanvas.height} pixels`);
    });
}