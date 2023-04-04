import { refs } from "./refs";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');

export default function createGalleryMarkup(images) {
    const galleryMarkup = images.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
       return `<a class="photo" href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div></a>`
    }).join('');
   
   refs.listGallery.insertAdjacentHTML('beforeend', galleryMarkup);
   gallery.refresh();
  }