// ================================================================================
//                           TASKLIST FRONTEND
// ================================================================================

const form_list = document.getElementById("form_list");

if (form_list) {
    form_login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const titre = document.getElementById("task_name").value;
        const description = document.getElementById("task_def").value;

        const data = {
            titre: titre,
            description: description
        };

        try {
            const res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorisation": "Bearer" + localStorage.getItem("token")
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log(result);

        }

 } catch (err) {
        console.error("Erreur :", err);
    }
};











list: document.querySelector("#list"), // propriété liste de tâche

    render(value) {
    const li = document.createElement("li");
    li.textContent = value;
    this.list.appendChild(li);
}
    };