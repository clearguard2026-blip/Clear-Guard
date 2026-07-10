const phoneDatabase = {

    samsung: [

{
    name:"Galaxy S21",
    model:"galaxy-s21",
    image:"images/products/s21.jpg",
    price:499
},

{
    name:"Galaxy S21+",
    model:"galaxy-s21-plus",
    image:"images/products/s21-plus.jpg",
    price:499
},

{
    name:"Galaxy S21 Ultra",
    model:"galaxy-s21-ultra",
    image:"images/products/s21-ultra.jpg",
    price:549
},

{
    name:"Galaxy S22",
    model:"galaxy-s22",
    image:"images/products/s22.jpg",
    price:499
},

{
    name:"Galaxy S22+",
    model:"galaxy-s22-plus",
    image:"images/products/s22-plus.jpg",
    price:549
},

{
    name:"Galaxy S22 Ultra",
    model:"galaxy-s22-ultra",
    image:"images/products/s22-ultra.jpg",
    price:599
},

{
    name:"Galaxy S23",
    model:"galaxy-s23",
    image:"images/products/s23.jpg",
    price:549
},

{
    name:"Galaxy S23+",
    model:"galaxy-s23-plus",
    image:"images/products/s23-plus.jpg",
    price:599
},

{
    name:"Galaxy S23 Ultra",
    model:"galaxy-s23-ultra",
    image:"images/products/s23-ultra.jpg",
    price:649
},

{
    name:"Galaxy S24",
    model:"galaxy-s24",
    image:"images/products/s24.jpg",
    price:599
},

{
    name:"Galaxy S24+",
    model:"galaxy-s24-plus",
    image:"images/products/s24-plus.jpg",
    price:649
},

{
    name:"Galaxy S24 Ultra",
    model:"galaxy-s24-ultra",
    image:"images/products/s24-ultra.jpg",
    price:699
}

],

    apple: [
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 13 Pro Max",
        "iPhone 14",
        "iPhone 14 Pro",
        "iPhone 14 Pro Max",
        "iPhone 15",
        "iPhone 15 Pro",
        "iPhone 15 Pro Max",
        "iPhone 16",
        "iPhone 16 Pro",
        "iPhone 16 Pro Max",
        "iPhone 17",
        "iPhone 17 Pro",
        "iPhone 17 Pro Max",
    ],

    oneplus: [
        "OnePlus 11",
        "OnePlus 12",
        "OnePlus 13",
        "OnePlus 13R"
    ],

    Pixel: [
        "Google Pixel 7",
        "Google Pixel 7 Pro",
        "Google Pixel 7a",
        "Google Pixel 8",
        "Google Pixel 8 Pro",
        "Google Pixel 8a",
        "Google Pixel 9",
        "Google Pixel 9 Pro",
        "Google Pixel 9 Pro XL",
        "Google Pixel 9a",
        "Google Pixel 10",
        "Google Pixel 10 Pro",
        "Google Pixel 10 Pro XL",
        "Google Pixel 10a",
    ]
};

const params =
new URLSearchParams(window.location.search);

const brand =
params.get("brand");

document.getElementById("brandTitle")
.textContent =
brand.charAt(0).toUpperCase() + brand.slice(1);

const modelsGrid =
document.getElementById("modelsGrid");

const filteredPhones =
phones.filter(phone =>
    phone.brand === brand
);

filteredPhones.forEach(phone => {

    const card =
    document.createElement("div");

    card.classList.add("model-card");

    card.innerHTML = `

        <img
            src="${phone.image}"
            alt="${phone.name}"
        >

        <h3>${phone.name}</h3>

        <p> ₹ ${phone.price}</p>

    `;

    card.onclick = () => {

        window.location.href =
        `product.html?brand=${phone.brand}&model=${phone.model}`;

    };

    modelsGrid.appendChild(card);

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