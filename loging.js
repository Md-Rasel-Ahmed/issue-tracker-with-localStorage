let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let file = document.getElementById("file").value;
  let userLogout = document.getElementById("userLogo");
  console.log(file.slice(12));
  userLogout.setAttribute("src", file);
});
