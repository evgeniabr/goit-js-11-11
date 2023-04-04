import axios from "axios";

export default class Apiservice {

    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }
 
  async  fetchImages() {
        console.log(this);
        const BASE_URL = 'https://pixabay.com/api/';
 const API_KEY = '34734183-f822af85241d99cf90dda111a';


//   const OPTIONS = {
//    headers : {
//     Autorization: API_KEY,
//    }
//   }
    
      
      this.incrementPage();  
      
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
            
          
      return response;   
             
      
    }
    

     incrementPage() {
         this.page += 1;
     }

    resetPage(){
 this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        return this.searchQuery = newQuery;
    }

   
}




 




// let currentPage = 1;
// const limit = 40;

// const searchParams = new URLSearchParams({
//    q: "searchQuery",
//   image_type: "photo",
//   orientation: "horizontal",
//   safesearch: true,
//   page: currentPage,
//   per_page: limit,

// })