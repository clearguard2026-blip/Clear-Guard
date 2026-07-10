let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

setInterval(() => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 3000);

const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartCount =
document.getElementById("cartCount");

const totalItems =
cart.reduce((total,item)=>

    total + (item.quantity || 1)

,0);

if(cartCount){
    cartCount.textContent = totalItems;
}
const phones = [

{
    name:"Samsung Galaxy S24 Ultra",
    brand:"samsung",
    model:"galaxy-s24-ultra"
},
{
    name:"Samsung Galaxy S24 ",
    brand:"samsung",
    model:"galaxy-s24"
},

{
    name:"Samsung Galaxy S24+",
    brand:"samsung",
    model:"galaxy-s24-plus"
},

{
    name:"Samsung Galaxy S22+",
    brand:"samsung",
    model:"galaxy-s22-plus"
},

{
    name:"iPhone 16 Pro Max",
    brand:"apple",
    model:"iphone-16-pro-max"
},

{
    name:"iPhone 15 Pro",
    brand:"apple",
    model:"iphone-15-pro"
},

{
    name:"OnePlus 13",
    brand:"oneplus",
    model:"oneplus-13"
}

];

const searchInput =
document.getElementById("phoneSearch");

const suggestions =
document.getElementById("suggestions");

searchInput.addEventListener("input",()=>{

    const value =
    searchInput.value.toLowerCase();

    suggestions.innerHTML = "";

    if(value.length < 1) return;

    const matches =
    phones.filter(phone =>
        phone.name.toLowerCase().includes(value)
    );

    matches.forEach(phone => {

        const div =
        document.createElement("div");

        div.classList.add("suggestion-item");

        div.textContent = phone.name;

        div.addEventListener("click",()=>{

            window.location.href =
            `product.html?brand=${phone.brand}&model=${phone.model}`;

        });

        suggestions.appendChild(div);

    });

});
document.addEventListener("click",(e)=>{

    if(!searchInput.contains(e.target) &&
       !suggestions.contains(e.target)){

        suggestions.innerHTML = "";

    }

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