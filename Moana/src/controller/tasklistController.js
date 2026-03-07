const controller = {
    init() {
        const button = document.querySelector("#addItem");

        button.addEventListener("click", () => {
            const value = model.value;

            if (value === "") return;

            view.render(value);

            model.input.value = ""; // reset du champ
        });
    }
};

controller.init();