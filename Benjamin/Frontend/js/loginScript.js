const displayForm = document.getElementById("form");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const getRegisterForm = () => {
  loginForm.removeAttribute("style");
  loginForm.setAttribute("style", "display:none");
  registerForm.setAttribute("style", "display:block");
};

const getLoginForm = () => {
  registerForm.removeAttribute("style");
  registerForm.setAttribute("style", "display: none");
  loginForm.setAttribute("style", "display: block");
};

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: usernameRegisterInput.value,
        email: emailRegisterInput.value,
        password: passRegisterInput.value,
      };
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        console.log(user);
        alert(response.status);
      }

      const data = await response.json();

      if (data) {
        alert("Compte créer");
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const data = {
      email: emailInput.value,
      password: passInput.value,
    };
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return alert(response.status);
    }
    const result = await response.json();

    if (result.token) {
      localStorage.setItem("user_id", result.user_id);
      localStorage.setItem("username", result.username);
      localStorage.setItem("token", result.token);
      window.location.replace("/list");
      return result.token
    } else {
      return alert(result.message);
    }
  } catch (error) {
    alert(error);
  }
});
