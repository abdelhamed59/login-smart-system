let userNameRes = document.querySelector(`#nameRes`);
let emailRes = document.querySelector(`#emailRes`);
let passwordRes = document.querySelector(`#passwordRes`);
let signBtn=document.querySelector(`#signBtn`);
let arr;
if (localStorage.getItem(`users`) == null) {
    arr = [];
} else {
    arr = JSON.parse(localStorage.getItem(`users`));
}
// signBtn.addEventListener(`click`,addUser)

function addUser() {
    if (validates() == true && checkMail() == false) {
        let user = {
            name: userNameRes.value,
            email: emailRes.value,
            password: passwordRes.value,
        };
        arr.push(user);
        localStorage.setItem(`users`, JSON.stringify(arr))
        document.querySelector(`#successMessage`).classList.replace(`d-none`, `d-block`)
        document.querySelector(`#errorMessage`).classList.replace(`d-block`, `d-none`)
        document.querySelector(`#linkLogin`).classList.remove(`d-none`)

    } else {
        document.querySelector(`#successMessage`).classList.replace(`d-block`, `d-none`)
        document.querySelector(`#errorMessage`).classList.replace(`d-none`, `d-block`)


    }
}
function validateName() {
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if (regex.test(userNameRes.value) == true && userNameRes.value != ``) {
        userNameRes.classList.add(`is-valid`)
        userNameRes.classList.remove(`is-invalid`)
        return true
    } else {
        userNameRes.classList.remove(`is-valid`)
        userNameRes.classList.add(`is-invalid`)
        return false
    }
}

function validatePassword() {
    let regex = /^.{7,}$/
    if (regex.test(passwordRes.value) == true && passwordRes.value != ``) {
        passwordRes.classList.add(`is-valid`)
        passwordRes.classList.remove(`is-invalid`)
        document.querySelector(`#passwordRonge`).classList.replace(`d-block`, `d-none`)
        return true
    } else {
        passwordRes.classList.remove(`is-valid`)
        passwordRes.classList.add(`is-invalid`)
        document.querySelector(`#passwordRonge`).classList.replace(`d-none`, `d-block`)

        return false
    }
}

function validateEmail() {
    let regex = /@[a-z]{5,10}(\.com)$/
    if (regex.test(emailRes.value) == true && emailRes.value != ``) {
        emailRes.classList.add(`is-valid`)
        emailRes.classList.remove(`is-invalid`)
        return true
    } else {
        emailRes.classList.remove(`is-valid`)
        emailRes.classList.add(`is-invalid`)

        return false
    }
}

function checkMail() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].email.toLowerCase() == emailRes.value.toLowerCase()) {
            emailRes.classList.remove(`is-valid`);
            document.querySelector(`#errorEmail`).classList.replace(`d-none`, `d-block`)

            return true

        }

    }
    document.querySelector(`#errorEmail`).classList.replace(`d-block`, `d-none`)
    return false

}

function validates() {
    if (validateName() == true && validateEmail() == true && validatePassword() == true) {
        return true
    } else {
        return false
    }
}

// //////////////////////////////////////////////////////////////////////////////////////
// login page

var userArr = [];
userArr = JSON.parse(localStorage.getItem(`users`));
let emailLogin = document.querySelector(`#emailInput`);
let passwordLogin = document.querySelector(`#passwordInput`);
let loginBtn = document.querySelector(`#loginBtn`);
// loginBtn.addEventListener("click",login)
    
function login() {
    if (emailLogin.value == `` || passwordLogin.value == `` ||confirmUser()==false) {
        document.querySelector(`#wrongLogin`).classList.replace(`d-none`, `d-block`);
    } else {
        document.querySelector(`#wrongLogin`).classList.replace(`d-block`, `d-none`);
        confirmUser();

    }
}

function confirmUser() {
    for (let i = 0; i < userArr.length; i++) {
        if (emailLogin.value == userArr[i].email && passwordLogin.value == userArr[i].password) {
            localStorage.setItem(`userName`, userArr[i].name);
            // location.href = `home.html`
            open(`home.html`)
            close()
            return true
        }
        
    }return false

}

document.getElementById("homeMessage").innerHTML=localStorage.getItem(`userName`)
document.querySelector(`#logOut`).addEventListener(`click`,function(){
    localStorage.removeItem(`userName`)
    // location.href=`index.html`
    window.open(`index.html`);
    window.close()
})
