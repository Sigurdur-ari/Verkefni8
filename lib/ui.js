import { formatPrice } from './helpers.js';

function removeHandler(event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
}

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
  cartLineElement.dataset.productId = product.id;

  //title
  const cartLineTitleElement = document.createElement('td');
  cartLineTitleElement.textContent = product.title;
  cartLineTitleElement.classList.add('title');

  //quantity
  const cartLineQuantityElement = document.createElement('td');
  cartLineQuantityElement.textContent = quantity;
  cartLineQuantityElement.classList.add('quantity');

  //price
  const cartLinePriceElement = document.createElement('td');
  const cartLinePriceNumber = document.createElement('span');
  cartLinePriceNumber.textContent = formatPrice(product.price);
  cartLinePriceNumber.classList.add('price');
  cartLinePriceElement.appendChild(cartLinePriceNumber);
  cartLinePriceElement.classList.add('price');

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

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}
