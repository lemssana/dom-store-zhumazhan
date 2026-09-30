import { Store } from './src/Store.js';

const store = new Store([
  { name: 'Wireless Mouse', price: 25.5, qty: 2 },
  { name: 'USB-C Cable', price: 9.99, qty: 3 }
]);

const form = document.getElementById('add-product-form');
const inputName = document.getElementById('prod-name');
const inputPrice = document.getElementById('prod-price');
const inputQty = document.getElementById('prod-qty');

const errName = document.getElementById('err-name');
const errPrice = document.getElementById('err-price');
const errQty = document.getElementById('err-qty');

const productList = document.getElementById('product-list');
const totalDisplay = document.getElementById('store-total');
const emptyState = document.getElementById('empty-state');

function render() {
  const items = store.getItems();
  productList.innerHTML = '';

  if (items.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';

    items.forEach((item) => {
      const tr = document.createElement('tr');
      const subtotal = (item.price * item.qty).toFixed(2);

      tr.innerHTML = `
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <div class="qty-controls">
            <button type="button" class="btn btn-sm btn-dec" data-action="dec" data-name="${escapeHtml(item.name)}">-</button>
            <span>${item.qty}</span>
            <button type="button" class="btn btn-sm btn-inc" data-action="inc" data-name="${escapeHtml(item.name)}">+</button>
          </div>
        </td>
        <td>$${subtotal}</td>
        <td>
          <button type="button" class="btn btn-sm btn-delete" data-action="delete" data-name="${escapeHtml(item.name)}">Delete</button>
        </td>
      `;
      productList.appendChild(tr);
    });
  }

  totalDisplay.textContent = store.total().toFixed(2);
}

function validateForm() {
  let isValid = true;

  errName.textContent = '';
  errPrice.textContent = '';
  errQty.textContent = '';

  const nameVal = inputName.value.trim();
  const priceVal = parseFloat(inputPrice.value);
  const qtyVal = parseInt(inputQty.value, 10);

  if (!nameVal) {
    errName.textContent = 'Product name cannot be empty.';
    isValid = false;
  }

  if (isNaN(priceVal) || priceVal <= 0) {
    errPrice.textContent = 'Price must be a positive number (> 0).';
    isValid = false;
  }

  if (isNaN(qtyVal) || qtyVal < 1 || !Number.isInteger(Number(inputQty.value))) {
    errQty.textContent = 'Quantity must be a positive integer (≥ 1).';
    isValid = false;
  }

  return isValid ? { name: nameVal, price: priceVal, qty: qtyVal } : null;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const validData = validateForm();

  if (validData) {
    store.add(validData);
    form.reset();
    render();
  }
});

productList.addEventListener('click', (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const name = target.dataset.name;

  if (!action || !name) return;

  if (action === 'inc') {
    store.updateQty(name, 1);
  } else if (action === 'dec') {
    store.updateQty(name, -1);
  } else if (action === 'delete') {
    store.remove(name);
  }

  render();
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

render();