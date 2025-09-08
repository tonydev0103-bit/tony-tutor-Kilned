const products_on_page = document.getElementById('product-grid');
const nextUrl = document.getElementById('paginateNext');
let next_url = nextUrl.dataset.nextUrl;

const load_more_btn = document.getElementsByClassName('load-more_btn')[0];
const load_more_spinner = document.getElementsByClassName('load-more_spinner')[0];
async function getNextPage() {
  try {
    let res = await fetch(next_url);
    return await res.text();
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreProducts() {
  load_more_btn.style.display = 'none';
  load_more_spinner.style.display = 'block';
  let nextPage = await getNextPage();

  const parser = new DOMParser();
  const nextPageDoc = parser.parseFromString(nextPage, 'text/html');

  load_more_spinner.style.display = 'none';

  const productgrid = nextPageDoc.getElementById('product-grid');
  const new_products = productgrid.getElementsByClassName('grid__item');

  const current_products = document.getElementsByClassName('grid__item');
  const total_products = document.querySelector('.load-more_btn');
  const total_products_length = total_products.dataset.collectionProductsCount;
  // add current_products.length to current-item_count
  document.querySelector('.current-item_count').innerHTML = "1 - " + current_products.length;
  const newUrl = document.getElementById('paginateNext');
  const new_url = newUrl.dataset.nextUrl; 
  if (new_url) {
    load_more_btn.style.display = 'flex';
  } 
  if (current_products.length >= total_products_length) {
    load_more_btn.style.display = 'none';
  }
  next_url = new_url;
  for (let i = 0; i < new_products.length; i++) {
    products_on_page.appendChild(new_products[i]);
  }
}