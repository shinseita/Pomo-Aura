


















//music player

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// List lagu
const songs = ['Anything-You-Want', 'About-You', 'Miss-You-Like-Crazy','Right-Here-Waiting'];

// Keep track of song
let songIndex = 2;

// Load Lagu
loadSong(songs[songIndex]);

// Update Lagu
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Putar
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Update bar progres
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Atur progres bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Durasi lagu & Durasi saat ini
function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    // Durasi Menit
    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    // Durasi Detik
    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' :
        Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }

    // define sec duration

    get_sec_d(duration);

    // Ubah durasi dom
    durTime.innerHTML = min_d + ':' + sec_d;

};

// Event pause
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Ganti Lagu
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Update durasi/lagu
audio.addEventListener('timeupdate', updateProgress);

// Atur durasi
progressContainer.addEventListener('click', setProgress);

// Ending lagu
audio.addEventListener('ended', nextSong);

// Durasi
audio.addEventListener('timeupdate', DurTime);

// Tambahan fitur autoplay ketika website terbuka
document.addEventListener('DOMContentLoaded', function() {
    // Opsi 1: Mencoba autoplay langsung
    try {
        playSong();
    } catch (e) {
        console.log('Autoplay tidak diizinkan tanpa interaksi pengguna');
    }
    
    // Opsi 2: Gunakan pendekatan alternatif dengan Promise untuk menghandle kebijakan autoplay browser
    audio.addEventListener('canplaythrough', function() {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay berhasil
                musicContainer.classList.add('play');
                playBtn.querySelector('i.fas').classList.remove('fa-play');
                playBtn.querySelector('i.fas').classList.add('fa-pause');
            })
            .catch(error => {
                // Autoplay diblokir oleh browser
                console.log('Autoplay diblokir browser:', error);
                // Masih perlu interaksi pengguna
            });
        }
    });
});

//End of music player

//Floating photos
class FloatingPhoto {
    constructor(src, container, options = {}) {
        // Default options with customization
        this.options = {
            minSize: options.minSize || 100,
            maxSize: options.maxSize || 250,
            rotationRange: options.rotationRange || 15,
            speedFactor: options.speedFactor || 1,
            bounceElasticity: options.bounceElasticity || 0.9,
            zIndexBase: options.zIndexBase || 1000
        };

        // Create and configure element
        this.element = document.createElement('img');
        this.element.src = src;
        this.element.alt = 'Floating photo';
        this.element.classList.add('floating-photo');

        // Randomize size
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        this.element.style.width = `${size}px`;

        // Add shadow and initial rotation for better visual effect
        this.element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
        this.rotation = Math.random() * this.options.rotationRange * 2 - this.options.rotationRange;
        this.element.style.transform = `rotate(${this.rotation}deg)`;

        // Randomize z-index for natural layering
        this.element.style.zIndex = Math.floor(Math.random() * 10) + this.options.zIndexBase;

        // Container and position
        this.container = container;
        this.x = Math.random() * (container.clientWidth - size);
        this.y = Math.random() * (container.clientHeight - size);

        // Velocity with configurable speed factor
        this.vx = (Math.random() * 4 - 2) * this.options.speedFactor;
        this.vy = (Math.random() * 4 - 2) * this.options.speedFactor;

        // Rotation velocity
        this.rotationVelocity = (Math.random() * 0.4 - 0.2);

        // Set initial position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Dragging properties
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.dragStartTime = 0;

        // Setup event listeners
        this.setupEventListeners();
        container.appendChild(this.element);

        // Add hover effect
        this.addHoverEffect();
    }

