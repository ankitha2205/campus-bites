const foodItems = [
    {
        id: 1,
        name: "Pizza",
        price: 100,
        category: "Fast Food",
        available: true,
        image: "./images/pizza.png"
    },

    {
        id: 2,
        name: "Burger",
        price: 70,
        category: "Fast Food",
        available: true,
        image: "./images/Burger.png"
    },

    {
        id: 3,
        name: "French Fries",
        price: 50,
        category: "Snacks",
        available: false,
        image: "./images/FrenchFries.png"
    },

    {
    id: 4,
    name: "Veg Meals",
    price: 80,
    category: "Meals",
    available: true,
    image: "./images/VegMeals.png"
},

    {
        id: 5,
        name: "Cold Coffee",
        price: 40,
        category: "Beverages",
        available: true,
        image: "./images/ColdCoffee.png"
    },

    {
        id: 6,
        name: "Sandwich",
        price: 60,
        category: "Snacks",
        available: true,
        image: "./images/Sandwitch.png"
    }
];


let cart = [];


const foodContainer =
    document.getElementById("food-container");

const searchInput =
    document.getElementById("search");

const categorySelect =
    document.getElementById("category");

const cartContainer =
    document.getElementById("cart-container");

const cartCount =
    document.getElementById("cart-count");

const totalElement =
    document.getElementById("total");


function displayFood() {

    const searchValue =
        searchInput.value.toLowerCase();

    const categoryValue =
        categorySelect.value;


    const filteredItems = foodItems.filter(item => {

        const matchesSearch =
            item.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            item.category === categoryValue;

        return matchesSearch && matchesCategory;

    });


    foodContainer.innerHTML = "";


    if (filteredItems.length === 0) {

        foodContainer.innerHTML = `
            <div class="no-results">
                <h3>No food found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    filteredItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "food-card";


        card.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="food-info">

                <span class="category">
                    ${item.category}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <strong>
                    ₹${item.price}
                </strong>

                <span class="${
                    item.available
                    ? "available"
                    : "unavailable"
                }">

                    ${
                        item.available
                        ? "Available ✓"
                        : "Out of Stock ✕"
                    }

                </span>

                <button
                    class="cart-btn"
                    onclick="addToCart(${item.id})"
                    ${!item.available ? "disabled" : ""}
                >

                    ${
                        item.available
                        ? "Add to Cart"
                        : "Unavailable"
                    }

                </button>

            </div>
        `;


        foodContainer.appendChild(card);

    });

}


function addToCart(id) {

    const item =
        foodItems.find(food => food.id === id);


    if (!item || !item.available) {
        return;
    }


    const existingItem =
        cart.find(food => food.id === id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...item,
            quantity: 1
        });

    }


    displayCart();

}


function increaseQuantity(id) {

    const item =
        cart.find(food => food.id === id);


    if (item) {
        item.quantity++;
    }


    displayCart();

}


function decreaseQuantity(id) {

    const item =
        cart.find(food => food.id === id);


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity === 0) {

        cart =
            cart.filter(food => food.id !== id);

    }


    displayCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(food => food.id !== id);


    displayCart();

}


function displayCart() {

    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add available items to your cart.</p>
            </div>
        `;

        totalElement.textContent = "0";

        cartCount.textContent = "0";

        return;

    }


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        count += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    totalElement.textContent = total;

    cartCount.textContent = count;

}


searchInput.addEventListener(
    "input",
    displayFood
);


categorySelect.addEventListener(
    "change",
    displayFood
);


document
    .getElementById("check-menu")
    .addEventListener("click", () => {

        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


document
    .getElementById("clear-cart")
    .addEventListener("click", () => {

        cart = [];

        displayCart();

    });


document
    .getElementById("contact-form")
    .addEventListener("submit", event => {

        event.preventDefault();

        alert("Your message has been submitted successfully!");

        event.target.reset();

    });


displayFood();

displayCart();