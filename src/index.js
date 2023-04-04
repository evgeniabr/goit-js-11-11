import './css/styles.css';
 
import Apiservice from './api.service';
import smoothScroll from './smoothScroll';
import createGalleryMarkup from './markup';
import Notiflix from 'notiflix';

import {refs} from "./refs";



const apiservice = new Apiservice();

 refs.formImages.addEventListener('submit', onSubmitForm);
 refs.loadMoreBtn.addEventListener('click', onLoadMore);

 async function onSubmitForm(event) {
  event.preventDefault();
  clearListGallery();

  apiservice.query = event.currentTarget.elements.searchQuery.value;
  refs.loadMoreBtn.classList.remove('load-more');
  console.log(apiservice.query);


  apiservice.resetPage();
  try {
    const {data} = await apiservice.fetchImages();
    createGalleryMarkup(data);
      
      if (data.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      

       if (data.hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    else if (apiservice.page === Math.ceil(data.totalHits / 40)) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
         refs.loadMoreBtn.classList.add('load-more');
         smoothScroll();
    }
     ;     
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    const response = await apiservice.fetchImages();

    createGalleryMarkup(response.data);
       if (apiservice.page === Math.ceil(response.data.totalHits / 40)) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
         refs.loadMoreBtn.classList.add('load-more');
         smoothScroll();
    }
     
  } catch (error) {
    console.log(error);
}}
  
function clearListGallery() {
  refs.listGallery.innerHTML = ''
};



// Код без поділу на класи


// async function onSubmitForm(event) {
//   event.preventDefault();
//   const searchQuery = refs.formInput.value.trim();
//    console.log(searchQuery);
//   try {
//     const response = await axios.get(`${BASE_URL}/?key=34734183-f822af85241d99cf90dda111a&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${limit}`);

//     const valueQuery = response.data.hits;
//     const quantityImages = response.data.totalHits;

//     const totalPages = Math.ceil(quantityImages - limit * currentPage);

//  if (valueQuery.length === 0 || searchQuery === '') {
//       // console.log(valueQuery);

//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     } else if (event.type === 'submit') {
//       delateListGallery();

//       refs.loadMoreBtn.classList.remove('load-more');

//       currentPage += 1;

//       Notiflix.Notify.success(`Hooray! We found ${quantityImages} images.`);

//       createContent(valueQuery);
//       gallery.refresh();
//     } else if (totalPages <= 0) {
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );

//       refs.loadMoreBtn.classList.add('load-more');
//     } else {
//       createContent(valueQuery);
//       gallery.refresh();

//       currentPage += 1;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
    
//  function createContent(valueQuery) {
//   const generateContent = valueQuery.map(value => createListItem(value));
//   refs.listGallery.insertAdjacentHTML('beforeend', generateContent.join(''));
//  }

//  function createListItem(item) {
//   return `<div class="photo-card">
//     <a href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
//      <div class="info">
//        <p class="info-item">
//          <b>Likes: ${item.likes}</b>
//        </p>
//        <p class="info-item">
//          <b>Views: ${item.views}</b>
//       </p>
//       <p class="info-item">
//          <b>Comments: ${item.comments}</b>
//        </p>       <p class="info-item">
//         <b>Downloads: ${item.downloads}</b>
//       </p>
//       </div>
//       </div>`;
//  }
  
  //  function delateListGallery() {
  //  refs.listGallery.innerHTML = '';
  //  }


//   const gallery = new SimpleLightbox('.photo-card a', {
//   captionsData: 'alt',
//   showCounter: false,
//   maxZoom: 10,
//   disableScroll: true,
//   nav: true,
// });

// gallery.on('show.simplelightbox');



// //   const { height: cardHeight } = document
// //    .querySelector('.gallery')
// //    .firstElementChild.getBoundingClientRect();

// //   window.scrollBy({
// //   top: cardHeight * 2,
// //  behavior: 'smooth',
// //  });

 



