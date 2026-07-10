const SUPABASE_URL = "https://vghwfdapxvilpghfcber.supabase.co";
const SUPABASE_KEY = "sb_publishable_urQuFNHD5k8TZbIWJrVQsQ__Li-YYej";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    const button =
    e.target.querySelector("button");

    button.disabled = true;
    button.textContent = "Logging In...";

    const { error } =
    await db.auth.signInWithPassword({

        email,
        password

    });

    if(error){

        alert(error.message);

        button.disabled = false;
        button.textContent = "Login";

        return;

    }

    const redirect =
    sessionStorage.getItem("redirectAfterLogin");

if(redirect){

    sessionStorage.removeItem("redirectAfterLogin");

    window.location.href = redirect;

}else{

    window.location.href = "index.html";

}

});