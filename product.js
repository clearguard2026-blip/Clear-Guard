const params = new URLSearchParams(window.location.search);

const brand = params.get("brand");
const model = params.get("model");
const currentPhone =
phones.find(phone =>

    phone.brand === brand &&
    phone.model === model

); 
document.getElementById("productTitle")
.textContent =
currentPhone.name; 

document.getElementById("mainImage")
.src =
currentPhone.image;

document.getElementById("productPrice")
.textContent =
currentPhone.price;

if(model){

    const formattedBrand =
        brand.charAt(0).toUpperCase() + brand.slice(1);

    const formattedModel =
        model
        .replaceAll("-", " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    document.getElementById("productTitle").textContent =
        `${formattedBrand} ${formattedModel}`;
}

document
.getElementById("addToCartBtn")
.addEventListener("click", () => {

    const product = {
    brand:currentPhone.brand,
    model:currentPhone.model,
    name:currentPhone.name,
    image:currentPhone.image,
    price:currentPhone.price,
    quantity:1
};

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
        const exists = cart.some(item =>
    item.brand === brand &&
    item.model === model
);

if(exists){
    return;
}   

    const existingProduct =
cart.find(item =>

    item.brand === product.brand &&
    item.model === product.model

);

if(existingProduct){

    existingProduct.quantity += 1;

}else{

    cart.push(product);

}

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    const cartCount =
document.getElementById("cartCount");

if(cartCount){
    cartCount.textContent = cart.length;
}

    const btn =
document.getElementById("addToCartBtn");

btn.textContent = "✓ Added To Cart";
btn.style.background = "#22c55e";

btn.disabled = true;

});
const cartItems =
JSON.parse(localStorage.getItem("cart")) || [];

const cartCount =
document.getElementById("cartCount");

if(cartCount){
    cartCount.textContent = cartItems.length;
}

const alreadyAdded = cartItems.some(item =>
    item.brand === brand &&
    item.model === model
);

if(alreadyAdded){

    const btn =
    document.getElementById("addToCartBtn");

    btn.textContent = "✓ Added To Cart";
    btn.style.background = "#22c55e";
    btn.disabled = true;
}
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

const relatedGrid = document.getElementById("relatedGrid");

if (relatedGrid) {

    const relatedProducts = phones
        .filter(p =>
            p.brand === currentPhone.brand &&
            p.model !== currentPhone.model
        )
        .slice(0, 4);

    relatedProducts.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("related-card");

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Premium Anti-Yellow Case</p>
            <span>₹${item.price}</span>
        `;

        card.addEventListener("click", () => {
            window.location.href =
                `product.html?brand=${item.brand}&model=${item.model}`;
        });

        relatedGrid.appendChild(card);

    });

}
