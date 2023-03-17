const sidebar = document.querySelector(".visible");
const btn = document.querySelector(".hamburger")
const search = document.getElementById("search");
const btn2 = document.getElementById("iconSearch");
const btn3 = document.getElementById("login");
const login = document.getElementById("connection");

/***************sidebar-navbar**************************/

btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

btn2.addEventListener("click", function() {
  if (search.style.display === "none") {
    search.style.display = "block";
  } else {
    search.style.display = "none";
  }
});

btn3.addEventListener("click", () => {
  login.classList.toggle("loginactive");
  console.log(login);
});

/*********************formulaire*************************/
/*******************************connection***************/
/*****************************************cookies********/

/*const formConnection = document.getElementById("connection");
formConnection.addEventListener("submit", async(e)=> {
  e.preventDefault()
  const formulaire = e.currentTarget;
  const dataForm = new FormData(formulaire);
  const newUser = {
    email: dataForm.get("email"),
    password: dataForm.get("password")
  }
  
  await fetch("/login", {
    method:"POST", 
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(newUser)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
})
/*********************************inscription**************/

/*const formInscription = document.getElementById("inscription");
formInscription.addEventListener("submit", async(e)=> {
  e.preventDefault()
  console.log(e);
  const formulaire = e.currentTarget;
  const dataForm = new FormData(formulaire);
  const isUser = {
    email: dataForm.get("email"),
    password: dataForm.get("password"),
    pseudo: dataForm.get("pseudo"),
    confirm: dataForm.get("confirm")
  }
  console.log(isUser)
  await fetch("/inscription", {
    method:"POST", 
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(isUser)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
})*/

/*********************************************************************/

const inputs = document.getElementById("pseudo", "emailInscription");
const progressBar = document.getElementById("progress-bar");
let pseudo, emailInscription, passwordInscription, confirm;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
    console.log(container.classList)
  } else {
    container.classList.remove("error");
    span.textContent = message;
    console.log(container.classList)
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    emailInscription = null;
  } else {
    errorDisplay("email", "", true);
    emailInscription = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";

  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    passwordInscription = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("passwordInscription", "", true);
    passwordInscription = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("passwordInscription", "", true);
    passwordInscription = value;
  }
  if (confirm) confirmChecker(confirm);
};

const confirmChecker = (value) => {
  if (value !== passwordInscription) {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirm = false;
  } else {
    errorDisplay("confirm", "", true);
    confirm = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

login.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && emailInscription && passwordInscription && confirm) {
    const data = {
      pseudo,
      emailInscription,
      passwordInscription,
      confirm
    };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    pseudo = null;
    emailInscription = null;
    passwordInscription = null;
    confirm = null;
    alert("Inscription validée !");
  } else {
    alert("veuillez remplir correctement les champs");
  }
});