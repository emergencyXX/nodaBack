const auth = async (form, type) => {
    const email = form.Email.value;
    const password = form.Password.value;
    const xmlhttp = new XMLHttpRequest();


    if (type === "register") {
        xmlhttp.open("post", "/auth/register", true);
    } else {
        xmlhttp.open("post", "/auth/login", true);
    }

    try {
        xmlhttp.setRequestHeader('Content-Type', 'application/json')
        await xmlhttp.send(JSON.stringify({email, password}));
        xmlhttp.onload = function () {
            if (xmlhttp.readyState === xmlhttp.DONE) {
                if (xmlhttp.status === 200) {
                    window.location.replace('/main');

                } else if (xmlhttp.status === 400) {
                    displayErr(xmlhttp.response);
                }
            }
        }
    } catch
        (err) {
        console.log(err);
        throw err
    }
}

const displayErr = response => {
    const badLogin = document.getElementById("BadLogin");
    const err = JSON.parse(response).message;
    badLogin.children[0].innerText = err;
    badLogin.style.display = "block";
    setTimeout(function () {
        badLogin.style.display = 'none';
    }, 3000);
}


window.addEventListener("load", async () => {
    const loginForm = document.getElementById("LoginForm");
    const registerBtn = document.getElementById("register");
    const logoutButton = document.getElementById("logoutButton");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            auth(loginForm, 'register');
        });
    }
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            document.cookie = "access_token=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            window.location.replace('/');
        });
    }
    if (loginForm) {
        loginForm.addEventListener("submit", function () {
            auth(loginForm, 'login');
        });
    }

});

