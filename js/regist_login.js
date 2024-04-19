// Az elemek kiválasztása
const loginButton = document.querySelector("#login-button");
const registButton = document.querySelector("#regist-button");

// Bejelentkezés funkció
function sendLoginRequest() {
    const loginInputs = document.querySelectorAll(".login-form input");

    for (let element of loginInputs) {
        if (element.value.length < 1) {
            alert("Minden mezőt szükséges kitölteni.");
            element.focus();
            return;
        }
    }

    const userName = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;

    fetch("./login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: userName, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Hiba a kérésben!");
        }
        return response.json();
    })
    .then(data => {
        if (data.errorCode !== 1) {
            location.href = "main.html";
        } else {
            alert("Sikertelen Bejelentkezés!")
            console.log(data.errorMessage)
        }
    })
    .catch(error => {
        console.log(error);
    });
}

// Regisztráció funkció
function sendregistRequest() {
    const registInputs = document.querySelectorAll(".regist-form input");

    for (let element of registInputs) {
        if (element.value.length < 1) {
            alert("Minden mezőt szükséges kitölteni.");
            element.focus();
            return;
        }
    }
    //todo: jelszó ellenőrzés mint fent (forhoz hasonló)
    const userName = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password1 = document.querySelector("#password1").value;
    const password2 = document.querySelector("#password2").value;
    if (password1 !== password2) {
        alert("A jelszavak nem egyeznek!");
        return;
    }

    fetch("./regist.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            userName: userName, 
            email: email,
            password: password1,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Hiba a kérésben!");
        }
        return response.json();
    })
    .then(data => {
        switch (data.errorCode) {
            case 0:
                alert("Sikeres regisztráció!")
                document.querySelector("#username").value = "";
                document.querySelector("#email").value = "";
                document.querySelector("#password1").value = "";
                document.querySelector("#password2").value = "";
                break;
            default:
                alert("Hiba a regisztráció során!"+data.errorMessage);
                break;
        }
    })
    .catch(error => {
        console.log(error)
    });
}

loginButton.addEventListener("click", sendLoginRequest);
registButton.addEventListener("click", sendregistRequest);
