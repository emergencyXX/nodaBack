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
                form.text.value = ''
                if (xmlhttpCrTodo.status === 201) {
                    let response = JSON.parse(xmlhttpCrTodo.response)
                    const table = document.getElementById("table");
                    const tr = document.createElement('tr');
                    table.append(tr);
                    tr.innerHTML =
                        `
                          <tr>
                            <td>${response.data.text}</td>
                            <td>
                                <p>
                                    <label>
                                        <input type="checkbox" onclick="turn('${response.data._id}')" id="${response.data._id}" ${response.data.isDone ? 'checked' :''}/>
                                        <span></span>
                                    </label>
                                </p>
                            </td>
                            <td class="delete" onclick="deleteTask('${response.data._id}')">delete</td>
                        </tr>
                    `;
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
const turn = async (id) => {
    const xmlhttpCrTodo = new XMLHttpRequest();
    xmlhttpCrTodo.open("post", "/main/do", true);
    xmlhttpCrTodo.setRequestHeader('Content-Type', 'application/json')
    await xmlhttpCrTodo.send(JSON.stringify({id}));
    xmlhttpCrTodo.onload = function () {
        if (xmlhttpCrTodo.readyState === xmlhttpCrTodo.DONE) {
            if (xmlhttpCrTodo.status === 201) {
                let response = JSON.parse(xmlhttpCrTodo.response)

            } else if (xmlhttpCrTodo.status === 400) {

            }
        }
    }
}

const deleteTask = async (id) => {
    const xmlhttpCrTodo = new XMLHttpRequest();
    xmlhttpCrTodo.open("delete", "/main", true);
    xmlhttpCrTodo.setRequestHeader('Content-Type', 'application/json')
    await xmlhttpCrTodo.send(JSON.stringify({id}));
    xmlhttpCrTodo.onload = function () {
        if (xmlhttpCrTodo.readyState === xmlhttpCrTodo.DONE) {
            if (xmlhttpCrTodo.status === 201) {
                let response = JSON.parse(xmlhttpCrTodo.response)
                document.getElementById(response.data.id).closest('tr').remove();
            } else if (xmlhttpCrTodo.status === 400) {

            }
        }
    }
}

const saveData = async(id) =>{
    const xmlhttpCrTodo = new XMLHttpRequest();
    const editText = document.getElementById("editText");
    xmlhttpCrTodo.open("put", "/main", true);
    xmlhttpCrTodo.setRequestHeader('Content-Type', 'application/json')
    await xmlhttpCrTodo.send(JSON.stringify({text:editText.firstElementChild.value, id}));
    xmlhttpCrTodo.onload = function () {
        if (xmlhttpCrTodo.readyState === xmlhttpCrTodo.DONE) {
            if (xmlhttpCrTodo.status === 201) {
                let response = JSON.parse(xmlhttpCrTodo.response)
                editText.innerHTML = `<p onclick="editMode(true,'${response.data._id}')">${response.data.text}</p>`;
            } else if (xmlhttpCrTodo.status === 400) {

            }
        }
    }
}

const editMode = (turn, id) =>{
    if (turn){
        const editText = document.getElementById("editText");
        const editValue = editText.firstChild.innerText;
        editText.innerHTML = `
            <input onblur="saveData('${id}')" type="text" value="${editValue}" autofocus class="editInp" />
        `;
    }
}


