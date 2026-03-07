// ================================================================================
//                           AUTH REGISTER
// ================================================================================

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
        } catch (error) {
            console.error({ message: error.message });
        }
    });
}
