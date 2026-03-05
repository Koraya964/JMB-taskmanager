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
        headers: { "Content-Type": "application/json" },
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
        globalThis.location.href = "tasklist.html";
      }
    } catch (error) {
      console.error({ message: error.message });
    }
  });
}
