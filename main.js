import { formatPrice } from './lib/helpers.js';
import { createCartLine, showCartContent, updateCartTotal } from './lib/ui.js';

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */
const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];


/**
 * Bæta vöru í körfu
 * @param  {Product} product
 * @param {number} quantity 
 */
function addProductToCart(product, quantity) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu -- LAGFÆRA
  updateCartTotal();
 
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
    }

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input --KOMIÐ
  const inputElement = event.target.querySelector('.quantity-input');

  if (!inputElement) {
    return;
  }
  const quantity = inputElement.value;

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}


// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}



// TODO bæta við event handler á form sem submittar pöntun
function finishHandler(event) {
  event.preventDefault();
  //Sýna kvittun
  const receipt = document.querySelector('.receipt');
  if(!receipt){
    return;
  }
  receipt.classList.remove('hidden');
}

const finishOrderForm = document.getElementsByClassName('finish')[0];
finishOrderForm?.addEventListener('submit', finishHandler);
