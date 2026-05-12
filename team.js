const API = "/api";
const teamId = localStorage.getItem("teamId");

async function addThrow() {
  await fetch(API + "/throw", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ teamId })
  });

  alert("Wurf gespeichert");
}

function sendLocation() {
  navigator.geolocation.getCurrentPosition(async p => {
    await fetch(API + "/location", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        teamId,
        lat: p.coords.latitude,
        lng: p.coords.longitude
      })
    });
  });
}
