const AUTH_SUPABASE_URL =
"https://vghwfdapxvilpghfcber.supabase.co";

const AUTH_SUPABASE_KEY =
"sb_publishable_urQuFNHD5k8TZbIWJrVQsQ__Li-YYej";

const authDb = window.supabase.createClient(
    AUTH_SUPABASE_URL,
    AUTH_SUPABASE_KEY
);

// Make it available everywhere
window.authDb = authDb;

async function getCurrentUser(){

    const {
        data:{ user }
    } = await authDb.auth.getUser();

    return user;

}

async function isLoggedIn(){

    return (await getCurrentUser()) !== null;

}

async function requireLogin(){

    const user = await getCurrentUser();

    if(!user){

        sessionStorage.setItem(
            "redirectAfterLogin",
            window.location.href
        );

        window.location.href = "login.html";

        return false;

    }

    return true;

}

async function logout(){

    const { error } = await authDb.auth.signOut();

    if(error){
        alert(error.message);
        return;
    }

    localStorage.removeItem("cart");

    const toast = document.getElementById("toast");

    if(toast){

        toast.textContent = "✔ Logged out successfully.";

        toast.classList.add("show");

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1800);

    }else{

        window.location.href = "index.html";

    }

}