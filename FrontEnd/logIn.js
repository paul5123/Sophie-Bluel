  /*Selectionne le formulaire en html de l'identifant*/
  const seConnecter = document.querySelector("#login form");

  /*Ouve l'evenement "si il y a  un clique sur le bouton se connecter"*/
  seConnecter.addEventListener("submit", async function (event){  
    event.preventDefault(); /* Annule le comportement par default du formulaire*/

    /*Creer un objet "identifant" avec la valeur email et password*/
    const identifiant = {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#password").value,
    };

    /*Transforme l'objet identifiant en json */
    const identifiantJson = JSON.stringify(identifiant);

    /* Fetch post qui envoie les données de l'identifiant dans l'api*/
    const reponse = await fetch("http://localhost:5678/api/users/login",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: identifiantJson
      });
    
    /*Si reponse.ok existe dans ma reponse servur, alors on stock le token*/
    if (reponse.ok) {
    /*On tansforme la reponse du serveur en objet js */
    const data = await reponse.json();
    /*Stock le token recuperer dans l'objet data dans le navigateur (localStorage)*/
    localStorage.setItem("token", data.token);
    event.target.querySelector("#email").value = "";
    event.target.querySelector("#password").value = "";
    window.location.href = "index.html"; 
    } else {
        /*On verifie qu'un message d'erreur n'existe pas, si c'est la cas on return*/
        const chercheErreurP = document.querySelector(".erreurP")
        if (chercheErreurP) {
            return;
        }
    /*Creation du message d'erreur */
    const erreurP = document.createElement("p");
    const login = document.getElementById("login")
    const aLogin = document.querySelector("#login a")
    erreurP.classList.add("erreurP");
    login.insertBefore(erreurP, aLogin);
    erreurP.innerText = ("Erreur dans l’identifiant ou le mot de passe")
    }
  }); 

