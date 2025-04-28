const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};

const loginForm = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

const forgotPasswordLink = document.getElementById('forgotPassword');
const createAccountLink = document.getElementById('createAccount');

const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const createAccountModal = document.getElementById('createAccountModal');
const closeForgotPassword = document.getElementById('closeForgotPassword');
const closeCreateAccount = document.getElementById('closeCreateAccount');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if (username === adminCredentials.username && password === adminCredentials.password) {
    messageEl.style.color = 'green';
    messageEl.textContent = 'Login successful! Welcome, admin.';
    // Redirect to home page after successful login
    window.location.href = 'home.html';
  } else {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Invalid username or password.';
  }
});

forgotPasswordLink.addEventListener('click', function(event) {
  event.preventDefault();
  forgotPasswordModal.classList.remove('hidden');
});

createAccountLink.addEventListener('click', function(event) {
  event.preventDefault();
  createAccountModal.classList.remove('hidden');
});

closeForgotPassword.addEventListener('click', function() {
  forgotPasswordModal.classList.add('hidden');
});

closeCreateAccount.addEventListener('click', function() {
  createAccountModal.classList.add('hidden');
});

const forgotPasswordForm = document.getElementById('forgotPasswordForm');
forgotPasswordForm.addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Password reset instructions sent to ' + forgotPasswordForm.forgotEmail.value);
  forgotPasswordModal.classList.add('hidden');
  forgotPasswordForm.reset();
});

const createAccountForm = document.getElementById('createAccountForm');
createAccountForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (createAccountForm.newPassword.value !== createAccountForm.confirmPassword.value) {
    alert('Passwords do not match.');
    return;
  }
  alert('Account created for ' + createAccountForm.newUsername.value);
  createAccountModal.classList.add('hidden');
  createAccountForm.reset();
});

// Cart functionality
const cartSection = document.getElementById('cartSection');
const cartList = document.getElementById('cartList');
const cartEmptyMessage = document.getElementById('cartEmptyMessage');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartItemCount = document.getElementById('cartItemCount');

const addToCartButtons = document.querySelectorAll('.addToCartBtn');

let cartItems = [];

function renderCart() {
  cartList.innerHTML = '';
  if (cartItems.length === 0) {
    cartEmptyMessage.style.display = 'block';
    cartSection.classList.add('hidden');
    cartItemCount.textContent = '0';
    return;
  }
  cartEmptyMessage.style.display = 'none';
  cartSection.classList.remove('hidden');
  cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center py-2';

    li.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <div class="flex items-center space-x-2 mt-1">
          <button class="text-gray-600 px-2 py-1 border rounded decreaseQty" data-index="${index}">-</button>
          <span>₱${item.price.toFixed(2)} x </span>
          <input type="number" min="1" value="${item.quantity}" class="w-16 border border-gray-300 rounded-md px-2 py-1 quantityInput" data-index="${index}" />
          <span>= ₱${(item.price * item.quantity).toFixed(2)}</span>
          <button class="text-red-600 hover:text-red-800 removeBtn" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
    cartList.appendChild(li);
  });

  // Add event listeners for remove buttons
  const removeButtons = document.querySelectorAll('.removeBtn');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      cartItems.splice(index, 1);
      renderCart();
    });
  });

  // Add event listeners for quantity inputs
  const quantityInputs = document.querySelectorAll('.quantityInput');
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const index = parseInt(this.getAttribute('data-index'));
      let newQty = parseInt(this.value);
      if (isNaN(newQty) || newQty < 1) {
        newQty = 1;
        this.value = 1;
      }
      cartItems[index].quantity = newQty;
      renderCart();
    });
  });

  // Add event listeners for decrease quantity buttons
  const decreaseButtons = document.querySelectorAll('.decreaseQty');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        renderCart();
      }
    });
  });
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const productCard = this.closest('.bg-white');
    const name = productCard.querySelector('h2').textContent;
    const priceText = productCard.querySelector('p').textContent;
    const price = parseFloat(priceText.replace('₱', ''));
    const quantityInput = productCard.querySelector('input[type="number"]');
    const quantity = parseInt(quantityInput.value);

    if (quantity < 1 || isNaN(quantity)) {
      alert('Please enter a valid quantity.');
      return;
    }

    // Check if item already in cart
    const existingItemIndex = cartItems.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ name, price, quantity });
    }

    renderCart();
  });
});

// Toggle cart visibility
cartToggleBtn.addEventListener('click', () => {
  if (cartSection.classList.contains('hidden')) {
    cartSection.classList.remove('hidden');
  } else {
    cartSection.classList.add('hidden');
  }
});
</create_file>
