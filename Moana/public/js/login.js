// ================================================================================
//                           AUTH LOGIN
// ================================================================================

const form_login = document.getElementById("form_login");

if (form_login) {
    form_login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const data = {
            email: email.value,
            password: password.value
        };

        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            console.log(json);

            if (json.token) {
                localStorage.setItem("token", json.token);
                globalThis.location.href = "tasklist";
            }
        } catch (error) {
            console.error({ message: error.message });
        }
    });
}
