/*** Fonction creer pour le reste du code***/
/*Fonction qui recupere les données de "works"*/
async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

/*Fonction qui recupere les données de "categories"*/
async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

/*Fonction qui creer la galleries dans le html*/
function html(travaux) {
  let gallery = document.querySelector(".gallery");
  travaux.forEach(function (objet) {
    let html = `
            <figure class="projet">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
		        <figcaption> ${objet.title} </figcaption>
	        </figure>
        `;
    gallery.innerHTML += html;
  });
}

/***Fonction de  l'affichage de la gallerie par default ***/
async function implementerTravaux() {
  const travaux = await recupererTravaux();
  html(travaux);
}
implementerTravaux();

/*Fonction de l'affichage des bouttons filtres "categories" */
async function implementerCategories() {
  const categories = await recupererCategories();
  let portfolio = document.getElementById("portfolio");
  let gallery = document.querySelector(".gallery");
  let div = document.createElement("div");
  div.classList.add("divfiltre-bouton");
  portfolio.insertBefore(div, gallery);
  /* Ajout en dehors de la boucle, du bouton "tous" */
  let html = `
            <button type="button" class="filtre-bouton" data-category-id="0">
		        <span> Tous </span>
	        </button>
        `;
  div.innerHTML = html;
  /* Ouverture de la boucle qui me permet de creer les differents boutton */
  categories.forEach(function (objet) {
    let html = `
            <button type="button" class="filtre-bouton" data-category-id="${objet.id}">
		        <span> ${objet.name}</span>
	        </button>
        `;
    div.innerHTML += html;
  });
}
implementerCategories();

async function filtreBoutton() {
  const travaux = await recupererTravaux();
  const bouton = document.querySelectorAll(".filtre-bouton");

  bouton.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const idBouton = Number(bouton.dataset.categoryId);
      if (idBouton > 0) {
        const Filtre = travaux.filter(function (objet) {
          return objet.categoryId === idBouton;
        });
        console.log(Filtre);
        document.querySelector(".gallery").innerHTML = "";
        html(Filtre);
      } else {
        console.log(travaux);
        document.querySelector(".gallery").innerHTML = "";
        html(travaux);
      }
    });
  });
}
filtreBoutton();


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
    const erreurP = document.createElement("p");
    erreurP.style.color = "red";
    const login = document.getElementById("login")
    const aLogin = document.querySelector("#login a")
    login.insertBefore(erreurP, aLogin);
    erreurP.innerText = ("Les informations utilisateur / mot de passe ne sont pas correctes.  ")

    }

      console.log(identifiant)
      console.log(data);


  }); 
}
connexion ()