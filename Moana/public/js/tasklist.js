// ================================================================================
//                           TASKLIST
// ================================================================================

const e = require("cors");

const form_list = document.getElementById("form_list");
const btn_add = addEventListener("submit");

if (form_list) {
    form_login.addEventListener("btn_add", async (e) => {
e.preventDefault();

const titre = document.getElementById("task_name");
const description = document.getElementById("task_def");

const data = {
    titre: titre.value,
    description: description.value
};

try {
    const res = await fetch("http://localhost:3000/")
}

    });
}










    list: document.querySelector("#list"), // propriété liste de tâche

    render(value) {
        const li = document.createElement("li");
        li.textContent = value;
        this.list.appendChild(li);
    }
};