    setupEventListeners() {
        // Mouse events
        this.element.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));

        // Touch events for mobile
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.startDrag(mouseEvent);
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.isDragging) return;

        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        this.drag(mouseEvent);
    }

    handleTouchEnd(e) {
        this.stopDrag();
    }

    addHoverEffect() {
        this.element.addEventListener('mouseenter', () => {
            if (!this.isDragging) {
                this.element.style.transform = `rotate(${this.rotation}deg) scale(1.1)`;
                this.element.style.zIndex = 9999;
                this.element.style.boxShadow = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
            }
        });

        this.element.addEventListener('mouseleave', () => {
            if (!this.isDragging) {
                this.element.style.transform = `rotate(${this.rotation}deg) scale(1)`;
                this.element.style.zIndex = Math.floor(Math.random() * 10) + this.options.zIndexBase;
                this.element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';
            }
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.dragStartTime = Date.now();
        this.prevDragX = e.clientX;
        this.prevDragY = e.clientY;
        this.offsetX = e.clientX - this.x;
        this.offsetY = e.clientY - this.y;

        // Visual feedback for dragging
        this.element.style.transition = 'none';
        this.element.style.zIndex = 9999;
        this.element.style.cursor = 'grabbing';
        this.element.style.boxShadow = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';
    }

    drag(e) {
        if (!this.isDragging) return;

        // Calculate new position
        this.x = e.clientX - this.offsetX;
        this.y = e.clientY - this.offsetY;

        // Calculate velocity from drag (for momentum after release)
        const currentTime = Date.now();
        const dt = (currentTime - this.dragStartTime) / 20; // Time factor
        if (dt > 0) {
            this.vx = (e.clientX - this.prevDragX) / dt;
            this.vy = (e.clientY - this.prevDragY) / dt;
        }

        this.prevDragX = e.clientX;
        this.prevDragY = e.clientY;
        this.dragStartTime = currentTime;

        // Keep within container boundaries
        this.x = Math.max(0, Math.min(this.x, this.container.clientWidth - this.element.offsetWidth));
        this.y = Math.max(0, Math.min(this.y, this.container.clientHeight - this.element.offsetHeight));

        // Update position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    stopDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;

        // Apply momentum but cap the speed for smoother experience
        const maxSpeed = 15;
        this.vx = Math.max(-maxSpeed, Math.min(this.vx, maxSpeed));
        this.vy = Math.max(-maxSpeed, Math.min(this.vy, maxSpeed));

        // Reset visual styles
        this.element.style.transition = 'transform 0.3s, box-shadow 0.3s';
        this.element.style.cursor = 'grab';
        this.element.style.boxShadow = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)';

        // Allow velocity to carry on
        setTimeout(() => {
            this.vx *= 0.5; // Reduce momentum over time
            this.vy *= 0.5;
        }, 300);
    }

    handleResize() {
        // Keep image within container when window is resized
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientHeight;

        if (this.x + this.element.offsetWidth > containerWidth) {
            this.x = containerWidth - this.element.offsetWidth;
            this.element.style.left = `${this.x}px`;
        }

        if (this.y + this.element.offsetHeight > containerHeight) {
            this.y = containerHeight - this.element.offsetHeight;
            this.element.style.top = `${this.y}px`;
        }
    }

    animate(deltaTime) {
        if (this.isDragging) return;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply slight rotation for more natural movement
        this.rotation += this.rotationVelocity;
        this.element.style.transform = `rotate(${this.rotation}deg)`;

        // Apply only slight friction to maintain movement
        this.vx *= 0.995;
        this.vy *= 0.995;

        // GRAVITAS DIHAPUS: Tidak ada lagi efek gravitasi

        // Bounce off walls with elasticity
        if (this.x <= 0 || this.x >= this.container.clientWidth - this.element.offsetWidth) {
            this.vx *= -this.options.bounceElasticity;
            this.x = Math.max(0, Math.min(this.x, this.container.clientWidth - this.element.offsetWidth));
            // Change rotation direction slightly on bounce
            this.rotationVelocity *= -0.8;
        }

        if (this.y <= 0 || this.y >= this.container.clientHeight - this.element.offsetHeight) {
            this.vy *= -this.options.bounceElasticity;
            this.y = Math.max(0, Math.min(this.y, this.container.clientHeight - this.element.offsetHeight));
            // Change rotation direction slightly on bounce
            this.rotationVelocity *= -0.8;
        }

        // Update element position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Pastikan foto tetap bergerak dengan kecepatan minimum
        const minSpeed = 0.5;
        if (Math.abs(this.vx) < minSpeed && Math.abs(this.vy) < minSpeed) {
            this.vx = (Math.random() * 2 - 1) * this.options.speedFactor;
            this.vy = (Math.random() * 2 - 1) * this.options.speedFactor;
        }
    }

    // Method to change the image source
    changeImage(newSrc) {
        this.element.src = newSrc;
    }
}

