const cartItems =
JSON.parse(localStorage.getItem("cart")) || [];

const orderItems =
document.getElementById("orderItems");

let total = 0;

cartItems.forEach(item => {

    total += item.price * (item.quantity || 1);

    const div =
    document.createElement("div");

    div.classList.add("order-item");

    div.innerHTML = `

    <div class="checkout-product">

        <img
            src="${item.image}"
            alt="${item.model}"
        >

        <div class="checkout-info">

            <h4>${item.name}</h4>

            <p>Premium Anti-Yellow Case</p>

            <p>
                ₹${item.price}
                ×
                ${item.quantity || 1}
            </p>

        </div>

    </div>

`;

    orderItems.appendChild(div);

});

document.getElementById("totalPrice")
.textContent = total;

/* Disable right click */

document.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
});

/* Disable some shortcuts */

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

/* Checkout Validation + Razorpay */

document
.getElementById("placeOrderBtn")
.addEventListener("click", () => {

    const fullName =
    document.getElementById("fullName").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const address =
    document.getElementById("address").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();

    if(
        !fullName ||
        !phone ||
        !email ||
        !address ||
        !city ||
        !state ||
        !pincode
    ){
        alert("Please fill all fields.");
        return;
    }

    if(!/^[0-9]{10}$/.test(phone)){
        alert("Enter a valid 10-digit phone number.");
        return;
    }

    if(!/^[0-9]{6}$/.test(pincode)){
        alert("Enter a valid 6-digit pincode.");
        return;
    }

    const options = {

        key: "rzp_test_T00wQfpIMDxdR2",

        amount: total * 100,

        currency: "INR",

        method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true
        },

        name: "ClearGuard",

        description: "Premium Mobile Cases",

        image: "images/logo.png",

        handler: function () {

            localStorage.removeItem("cart");

            const orderId =
            "CG" + Math.floor(Math.random() * 1000000);

            localStorage.setItem(
                "orderId",
                orderId
            );

            window.location.href =
            "success.html";
        },

        prefill: {
            name: fullName,
            contact: phone,
            email: email
        },

        theme: {
            color: "#0071e3"
        }

    };

    const rzp =
    new Razorpay(options);

    rzp.open();

});