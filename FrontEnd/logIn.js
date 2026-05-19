function connexion () {
  const seConnecter = document.querySelector("#login form");

  seConnecter.addEventListener("submit", async function (event){
    event.preventDefault();

    const identifiant = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#password").value,
    };

    const chargeUtile = JSON.stringify(identifiant);

    const reponse = await fetch("http://localhost:5678/api/users/login",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: chargeUtile
      });

    const data = await reponse.json();
    if (reponse.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
    } else {
        const chercheErreurP = document.querySelector(".erreurP")
        if (chercheErreurP) {
            return;
        }
    const erreurP = document.createElement("p");
    const login = document.getElementById("login")
    const aLogin = document.querySelector("#login a")
    erreurP.classList.add("erreurP");
    erreurP.style.color = "red";
    login.insertBefore(erreurP, aLogin);
    erreurP.innerText = ("Les informations utilisateur / mot de passe ne sont pas correctes.  ")
    }
  }); 
}
connexion ()