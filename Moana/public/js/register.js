// ================================================================================
//                           AUTH REGISTER
// ================================================================================

// REDIRECTION VERS "tasklist.html" SI TOKEN EXISTANT DONC UTILISATEUR CONNECTER
const token = localStorage.getItem("token");

if (token) {
    globalThis.location.href = "tasklist.html";
}

// CIBLE LE FORMULAIRE POUR RECUPERER LES DONNEES VIA ECOUTE DES EVENEMENTS
const form_register = document.getElementById("form_register");

if (form_register) {
    form_register.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        // DECLARATION DE LA REPONSE POUR RECUPERER LE TOKEN AU FORMAT JSON ET STOCKER DANS LE LOCAL STORAGE
        try {
            const res = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            console.log(json);

            if (json.token) {
                localStorage.setItem("token", json.token);
            }

            // 
        } catch (error) {
            console.error("Erreur de connexion lors de l'inscription :", error);
        }

    });
}
