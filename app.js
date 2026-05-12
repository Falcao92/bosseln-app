const API = "/api";

async function login() {
  const name = document.getElementById("name").value;
  const pass = document.getElementById("pass").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, password: pass })
  });

  const data = await res.json();

  if (!data.success) {
    alert("Login falsch");
    return;
  }

  localStorage.setItem("teamId", data.teamId);
  location = "team.html";
}