// Helper for checking if images are loaded
function preloadImages(images) {
    return Promise.all(images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(`Failed to load image: ${src}`);
            img.src = src;
        });
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('photo-container');

    // Make sure container has position relative for proper positioning
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading photos...';
    loadingIndicator.style.position = 'absolute';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    container.appendChild(loadingIndicator);

    const photos = [
        'images1/Hamster1.png',
        'images1/Hamster2.png',
        'images1/Hamster3.png',
        'images1/Hamster4.png',
    ];

    // Configuration options for different screen sizes
    let options = {
        minSize: 100,
        maxSize: 250,
        speedFactor: 1,
        rotationRange: 15
    };

    // Adjust for mobile
    if (window.innerWidth < 768) {
        options = {
            minSize: 70,
            maxSize: 150,
            speedFactor: 0.7,
            rotationRange: 10
        };
    }

    // Preload images before starting animation
    preloadImages(photos)
        .then(loadedImages => {
            // Remove loading indicator
            container.removeChild(loadingIndicator);

            // Create floating photos
            const floatingPhotos = loadedImages.map(src => new FloatingPhoto(src, container, options));

            // Add photo controls (optional)
            addPhotoControls(container, floatingPhotos);

            // Animation with timestamp for smooth animation
            let lastTime = 0;

            function animatePhotos(timestamp) {
                if (!lastTime) lastTime = timestamp;
                const deltaTime = timestamp - lastTime;
                lastTime = timestamp;

                floatingPhotos.forEach(photo => photo.animate(deltaTime));
                requestAnimationFrame(animatePhotos);
            }

            requestAnimationFrame(animatePhotos);
        })
        .catch(error => {
            console.error('Failed to load images:', error);
            loadingIndicator.textContent = 'Failed to load some images. Please refresh the page.';
        });
});

// Optional UI controls for interactivity
function addPhotoControls(container, photos) {
    const controlPanel = document.createElement('div');
    controlPanel.classList.add('control-panel');
    controlPanel.style.position = 'absolute';
    controlPanel.style.bottom = '10px';
    controlPanel.style.left = '10px';
    controlPanel.style.zIndex = '9999';
    controlPanel.style.background = 'rgba(255,255,255,0.7)';
    controlPanel.style.padding = '10px';
    controlPanel.style.borderRadius = '5px';

    // Add button to add more photos
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Hamster';
    addButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * 4) + 1;
        const newPhoto = new FloatingPhoto(`images1/Hamster${randomIndex}.png`, container);
        photos.push(newPhoto);
    });

    // Add speed control
    const speedControl = document.createElement('div');
    speedControl.style.marginTop = '10px';

    const speedLabel = document.createElement('label');
    speedLabel.textContent = 'Speed: ';

    const speedSlider = document.createElement('input');
    speedSlider.type = 'range';
    speedSlider.min = '0.1';
    speedSlider.max = '2';
    speedSlider.step = '0.1';
    speedSlider.value = '1';
    speedSlider.addEventListener('input', () => {
        const speedFactor = parseFloat(speedSlider.value);
        photos.forEach(photo => {
            photo.vx = photo.vx > 0 ? Math.abs(photo.vx) * speedFactor : -Math.abs(photo.vx) * speedFactor;
            photo.vy = photo.vy > 0 ? Math.abs(photo.vy) * speedFactor : -Math.abs(photo.vy) * speedFactor;
        });
    });

    speedControl.appendChild(speedLabel);
    speedControl.appendChild(speedSlider);

    controlPanel.appendChild(addButton);
    controlPanel.appendChild(speedControl);

    container.appendChild(controlPanel);
}

// Add CSS rules for floating photos
const styleElement = document.createElement('style');
styleElement.textContent = `
.floating-photo {
    position: absolute;
    cursor: grab;
    border-radius: 15px;
    transition: transform 0.3s, box-shadow 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
}

.floating-photo:hover {
    transform: scale(1.1);
}

.floating-photo:active {
    cursor: grabbing;
}

#photo-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 400px;
}

@media (max-width: 768px) {
    .control-panel {
        font-size: 14px;
    }
    
    .control-panel button {
        padding: 5px;
    }
}
`;

document.head.appendChild(styleElement);

//end of floating photos

// CAROUSEL

