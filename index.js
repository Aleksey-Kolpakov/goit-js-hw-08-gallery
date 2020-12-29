import galleryItems from './gallery-items.js';
// Greating Gallery
const createGallery = function (item, index) {
    const galleryItem = document.createElement('li');
    galleryItem.classList = 'gallery__item';
    const aLink = document.createElement('a');
    aLink.classList = 'gallery__link';
    aLink.href = item.original;
    const img = document.createElement('img');
    img.classList = "gallery__image";
    img.src = item.preview;
    img.alt = item.description;
    img.dataset.source = item.original;
    img.dataset.index = index;
    aLink.append(img);
    galleryItem.append(aLink);
    return galleryItem;
}
const openModal = function (event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
        modalRef.classList += ' is-open';
        imgModalRef.src = event.target.dataset.source;
        imgModalRef.alt = event.target.alt;
        imgModalRef.dataset.index = event.target.dataset.index;
    }
};
const closeModal = function () {
    modalRef.classList.remove('is-open');
    imgModalRef.src = '';
    imgModalRef.alt = '';
    
};
const modalImgSelector = function (index) {
    const nextImg = document.querySelector(`[data-index="${index}"]`);
    imgModalRef.src = nextImg.dataset.source;
    imgModalRef.alt = nextImg.alt;
    imgModalRef.dataset.index = nextImg.dataset.index;
};

const galleryArray=galleryItems.map(createGallery)

const galleryRef = document.querySelector('.js-gallery');
galleryRef.append(...galleryArray);
// Modal window

const modalRef = document.querySelector(".js-lightbox");
const imgModalRef = document.querySelector('.lightbox__image');
const modalButtonRef = document.querySelector('[data-action="close-lightbox"]');
const lightboxRef = document.querySelector('.lightbox__overlay');

galleryRef.addEventListener('click', openModal);

modalButtonRef.addEventListener('click',closeModal);
//закрытие по клику lightbox__overlay
lightboxRef.addEventListener('click', event=> {
    if (event.target === event.currentTarget && modalRef.classList.contains('is-open')) {
        closeModal();
   }
});
/// Закрытие с помощью Escape
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modalRef.classList.contains('is-open')) {
    closeModal();
    }
    ///перемотка изображений вправо и влево
    if (event.code === 'ArrowRight' && modalRef.classList.contains('is-open')) {
        const nextIndex = Number(imgModalRef.dataset.index) === galleryArray.length - 1 ? 0 : Number(imgModalRef.dataset.index) + 1;
        modalImgSelector(nextIndex);

    }
    if (event.code === 'ArrowLeft' && modalRef.classList.contains('is-open')) {
        const nextIndex = Number(imgModalRef.dataset.index) === 0 ? galleryArray.length - 1 : Number(imgModalRef.dataset.index) - 1;  
        modalImgSelector(nextIndex);
   }
    
});
