export const onRequestPost = async (context) => {
  const body = await context.request.json();

  async function getToken() {
    const r = await fetch("https://login.microsoftonline.com/d05e1986-9d0f-4d67-8b0d-990eb3ae4ecd/oauth2/v2.0/token", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        client_id: "6b49e989-8a1f-4e3d-aad0-75a6408dbfd1",
        client_secret: "Cqg8Q~ECHr~FpbdHhXGvH_xGSQM7W0Xi~gPt1duY",
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials"
      })
    });
    return (await r.json()).access_token;
  }

  const token = await getToken();

  const r = await fetch(
    "https://graph.microsoft.com/v1.0/sites/tsc1907.sharepoint.com:/sites/Bosseln:/lists/Teams/items?expand=fields",
    { headers: {Authorization: "Bearer " + token} }
  );

  const data = await r.json();

  const team = data.value.find(t =>
    t.fields.Title === body.name &&
    t.fields.Passwort === body.password
  );

  return Response.json({
    success: !!team,
    teamId: team?.id
  });
}
