const db = window.db;
let selectedRating = 5;

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", () => {

        selectedRating = Number(star.dataset.rating);

        stars.forEach(s => {

            if(Number(s.dataset.rating) <= selectedRating){
                s.classList.add("active");
            }else{
                s.classList.remove("active");
            }

        });

    });

});

// Default to 5 stars
stars.forEach(s => s.classList.add("active"));

const params = new URLSearchParams(window.location.search);
const brand = params.get("brand");
const model = params.get("model");
console.log("Brand from URL:", brand);
console.log("Model from URL:", model);

console.log("Phones array:", phones);
console.log("Phones length:", phones.length);

const currentPhone = phones.find(phone => {
    console.log(phone.brand, phone.model);
    return phone.brand === brand && phone.model === model;
});

console.log("Found:", currentPhone);

if (!currentPhone) {
    console.error("Phone not found", { brand, model });

    alert(`Phone not found: ${brand} ${model}`);

    throw new Error("Phone not found");
}

document.getElementById("productTitle").textContent = currentPhone.name;

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
.addEventListener("click", async () => {

    if(!(await requireLogin())){
        return;
    }

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
document
.getElementById("submitReview")
.addEventListener("click", async () => {

    const name =
    document.getElementById("reviewName").value.trim();

    const review =
    document.getElementById("reviewText").value.trim();

    if(!name || !review){

        alert("Please fill all fields.");

        return;

    }

    const { error } = await db
.from("reviews")
.insert([{
    brand: currentPhone.brand,
    model: currentPhone.model,
    product_name: currentPhone.name,
    name: name,
    rating: selectedRating,
    review: review
}]);

    if (error) {
    console.log("FULL ERROR");
    console.log(error);
    console.log(error.code);
    console.log(error.message);
    console.log(error.details);
    console.log(error.hint);
    console.log(JSON.stringify(error, null, 2));

    alert(error.message);

    return;
}

    alert("Review submitted!");

    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";

    selectedRating = 5;

    stars.forEach(s => s.classList.add("active"));

    loadReviews();

});
async function loadReviews() {

    const { data, error } = await db
        .from("reviews")
        .select("*")
        .eq("brand", currentPhone.brand)
        .eq("model", currentPhone.model)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const reviewsList = document.getElementById("reviewsContainer");

reviewsList.innerHTML = "";

if (!data || data.length === 0) {

    reviewsList.innerHTML = `
    <div class="no-reviews">
        <i class="fa-regular fa-comment-dots"></i>
        <h3>No reviews yet</h3>
        <p>Be the first to review this product.</p>
    </div>
    `;

    document.getElementById("averageRating").textContent = "0.0";
    document.getElementById("reviewCount").textContent = "0";

    return;
}

    let total = 0;

    data.forEach(review => total += review.rating);

    const average = (total / data.length).toFixed(1);

    document.getElementById("averageRating").textContent = average;
    document.getElementById("reviewCount").textContent = data.length;

    data.forEach(review => {

        const card = document.createElement("div");

        card.className = "review-card";

        card.innerHTML = `
            <div class="review-header">
                <span class="review-name">${review.name}</span>
                <span class="review-date">
                    ${new Date(review.created_at).toLocaleDateString()}
                </span>
            </div>

            <div class="review-stars">
                ${"★".repeat(review.rating)}
                ${"☆".repeat(5 - review.rating)}
            </div>

            <p>${review.review}</p>
        `;

        reviewsList.appendChild(card);

    });

}

loadReviews();

document
.getElementById("buyNowBtn")
.addEventListener("click", async () => {

    if(!(await requireLogin())){
        return;
    }

    const product = {
        brand: currentPhone.brand,
        model: currentPhone.model,
        name: currentPhone.name,
        image: currentPhone.image,
        price: currentPhone.price,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item =>
        item.brand === product.brand &&
        item.model === product.model
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "cart.html";
});