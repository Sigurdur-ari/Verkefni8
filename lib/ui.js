import { formatPrice } from './helpers.js';

export function removeHandler(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
  updateCartTotal();
}


/**
 * Búa til línu í cart töflu.
 * @param  {import('../main.js').Product} product
 * @param {number} quantity 
 * @returns HTMLElement
 */
export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */
 
  //id
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.productId = product.id.toString();
  cartLineElement.classList.add('cart-line');

  //title
  const cartLineTitleElement = document.createElement('td');
  cartLineTitleElement.textContent = product.title;
  cartLineTitleElement.classList.add('title');

  //quantity
  const cartLineQuantityElement = document.createElement('td');
  cartLineQuantityElement.textContent = quantity.toString();
  cartLineQuantityElement.classList.add('quantity');

  //price
  const cartLinePriceElement = document.createElement('td');
  const cartLinePriceNumber = document.createElement('span');
  cartLinePriceNumber.textContent = formatPrice(product.price);
  cartLinePriceNumber.classList.add('price');
  cartLinePriceElement.appendChild(cartLinePriceNumber);

  //total
  const cartLineTotalElement = document.createElement('td');
  const cartLineTotalNumber = document.createElement('span');
  cartLineTotalNumber.textContent = formatPrice(quantity * product.price);
  cartLineTotalElement.appendChild(cartLineTotalNumber);
  cartLineTotalNumber.classList.add('total');
  cartLineTotalElement.classList.add('total');

  //delete button
  const cartLineDeleteElement = document.createElement('td');

  const cartLineDeleteForm = document.createElement('form');
  cartLineDeleteForm.addEventListener('submit', removeHandler);

  const cartLineDeleteButton = document.createElement('button');
  cartLineDeleteButton.textContent = "Eyða";

  cartLineDeleteForm.classList.add('remove')
  cartLineDeleteForm.method = 'post';

  cartLineDeleteForm.appendChild(cartLineDeleteButton);
  cartLineDeleteElement.appendChild(cartLineDeleteForm);


  //bæta við töflu
  cartLineElement.appendChild(cartLineTitleElement);
  cartLineElement.appendChild(cartLineQuantityElement);
  cartLineElement.appendChild(cartLinePriceElement);
  cartLineElement.appendChild(cartLineTotalElement);
  cartLineElement.appendChild(cartLineDeleteElement);

  return cartLineElement;
}




/** 
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');
  const cartForms = cartElement.querySelector('.cart-form-content');

  if (!emptyMessage || !cartContent || !cartForms) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
    cartForms.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
    cartForms.classList.add('hidden');
  }
}

export function calculateTotal(){
  let total = 0;
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  if (!cartTableBodyElement) {
    return;
  }
  const linesInCart = cartTableBodyElement.querySelectorAll('.cart-line');

  for(let k = 0; k < linesInCart.length; k++){
    const quantityInCart = (linesInCart[k].getElementsByClassName('quantity')[k].textContent);
    const priceOfProduct = (linesInCart[k].getElementsByClassName('.price')[k].textContent);
    if(!quantityInCart || !priceOfProduct){
      return;
    }
    const quantity = Number.parseInt(quantityInCart);
    const price = Number.parseInt(priceOfProduct);
    
    total += quantity * price;
  }
  return total;
}

export function updateCartTotal() {
  const totalElement = document.querySelector('.total-price');
  if(!totalElement){
    return;
  }
  const total = calculateTotal();
  totalElement.textContent = formatPrice(total);
}
