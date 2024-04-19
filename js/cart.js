//Termékek kosárhoz adása
const addToCartButtons = document.querySelectorAll('.btn.btn-primary');
let cart = [];

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        if (item.quantity > 0) { // Ellenőrizzük, hogy a termék mennyisége nagyobb-e nullánál
            const li = document.createElement('li');
            li.textContent = `${item.nev} - ${item.ar} ft - (${item.quantity} db)`;
            cartItemsElement.appendChild(li);

            // Hozzáadunk egy plusz gombot a mennyiség növeléséhez
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.addEventListener('click', () => increaseQuantity(item));
            
            // Hozzáadunk egy mínusz gombot a mennyiség csökkentéséhez
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.addEventListener('click', () => decreaseQuantity(item));
            
            li.appendChild(increaseButton);
            li.appendChild(decreaseButton);
        }
    });
    
}

//Darabszám növelése-csöpkentése
function increaseQuantity(item) {
    item.quantity = (item.quantity || 0) + 1;
    updateCartDisplay();
    updateTotalPriceDisplay();
}

function decreaseQuantity(item) {
    if (item.quantity > 0) {
        item.quantity -= 1;
        updateCartDisplay();
        updateTotalPriceDisplay();
    }
}

//Kosár toggle-elése
const cartContent = document.getElementById('cart-content');
const toggleCartButton = document.querySelector('.fi-shopping-cart');
function toggleCartVisibility() {
    cartContent.classList.toggle('cart-inactive');
}
toggleCartButton.addEventListener('click', toggleCartVisibility)
function calculateTotalPrice() {
    return cart.reduce((total, item) => total + (item.ar * item.quantity), 0); 
}


//Termék megjelenítése a kosárban
function addToCart(event) {
    const card = event.target.closest('.card');
    const itemName = card.querySelector('.card-title').textContent;
    const itemPrice = parseInt(card.querySelector('p:nth-child(3)').textContent.split(' ')[1]);
    const itemExists = cart.findIndex(item => item.nev === itemName); // Ellenőrizzük, hogy az elem már szerepel-e a kosárban

    if (itemExists !== -1) { 
        cart[itemExists].quantity += 1;
    } else { 
        const newItem = { nev: itemName, ar: itemPrice, quantity: 1 };
        cart.push(newItem);
    }

    updateCartDisplay();
    updateTotalPriceDisplay();
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

//Az összes termék árának kiíratása
function updateTotalPriceDisplay() {
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Összesen: ${calculateTotalPrice()} ft`;
}