document.addEventListener('DOMContentLoaded', function () {
    // Configuration
    const totalImages = 50;
    const visibleSlides = 5;
    const autoPlayDelay = 3000;

    // Elements
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators');
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupImage = document.getElementById('popupImage');
    const popupDescription = document.getElementById('popupDescription');

    // State
    let currentSlide = 0;
    let autoPlayInterval;
    const descriptions = [
        {
            title: "Screenshot",
            description: "Foto ini tuh sebenernya bukan foto sukarela yang kamu kasih ke aku. Ini tuh awalnya adalah foto yang kamu up di sw, lalu aku screenshot, hehe."
        },
        {
            title: "Pipi",
            description: "Entah kenapa aku tuh suka banget sama pipi kamu (Pipimu itu terlihat gemassss), jadi ya aku pilih fotomu yang ada di masa lalu ini sksksksk."
        },
        {
            title: "Foto pertama yang aku sukai",
            description: "Sesuai dengan titlenya, ini tuh adalah foto pertama yang menjadi favoritku saat ini, kamu terlihat sangat cantik di mataku."
        },
        {
            title: "Foto pertama yang aku sukai",
            description: "Sama seperti foto sebelumnya, ini adalah foto favorit pertamaku yang pernah kamu kasih ke aku. Alasanya? karena kamu terlihat manis dengan senyumanmu itu dan terllihat begitu cantik."
        },
        {
            title: "Permen",
            description: "Di foto ini sih aku tetep suka dengan senyummu, tapi dulu aku sempat khawatir karena matamu terlihat seperti kelelahan."
        },
        {
            title: "Minta",
            description: "Ceritanya lagi malakin duit, sksksksk."
        },
        {
            title: "Foto pertama rambutmu dipotong",
            description: "Ini adalah foto di mana awal awal kamu habis potong rambut. Kamu bilang ke aku kalau rambutmu itu akan menjadi saksi perjalanan cinta kita. Di situ aku terharu. Dan juga kamu di foto ini terlihat begitu CANTIKKKKKKKK"
        },
        {
            title: "Ai Hoshino",
            description: "Kamu berpose kayak ai hoshino dan nunjukin itu semua ke aku. Di situ kita sadar kalau posenya salah, wkwkwkwkw."
        },
        {
            title: "Favorit lagi",
            description: "Foto ini dan 2 kedepan itu juga termasuk favorit aku. Kamu tuh kalau pakai kacamata jadi kelihatan lebih kalem dan elegan, entah kenapa aku suka itu"
        },
        {
            title: "Favorit",
            description: "Sama kayak alasan sebelumnya, emang kelihatan cakep dan elegan entah kenapa."
        },
        {
            title: "Favorit",
            description: "Sama kayak alasan sebelumnya, emang kelihatan cakep dan elegan entah kenapa."
        },
        {
            title: "Pose",
            description: "Kenapa aku suka foto ini? Karena posemu itu keren banget, senyummu juga aduh gila banget dah pokoknya susah dijelasin pakai kata kata."
        },
        {
            title: "Mature Woman",
            description: "Kamu di foto ini kayak wanita yang udah dewasa banget. Senyum dan sorot matanya itu aku sungguh suka, anglenya juga aku suka."
        },
        {
            title: "Mature Woman",
            description: "Sama kayak sebelumnya, begitu cantik dan punya looks yang elegan."
        },
        {
            title: "Sekula",
            description: "Aku mau ikut ke Bintara juga dong."
        },
        {
            title: "HSFJKJHALFA",
            description: "INI LUCU BANGETTT AAAAAAAAAA. Ini pertama kalinya aku diucapin semangat lewat foto. Berasa jantungan."
        },
        {
            title: "Ini sih elegan",
            description: "Foto ini aku suka karena kamu terlhiat mature, dan vibesnya elegan sekali kayak foto foto sebelumnya."
        },
        {
            title: "Kiss",
            description: "Bibir siapa itu woi, wkwkwk."
        },
        {
            title: "FSFSKJFHSKJFS",
            description: "Ini juga pertaama kalinya aku diucapin goodnight dengan foto orang manis, lucu, cakep :)."
        },
        {
            title: "Kamu nangis?",
            description: "Senyumnya manis, cuman kok kayak habis nangis :<."
        },
        {
            title: "TUAN PUTRIIII",
            description: "CANTIKKKKK BANGETTTTTT, susah buat di definisikannn. PERFECT SEKALI."
        },
        {
            title: "Cakep, silau",
            description: "Hai, nona kacamataku yang menawan, apakah kamu milikku?."
        },
        {
            title: "Sanntaaaaaaa",
            description: "Sosok anomali cantik yang akan memberimu hadiah ketika natal datang."
        },
        {
            title: "Peacee!",
            description: "Senyum dari samping juga sungguh manis, kamu begitu sempurna."
        },
        {
            title: "Nona",
            description: "Itu tatapan kayak menagih sesuatu dari diriku, wkwkwkwk."
        },
        {
            title: "JSHFKFHKAJKAF",
            description: "kamu pasti bidadari yang turun untuk hidupku."
        },
        {
            title: "Black glasses",
            description: "kamu pakai kacamata hitam, kondisi pipi kayak mochi. Aduh...manis banget deh pokoknya, perfect combos."
        },
        {
            title: "Black glasses",
            description: "kamu pakai kacamata hitam, kondisi pipi kayak mochi. Aduh...manis banget deh pokoknya, perfect combos."
        },
        {
            title: "Matching hoodie?",
            description: "ini pertama kalinya kita matching pakaiaan, kamu kelihatan cocok menggunakan hoodie dengan warna yang kupilih. Senyum dan pipimu apalagi, hehe."
        },
        {
            title: "Matching hoodie?",
            description: "ini pertama kalinya kita matching pakaiaan, kamu kelihatan cocok menggunakan hoodie dengan warna yang kupilih. Senyum dan pipimu apalagi, hehe."
        },
        {
            title: "Rambutnya bagus",
            description: "Rambutmu jika diikat ke belakang malah cakep banget, baeee. Asli, aku sampai bengong waktu itu."
        },
        {
            title: "Matching hoodie?",
            description: "Tatapannya tajam banget gilaa, cantiknya kerasa banget."
        },
        {
            title: "Fav.",
            description: "Foto ini jadi favoritku lagi sih karena isinya perfect, mulai dari cahaya, kamunya, posenya."
        },
        {
            title: "Senyum roblox",
            description: "Seeperti biasa. Cantik."
        },
        {
            title: "Wow.......",
            description: "Kalau kita udah halal yaa :)."
        },
        {
            title: "Sumaiireeee",
            description: "Lower ur smilee plsss, aku bisa diabetes sih asli."
        },
        {
            title: "Ini sih....",
            description: "Cantik, banget. 1 juta persen."
        },
        {
            title: "INI SIH CANTIK BANGETTTT",
            description: "Aku bahkan gak nyangka kalau ini tuh aura. Awalnya kecantikanmu itu setara dengan infinity, tapi ketika foto ini drop, eh jadi infinity paradox, hehe."
        },
        {
            title: "Memberi jempol terhadap pesan",
            description: "Aku suka yang baru baru ini karena kesan cantiknya netral."
        },
        {
            title: "Ini sih...",
            description: "Fav kayak yang satu tema sebelumnya yaa, all perfect."
        },
        {
            title: "Babyyy",
            description: "kayak bayi baru lahir, polos banget mukanyaaa. Tapi imut."
        },
        {
            title: "Wow",
            description: "Aku suka foto ini karena kamu memakai bracelet yang sama denganku, ditambah kamu juga pasti udah tau kalau aku akan bilang kamu cantik all round."
        },
        {
            title: "Matching hoodie?",
            description: "Aku lupa ini sehabis pulang sekolah atau mau berangkat sekolah."
        },
        {
            title: "Gunung Bromo",
            description: "Pemandangan Gunung Bromo di pagi hari dengan lautan kabut yang mengelilinginya. Foto diambil dari puncak Penanjakan."
        },
        {
            title: "Hwuudwaufau",
            description: "Ini lucu, aku suka."
        },
        {
            title: "wow",
            description: "Ini juga salah satu favku. Posemu sungguh pas, cakep deh pookonya."
        },
    ];


    // Create slides
    for (let i = 0; i < totalImages; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide animate-zoomIn';
        slide.innerHTML = `<img src="coding/coding/images${i + 1}.jpg" alt="Image ${i + 1}">`;
        slide.dataset.index = i;

        slide.addEventListener('click', function () {
            openPopup(i);
        });

        carouselTrack.appendChild(slide);
    }

    // Create indicators
    for (let i = 0; i < Math.ceil(totalImages / visibleSlides); i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');

        indicator.addEventListener('click', function () {
            goToSlide(i * visibleSlides);
        });

        indicators.appendChild(indicator);
    }

    // Functions
    function updateCarousel() {
        const slideWidth = carouselTrack.children[0].offsetWidth + 20; // width + margin
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        // Update indicators
        const indicatorIndex = Math.floor(currentSlide / visibleSlides);
        document.querySelectorAll('.indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === indicatorIndex);
        });
    }

    function nextSlide() {
        if (currentSlide < totalImages - visibleSlides) {
            currentSlide++;
        } else {
            // Loop back to first slide with animation
            currentSlide = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            // Go to last possible position
            currentSlide = totalImages - visibleSlides;
        }
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide > totalImages - visibleSlides) {
            currentSlide = totalImages - visibleSlides;
        }
        updateCarousel();
    }

    function openPopup(index) {
        popupTitle.textContent = descriptions[index].title;
        popupImage.src = `coding/coding/images${index + 1}.jpg`;
        popupDescription.textContent = descriptions[index].description;
        popupOverlay.classList.add('active');

        // Stop auto play when popup is open
        stopAutoPlay();
    }

    function closePopupFunc() {
        popupOverlay.classList.remove('active');

        // Resume auto play when popup is closed
        startAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', function () {
        prevSlide();
        stopAutoPlay();
        startAutoPlay(); // Reset the timer when manually navigating
    });

    nextBtn.addEventListener('click', function () {
        nextSlide();
        stopAutoPlay();
        startAutoPlay(); // Reset the timer when manually navigating
    });

    closePopup.addEventListener('click', closePopupFunc);

    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) {
            closePopupFunc();
        }
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, false);

    carouselTrack.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, false);

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (popupOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closePopupFunc();
            }
        }
    });

    // Start auto play
    startAutoPlay();

    // Add resize listener to adjust carousel when window size changes
    window.addEventListener('resize', updateCarousel);

    // Initial update
    updateCarousel();
});

