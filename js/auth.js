function goLogin() {
  location.href = "login.html";
}

function goRegister() {
  location.href = "register.html";
}

function goDashboard() {
  const role = localStorage.getItem("role");
  if (!role) {
    alert("Please login first");
    return;
  }
  location.href = role === "developer" ? "developer.html" : "buyer.html";
}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}


