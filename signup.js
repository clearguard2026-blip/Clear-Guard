const SUPABASE_URL = "https://vghwfdapxvilpghfcber.supabase.co";
const SUPABASE_KEY = "sb_publishable_urQuFNHD5k8TZbIWJrVQsQ__Li-YYej";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document
.getElementById("signupForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value;

    const button =
    document.getElementById("signupBtn");

    button.disabled = true;
    button.classList.add("loading");

    const { error } =
    await db.auth.signUp({

        email,
        password

    });

    if(error){

        alert(error.message);

        button.disabled = false;
        button.classList.remove("loading");

        return;

    }

    alert(
        "Verification email sent!\n\nPlease check your inbox and verify your email before logging in."
    );

    window.location.href = "login.html";

});