// end of carousel

//timeline
document.addEventListener('DOMContentLoaded', function () {
    const milestones = document.querySelectorAll('.milestone');

    // Initial check for visible milestones
    checkMilestones();

    // Check milestones on scroll
    window.addEventListener('scroll', checkMilestones);

    function checkMilestones() {
        const triggerBottom = window.innerHeight * 0.8;

        milestones.forEach(milestone => {
            const milestoneTop = milestone.getBoundingClientRect().top;

            if (milestoneTop < triggerBottom) {
                milestone.classList.add('visible');
            }
        });
    }

    // Add animation to timeline dots
    const dots = document.querySelectorAll('.timeline-dot');

    dots.forEach(dot => {
        // Initial glow animation
        animateDot(dot);

        // Set interval for continuous animation
        setInterval(() => {
            animateDot(dot);
        }, 3000);
    });

    function animateDot(dot) {
        dot.animate([
            { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' },
            { boxShadow: '0 0 40px rgba(255, 255, 255, 1)' },
            { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }
        ], {
            duration: 2000,
            iterations: 1
        });
    }
});
//end of timeline

//sticky notes
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const addNoteBtn = document.getElementById('addNote');
    const noteModal = document.getElementById('noteModal');
    const noteText = document.getElementById('noteText');
    const saveNoteBtn = document.getElementById('saveNote');
    const cancelNoteBtn = document.getElementById('cancelNote');
    const colorPicker = document.getElementById('colorPicker');
    const notesContainer = document.getElementById('notesContainer');
    
    let selectedColor = 'color-1';
    let editingNoteEl = null;
    let isEditing = false;
    
    // Initialize existing notes to be interactive
    initializeNotes();
    
    // Add event listeners
    addNoteBtn.addEventListener('click', openModal);
    saveNoteBtn.addEventListener('click', saveNote);
    cancelNoteBtn.addEventListener('click', closeModal);
    
    // Local storage key
    const STORAGE_KEY = 'stickyNotes';
    
    // Load notes from local storage if available
    loadNotesFromStorage();
    
    colorPicker.addEventListener('click', function(e) {
      if (e.target.dataset.color) {
        document.querySelectorAll('.color-picker div').forEach(el => {
          el.classList.remove('selected');
        });
        e.target.classList.add('selected');
        selectedColor = e.target.dataset.color;
      }
    });
    
    // Initialize existing notes with random rotation on page load
    function initializeNotes() {
      document.querySelectorAll('.sticky-note:not(.add-note)').forEach(note => {
        // Add click listener for editing
        note.addEventListener('click', function() {
          editNote(note);
        });
        
        // Add random rotation on load
        const rotation = Math.random() * 6 - 3;
        note.style.setProperty('--rot', `${rotation}deg`);
        
        // Set animation
        note.style.animation = `appear 0.5s ease forwards`;
        note.style.animationDelay = `${Math.random() * 0.5}s`;
      });
    }
    
    function openModal() {
      noteModal.style.display = 'flex';
      noteText.focus();
    }
    
    function closeModal() {
      noteModal.style.display = 'none';
      noteText.value = '';
      isEditing = false;
      editingNoteEl = null;
      
      // Reset color picker
      document.querySelectorAll('.color-picker div').forEach(el => {
        el.classList.remove('selected');
      });
      document.querySelector(`.color-picker div.color-1`).classList.add('selected');
      selectedColor = 'color-1';
    }
    
    function editNote(noteEl) {
      isEditing = true;
      editingNoteEl = noteEl;
      
      // Get text content and color
      const noteContent = noteEl.querySelector('p').textContent;
      const noteColor = Array.from(noteEl.classList).find(cls => cls.startsWith('color-'));
      
      // Set values in modal
      noteText.value = noteContent;
      
      // Set color in picker
      document.querySelectorAll('.color-picker div').forEach(el => {
        el.classList.remove('selected');
      });
      document.querySelector(`.color-picker div.${noteColor}`).classList.add('selected');
      selectedColor = noteColor;
      
      // Open modal
      openModal();
    }
    
    function saveNote() {
      const text = noteText.value.trim();
      if (!text) {
        alert('Pesan tidak boleh kosong!');
        return;
      }
      
      if (isEditing && editingNoteEl) {
        // Update existing note
        editingNoteEl.querySelector('p').textContent = text;
        
        // Update color
        editingNoteEl.className = 'sticky-note ' + selectedColor;
        const rotation = Math.random() * 6 - 3;
        editingNoteEl.style.setProperty('--rot', `${rotation}deg`);
      } else {
        // Create a new note
        const randomRotation = Math.random() * 6 - 3;
        const newNote = document.createElement('div');
        newNote.className = `sticky-note ${selectedColor}`;
        newNote.style.setProperty('--rot', `${randomRotation}deg`);
        newNote.style.animation = 'appear 0.5s ease forwards';
        
        newNote.innerHTML = `
          <p>${text}</p>
          <span class="heart" style="--tx: -20px; --rot: -15deg">❤️</span>
          <span class="heart" style="--tx: 10px; --rot: 10deg">❤️</span>
          <span class="heart" style="--tx: 20px; --rot: 20deg">❤️</span>
        `;
        
        // Add click listener for editing
        newNote.addEventListener('click', function() {
          editNote(newNote);
        });
        
        // Insert before the add note button
        notesContainer.insertBefore(newNote, addNoteBtn);
      }
      
      // Save to localStorage
      saveNotesToStorage();
      
      closeModal();
    }
    
    // Easter egg: Double-click to show flying hearts animation
    document.addEventListener('dblclick', function(e) {
      const target = e.target.closest('.sticky-note');
      if (target && !target.classList.contains('add-note')) {
        // Create flying hearts
        for (let i = 0; i < 10; i++) {
          const heart = document.createElement('div');
          heart.textContent = '❤️';
          heart.style.position = 'absolute';
          heart.style.left = `${Math.random() * 100}%`;
          heart.style.top = `100%`;
          heart.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
          heart.style.opacity = '0';
          heart.style.zIndex = '5';
          heart.style.animation = `float-hearts 1.5s ease-in-out`;
          heart.style.animationDelay = `${Math.random() * 0.5}s`;
          heart.style.setProperty('--tx', `${(Math.random() * 100) - 50}px`);
          heart.style.setProperty('--rot', `${(Math.random() * 90) - 45}deg`);
          
          target.appendChild(heart);
          
          // Remove after animation
          setTimeout(() => {
            heart.remove();
          }, 2000);
        }
      }
    });
    
    // Save all notes to localStorage
    function saveNotesToStorage() {
      const notes = [];
      document.querySelectorAll('.sticky-note:not(.add-note)').forEach(note => {
        const text = note.querySelector('p').textContent;
        const color = Array.from(note.classList).find(cls => cls.startsWith('color-'));
        
        notes.push({
          text: text,
          color: color
        });
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
    
    // Load notes from localStorage
    function loadNotesFromStorage() {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      
      if (savedNotes) {
        try {
          const notes = JSON.parse(savedNotes);
          
          // Remove default notes if saved notes exist
          document.querySelectorAll('.sticky-note:not(.add-note)').forEach(note => {
            note.remove();
          });
          
          // Add saved notes
          notes.forEach(note => {
            const randomRotation = Math.random() * 6 - 3;
            const newNote = document.createElement('div');
            newNote.className = `sticky-note ${note.color}`;
            newNote.style.setProperty('--rot', `${randomRotation}deg`);
            
            newNote.innerHTML = `
              <p>${note.text}</p>
              <span class="heart" style="--tx: -20px; --rot: -15deg">❤️</span>
              <span class="heart" style="--tx: 10px; --rot: 10deg">❤️</span>
              <span class="heart" style="--tx: 20px; --rot: 20deg">❤️</span>
            `;
            
            // Add click listener for editing
            newNote.addEventListener('click', function() {
              editNote(newNote);
            });
            
            // Insert before the add note button
            notesContainer.insertBefore(newNote, addNoteBtn);
          });
          
          // Re-initialize all notes for animation
          initializeNotes();
        } catch (error) {
          console.error('Error loading notes from localStorage:', error);
        }
      }
    }
  });

  //Closing
  // Button ripple effect
document.getElementById('showNightButton').addEventListener('mousedown', function(e) {
    const button = this;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        button.removeChild(ripple);
    }, 600);
});

