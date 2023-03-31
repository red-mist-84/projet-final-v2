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

/*************************admin***************************/
  
const updateInfo = (id, pseudo, email) => {
  const btnUpdate = document.querySelector('.btn-update'+id);
  const editPseudoInput = document.querySelector(".edit-pseudo-input"+id);
  const btnSave = document.querySelectorAll('.btn-save-update'+id);
  const editEmailInput = document.querySelector(".edit-email-input"+id);
  
  editPseudoInput.style.display = "inline";
  document.querySelector('.list-pseudo'+id).style.display = 'none';
  
  editEmailInput.style.display = "inline";
  document.querySelector('.list-email'+id).style.display = 'none';

  // Masquer le bouton Modifier et afficher le bouton Sauvegarder
  btnUpdate.style.display = "none";
}

  
/*const listComment = document.querySelector('.list-comment'+id)*/
// const editCommentInput = document.querySelector(".edit-comment-input"+id);
// editCommentInput.style.display = "inline";
// editCommentInput.value = comment;
// document.querySelector('.list-comment'+id).style.display = 'none';