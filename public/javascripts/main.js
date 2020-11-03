var todoAct = async (form, type) => {
    const text = form.text.value;
    const xmlhttpCrTodo = new XMLHttpRequest();

    if (type === "update") {
        xmlhttpCrTodo.open("put", "/main", true);
    } else {
        xmlhttpCrTodo.open("post", "/main", true);
    }

    try {
        xmlhttpCrTodo.setRequestHeader('Content-Type', 'application/json')
        await xmlhttpCrTodo.send(JSON.stringify({text}));
        xmlhttpCrTodo.onload = function () {
            if (xmlhttpCrTodo.readyState === xmlhttpCrTodo.DONE) {
                if (xmlhttpCrTodo.status === 200) {
                    let response = JSON.parse(xmlhttpCrTodo.response)
                    debugger;
                } else if (xmlhttpCrTodo.status === 400) {

                }
            }
        }
    } catch
        (err) {
        console.log(err);
        throw err
    }
};

window.addEventListener("load", async () => {
    const createTodo = document.getElementById("createTodo");
    if (createTodo) {
        createTodo.addEventListener("submit", function () {
            todoAct(createTodo, 'create');
        });
    }
});