// Subtle movement on mouse move for glass card
document.querySelector('.glass-card').addEventListener('mousemove', function(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;
    
    card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    
    // Reset when mouse leaves
    card.onmouseleave = function() {
        card.style.transform = 'translateY(0)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    };
});

// Show night popup with smooth transition
document.getElementById('showNightButton').addEventListener('click', function() {
    const popup = document.getElementById('nightPopup');
    popup.classList.add('active');
    
    // Create stars with delay
    setTimeout(() => {
        createStars();
        createShootingStars();
    }, 100);
    
    // Add fade-in effect to the body
    document.body.style.transition = 'background-color 0.8s ease';
    document.body.style.backgroundColor = 'rgba(10, 14, 41, 1)';
});

// Close night popup
document.getElementById('closeButton').addEventListener('click', function() {
    const popup = document.getElementById('nightPopup');
    
    // Fade out message and moon first
    const glassMessage = document.querySelector('.glass-message');
    const moonContainer = document.querySelector('.moon-container');
    
    glassMessage.style.opacity = '0';
    glassMessage.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        moonContainer.style.transform = 'translateY(100vh)';
        
        setTimeout(() => {
            popup.classList.remove('active');
            removeStars();
            removeShootingStars();
            
            // Reset body background
            document.body.style.backgroundColor = '';
            
            // Reset styles after animation completes
            setTimeout(() => {
                glassMessage.style.removeProperty('opacity');
                glassMessage.style.removeProperty('transform');
                moonContainer.style.removeProperty('transform');
            }, 800);
        }, 500);
    }, 300);
});

