const cartItems =
JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer =
document.getElementById("cartItems");

let total = 0;

if(cartItems.length === 0){

    cartContainer.innerHTML = `
        <div class="empty-cart">

            <h2>Your Cart Is Empty</h2>

            <p>
                Looks like you haven't added any cases yet.
            </p>

            <a href="index.html" class="shop-link">
                Continue Shopping
            </a>

        </div>
    `;

}else{

    cartItems.forEach((item,index)=>{

        total += item.price * item.quantity;

        const card =
        document.createElement("div");

        card.classList.add("cart-item");

        card.innerHTML = `

    <div class="cart-product">

        <img
            src="${item.image}"
            alt="${item.model}"
        >

        <div class="cart-info">

            <h3>${item.name}</h3>

            <p>Premium Anti-Yellow Case</p>

            <p>
                ₹${item.price} × ${item.quantity}
            </p>

            <div class="quantity-controls">

                <button
                    class="qty-btn minus-btn"
                    data-index="${index}">
                    -
                </button>

                <span>${item.quantity}</span>

                <button
                    class="qty-btn plus-btn"
                    data-index="${index}">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                data-index="${index}">
                Remove
            </button>

        </div>

    </div>

`;

        cartContainer.appendChild(card);

    });

}

document.getElementById("totalPrice")
.textContent = total;

document.addEventListener("click",(e)=>{

    if(
        e.target.classList.contains("remove-btn")
    ){

        const index =
        e.target.dataset.index;

        cartItems.splice(index,1);

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

        location.reload();
    }

});

document
.querySelectorAll(".plus-btn")
.forEach(button => {

    button.addEventListener("click",()=>{

        const index =
        button.dataset.index;

        cartItems[index].quantity += 1;

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

        location.reload();

    });

});

document
.querySelectorAll(".minus-btn")
.forEach(button => {

    button.addEventListener("click",()=>{

        const index =
        button.dataset.index;

        if(cartItems[index].quantity > 1){

            cartItems[index].quantity -= 1;

        }else{

            cartItems.splice(index,1);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

        location.reload();

    });

});

document
.getElementById("clearCartBtn")
.addEventListener("click",()=>{

    localStorage.removeItem("cart");

    location.reload();

});

document
.getElementById("checkoutBtn")
.addEventListener("click",()=>{

    window.location.href =
    "checkout.html";

});
document.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
});
document.addEventListener("keydown",(e)=>{

    if(
        (e.ctrlKey && e.key === "c") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "a") ||
        (e.ctrlKey && e.key === "x")
    ){
        e.preventDefault();
    }

});