script
// Sample image data
const images = [
    {
        id: 1,
        src: 'https://media.cntraveler.com/photos/571945e380cf3e034f974b7d/master/pass/waterfalls-Seljalandsfoss-GettyImages-457381095.jpg',
        category: 'nature',
        caption: 'Crystal Clear Lake'
    },
    {
        id: 2,
        src: 'https://media.istockphoto.com/id/1352073906/photo/amsterdam-downtown-amstel-river-old-houses-and-a-bridge-nice-view-of-the-famous-city-of.jpg?s=612x612&w=0&k=20&c=0-l6Lf8A_QM0Nd-YPLrp5qUn8S1uc0TFKETH8TU9JcU=',
        category: 'city',
        caption: 'Houses at Amsterdam'
    },
    {
        id: 3,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHM10LbVPF79sBeW2d-luMhLnALoJbGYPkwg&s',
        category: 'animals',
        caption: 'Polar Bear in Arctic'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1741920852881-5284c70305bd?',
        category: 'nature',
        caption: 'Tokyo Night'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb',
        category: 'city',
        caption: 'Singapore Marina Bay'
    },
    {
        id: 6,
        src: 'https://i.ytimg.com/vi/shluYa5WDUQ/sddefault.jpg',
        category: 'animals',
        caption: 'Gorilla in Rainforest'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        category: 'nature',
        caption: 'Maldives Beach'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2',
        category: 'city',
        caption: 'Hong Kong Night'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',
        category: 'animals',
        caption: 'Cheetah in Action'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
        category: 'nature',
        caption: 'Grand Canyon'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
        category: 'city',
        caption: 'Venice Canals'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1474314170901-f351b68f544f',
        category: 'animals',
        caption: 'Orca Whale'
    },
	 {
        id: 13,
        src: 'https://i.pinimg.com/originals/fe/1f/40/fe1f402f03f4398be3a9f018c5ddc249.jpg',
        caption: 'Moonlight'
    }
];

// DOM Elements
const galleryContainer = document.getElementById('imageGallery');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const filterSelect = document.getElementById('filterSelect');
const brightnessSlider = document.getElementById('brightnessSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// State variables
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...images];

// Functions
function createGalleryItem(image) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${image.src}" alt="${image.caption}" loading="lazy">
        <div class="caption">${image.caption}</div>
    `;
    
    div.addEventListener('click', () => openModal(image));
    return div;
}

function renderGallery() {
    galleryContainer.innerHTML = '';
    filteredImages.forEach(image => {
        galleryContainer.appendChild(createGalleryItem(image));
    });
}

function openModal(image) {
    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    modal.style.display = 'block';
    currentImageIndex = filteredImages.findIndex(img => img.id === image.id);
}

function closeModalHandler() {
    modal.style.display = 'none';
}

function filterImages(category) {
    currentFilter = category;
    filteredImages = category === 'all' 
        ? [...images] 
        : images.filter(image => image.category === category);
    renderGallery();
}

function adjustBrightness(value) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.filter = brightness(${value}%);
    });
}

function navigateImages(direction) {
    if (filteredImages.length === 0) return;
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    const image = filteredImages[currentImageIndex];
    openModal(image);
}

// Event Listeners
filterSelect.addEventListener('change', (e) => filterImages(e.target.value));

brightnessSlider.addEventListener('input', (e) => adjustBrightness(e.target.value));

closeModal.addEventListener('click', closeModalHandler);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});

prevBtn.addEventListener('click', () => navigateImages('prev'));
nextBtn.addEventListener('click', () => navigateImages('next'));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') navigateImages('prev');
        if (e.key === 'ArrowRight') navigateImages('next');
        if (e.key === 'Escape') closeModalHandler();
    }
});

// Initial render
renderGallery();