// Create stars with enhanced effects
function createStars() {
    const container = document.getElementById('starsContainer');
    const starsCount = 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size (weighted towards smaller stars)
        const size = Math.random() * Math.random() * 3 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Star brightness based on size
        const brightness = 0.5 + (size / 3) * 0.5;
        star.style.opacity = brightness;
        
        // Different twinkle animations
        const animationType = Math.floor(Math.random() * 3);
        if (animationType === 0) {
            star.classList.add('twinkle-slow');
        } else if (animationType === 1) {
            star.classList.add('twinkle-medium');
        } else {
            star.classList.add('twinkle-fast');
        }
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 4}s`;
        
        container.appendChild(star);
    }
}

// Create shooting stars
function createShootingStars() {
    const container = document.getElementById('starsContainer');
    const shootingStarsInterval = setInterval(() => {
        if (!document.getElementById('nightPopup').classList.contains('active')) {
            clearInterval(shootingStarsInterval);
            return;
        }
        
        // 20% chance of creating a shooting star every interval
        if (Math.random() > 0.8) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            // Random position (mostly top-right quadrant)
            const x = 50 + Math.random() * 50;
            const y = Math.random() * 50;
            shootingStar.style.left = `${x}%`;
            shootingStar.style.top = `${y}%`;
            
            // Random duration and delay
            const duration = 0.5 + Math.random() * 1;
            shootingStar.style.animation = `shootingStar ${duration}s linear forwards`;
            
            container.appendChild(shootingStar);
            
            // Remove after animation completes
            setTimeout(() => {
                if (shootingStar.parentNode === container) {
                    container.removeChild(shootingStar);
                }
            }, duration * 1000);
        }
    }, 800);
    
    // Store the interval ID as a data attribute
    container.dataset.shootingStarsInterval = shootingStarsInterval;
}

// Remove stars
function removeStars() {
    const container = document.getElementById('starsContainer');
    const stars = container.querySelectorAll('.star');
    
    stars.forEach(star => {
        container.removeChild(star);
    });
}

// Remove shooting stars and clear interval
function removeShootingStars() {
    const container = document.getElementById('starsContainer');
    const shootingStars = container.querySelectorAll('.shooting-star');
    
    shootingStars.forEach(star => {
        container.removeChild(star);
    });
    
    // Clear the interval
    if (container.dataset.shootingStarsInterval) {
        clearInterval(parseInt(container.dataset.shootingStarsInterval));
    }
}

// Add button ripple style
const style = document.createElement('style');
style.textContent = `
.ripple {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    width: 5px;
    height: 5px;
    animation: ripple-effect 0.6s linear;
    transform: translate(-50%, -50%);
}

@keyframes ripple-effect {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Create animated background particles (subtle glass effect)
function createParticles() {
    const background = document.querySelector('.background');
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    background.appendChild(particlesContainer);
    
    const particlesCount = 20;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('glass-particle');
        
        // Random size
        const size = Math.random() * 80 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.15;
        
        // Random animation duration
        const duration = Math.random() * 30 + 20;
        particle.style.animationDuration = `${duration}s`;
        
        
        particle.style.animationDelay = `-${Math.random() * duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
.particles-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.glass-particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    backdrop-filter: blur(1px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    animation: float linear infinite;
    z-index: -1;
}

@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
    }
}
`;
document.head.appendChild(particleStyle);
window.addEventListener('load', createParticles);