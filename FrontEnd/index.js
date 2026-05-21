/** Recuperation des données de l'api **/
/*Recuperation des données de "works"*/
async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

/*Recuperation des données de "categories"*/
async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

/* Creation du shemas html de la gallerie pour la page index */
function afficherGalerie(travaux) {
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

/** Affichage par default du site de la page index **/
/*Affichage de la gallerie par default */
async function affichageTravaux() {
  const travaux = await recupererTravaux();
  afficherGalerie(travaux);
}

/*Affichage des boutons filtres "categories" */
async function affichageCategories() {
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

  /* Ouverture de la boucle qui me permet de creer les differents bouton */
  categories.forEach(function (objet) {
    let html = `
            <button type="button" class="filtre-bouton" data-category-id="${objet.id}">
		        <span> ${objet.name}</span>
	        </button>
        `;
    div.innerHTML += html;
  });
}

/** Affichage dynamique de la page index selon l'utilisation **/
/* Filtre la gallerie au clique d'un des filtres */
async function filtreBouton() {
  const travaux = await recupererTravaux();
  const bouton = document.querySelectorAll(".filtre-bouton");

  bouton.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const idBouton = Number(bouton.dataset.categoryId);
      if (idBouton > 0) {
        const Filtre = travaux.filter(function (objet) {
          return objet.categoryId === idBouton;
        });
        document.querySelector(".gallery").innerHTML = "";
        afficherGalerie(Filtre);
      } else {
        document.querySelector(".gallery").innerHTML = "";
        afficherGalerie(travaux);
      }
    });
  });
}

/* Affichage du mode edition lorsque l'on est connecté */
function affichageModeEdition() {
  const classEdition = document.querySelectorAll(".edition");
  classEdition.forEach(function (html) {
    html.style.display = "flex";
  });
  const filtresEditionTitre = document.querySelector("#filtres-Edition h2");
  filtresEditionTitre.style.marginBottom = 0;
  const filtreEdition = document.querySelector("#filtres-Edition");
  filtreEdition.style.marginBottom = "128px";
  const loginAffichage = document.querySelector("#edition-login a");
  loginAffichage.innerText = "logout";
  loginAffichage.href = "#";
  loginAffichage.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}

/** Fonctionnement et affichage  du modale **/
/* Affichage et modfification du modale au clique */
function affihageModale() {
  const boutonModifier = document.querySelectorAll(".edition-bouton");
  const modale = document.querySelector(".modal");
  const croix = document.querySelector(".modal-croix");
  const boutonAjoutPhoto = document.querySelector(".changement-modal1");
  const boutonValider = document.querySelector(".changement-modal2");
  const modale1 = document.querySelector(".modal1");
  const modale2 = document.querySelector(".modal2");
  const flecheRetour = document.querySelector(".modal-retour");
/* Fonction qui affiche la modale "gallerie" et cache "Ajout photo"*/
  function afficherGalerie() {
    modale1.style.display = "block";
    modale2.style.display = "none";
    boutonAjoutPhoto.style.display = "block";
    boutonValider.style.display = "none";
}
/* Fonction qui affiche la modale "Ajout photo" et cache "gallerie"*/
function afficherAjoutPhoto() {
    modale1.style.display = "none";
    modale2.style.display = "block";
    boutonAjoutPhoto.style.display = "none";
    boutonValider.style.display = "block";
    boutonValider
}
  /* Affichage du moodal au clique de "modifier" */
  boutonModifier.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      modale.style.display = "flex";
      afficherGalerie();
      modale.setAttribute("aria-hidden", "false");
    });
  });
  /*Fermeture du modale au clique sur la croix ou a l'exterieur du modale */
  function fermerModale() {
    document.activeElement.blur();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
  }
  croix.addEventListener("click", fermerModale);
  modale.addEventListener("click", function (event) {
    if (event.target === modale) {
      fermerModale();
    }
  });
  /* Passage au modal2 au clique du bouton "Ajouter une photo" */
  boutonAjoutPhoto.addEventListener("click", afficherAjoutPhoto);
  /* Retour au modal 1 au clique de la feche */
  flecheRetour.addEventListener("click", afficherGalerie);
}

/* Creation du shemas html de la gallerie pour la page du modale */
function afficherGalerieModale(travaux) {
  let modalGallery = document.querySelector(".modal-gallery");
  travaux.forEach(function (objet) {
    let html = `
            <figure class="projet">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
            <button class="modal-poubelle">
        		<i class="fa-solid fa-trash-can"></i>
   				</button>	
	        </figure>
        `;
    modalGallery.innerHTML += html;
  });
}

/* Affichage de la gallerie dans le modale */
async function affichageTravauxModale() {
  const travaux = await recupererTravaux();
  afficherGalerieModale(travaux);
}

/*** Fonction qui appel toute les fonction du fichiers en async ***/
async function fonctionement() {
  await affichageTravaux();
  const token = localStorage.getItem("token");
  if (token) {
    affichageModeEdition();
    affihageModale();
    affichageTravauxModale();
  } else {
    await affichageCategories();
    await filtreBouton();
  }
}

fonctionement();
