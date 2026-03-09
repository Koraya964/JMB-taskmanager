// ================================================================================
//                           TASKLIST FRONTEND
// ================================================================================

const form_list = document.getElementById("form_list");
const listContainer = document.getElementById("list");

if (form_list) {
    form_list.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("task_name").value;
        const description = document.getElementById("task_def").value;

        const data = {
            title,
            description,
        };
console.log(data);

        try {
            const res = await fetch("http://localhost:3000/tasks/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(data),
                credentials: "include"

            });

            const result = await res.json();
            console.log(result);

            // Si la tâche est créée, on l'affiche dans la liste
            if (result.titre) {
                taskUI.render(result.titre);
            }

        } catch (err) {
            console.error("Erreur :", err);
        }
    });
}

// ================================================================================
//                           RENDER LIST
// ================================================================================

// GESTION AFFICHAGE DES TACHES DANS LA LISTE
const taskUI = {
    list: listContainer,

    render(task) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        li.innerHTML = `
            <strong>${task.titre}</strong>
            <br>
            <small>${task.description || ""}</small>
        `;

        this.list.appendChild(li);
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
}

document.getElementById("btn_logout").addEventListener('click', logout);