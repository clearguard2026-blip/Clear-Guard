const orderId =
localStorage.getItem("orderId");

document.getElementById("orderId").textContent =
orderId;
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