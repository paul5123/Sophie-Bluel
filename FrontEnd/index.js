const token = localStorage.getItem("token");
/***----------------------------------------------------
 Recuperation des données via l'api 
-----------------------------------------------------***/

/**Recuperation des données de "works" et transformation en objet js**/
async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

/**Recuperation des données de "categories" et transformation en objet js**/
async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

/***----------------------------------------------------
Affichage de la page index
-----------------------------------------------------***/

/**Creation du shemas html de la gallerie pour la page index**/
function afficherGalerie(travaux) {
  let gallery = document.querySelector(".gallery");
  travaux.forEach(function (objet) {
    let html = `
            <figure class="projet" data-id="${objet.id}">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
		        <figcaption> ${objet.title} </figcaption>
	        </figure>
        `;
    gallery.innerHTML += html;
  });
}

/**Affichage de la gallerie par default **/
async function affichageTravaux() {
  const travaux = await recupererTravaux();
  afficherGalerie(travaux);
}

/**Fonction de l'affichage des boutons filtres "categories"**/
async function affichageCategories() {
  const categories = await recupererCategories();
  let portfolio = document.getElementById("portfolio");
  let gallery = document.querySelector(".gallery");
  let div = document.createElement("div");

  div.classList.add("divfiltre-bouton");
  portfolio.insertBefore(div, gallery);

  /*Ajout en dehors de la boucle, du bouton "Tous" avec le data-id=0*/
  let html = `
            <button type="button" class="filtre-bouton" data-category-id="0">
		        <span> Tous </span>
	        </button>
        `;
  div.innerHTML = html;

  /*Ouverture de la boucle qui me permet de creer les differents boutons et de leur attribuer un data id*/
  categories.forEach(function (objet) {
    let html = `
            <button type="button" class="filtre-bouton" data-category-id="${objet.id}">
		        <span> ${objet.name}</span>
	        </button>
        `;
    div.innerHTML += html;
  });
}

/**Filtre la gallerie au clique d'un des filtres**/
async function filtreBouton() {
  const travaux = await recupererTravaux();
  const bouton = document.querySelectorAll(".filtre-bouton");

  bouton.forEach(function (bouton) {
    /*Si il y a un clique sur un bouton filtre*/
    bouton.addEventListener("click", function () {
      /*On recupere  le data-id du bouton filtre et on le tansforme en number (string avant)*/
      const idBouton = Number(bouton.dataset.categoryId);
      /* Si le data-id du bouton est superieur a 0 alors =>*/
      if (idBouton > 0) {
        /*On creer un nouveaux tableaux "filtre" en filtrant avec .filter les images de gallerie qu n'ont pas la meme data-id que le bouton filtre*/
        const filtre = travaux.filter(function (objet) {
          return objet.categoryId === idBouton;
        });
        /*On vide l'affichage de "gallery" et on re-affiche avec le tableau filtrer*/
        document.querySelector(".gallery").innerHTML = "";
        afficherGalerie(filtre);
      } else {
        /*Si le data-id est "0" alors on affiche l'affichage par default "travaux"*/
        document.querySelector(".gallery").innerHTML = "";
        afficherGalerie(travaux);
      }
    });
  });
}

/***----------------------------------------------------
Mode edition
-----------------------------------------------------***/
const loginAffichage = document.querySelector("#edition-login a");

/**Affichage du mode edition lorsque l'on est connecté**/
function affichageModeEdition() {
  const classEdition = document.querySelectorAll(".edition");
  const filtresEditionTitre = document.querySelector("#filtres-Edition h2");
  const filtreEdition = document.querySelector("#filtres-Edition");

  classEdition.forEach(function (html) {
    html.style.display = "flex";
  });
  filtresEditionTitre.style.marginBottom = 0;
  filtreEdition.style.marginBottom = "128px";
  loginAffichage.innerText = "logout";
  loginAffichage.href = "#";
}

/**Desactivation du mode edition au clique du logout **/
function desAffichageModeEdition() {
  loginAffichage.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
}
/*********************************************************
Modale
*********************************************************/
const boutonModifier = document.querySelectorAll(".edition-bouton");
const modale = document.querySelector(".modal");
const croix = document.querySelector(".modal-croix");
const boutonAjoutPhoto = document.querySelector(".bouton-modal1");
const boutonValider = document.querySelector(".bouton-modal2");
const modale1 = document.querySelector(".modal1");
const modale2 = document.querySelector(".modal2");
const flecheRetour = document.querySelector(".modal-retour");

/**Fonction qui enleve le message d'erreur du formulaire "ajout photo"**/
function enleverMessageErreur() {
  const erreur = document.querySelector(".erreurP");
  if (erreur) {
    erreur.remove();
  }
}

/***----------------------------------------------------
 Ouverture et fermeture du modale
-----------------------------------------------------***/

/*Affichage du modal au clique de "modifier"*/
boutonModifier.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    modale.style.display = "flex";
    afficherModaleGalerie();
    modale.setAttribute("aria-hidden", "false");
  });
});

/**Fonction qui ferme le modale **/
function fermerModale() {
  if (document.activeElement) {
  document.activeElement.blur();
  }
  modale.style.display = "none";
  modale.setAttribute("aria-hidden", "true");
}

/**Appel de la fonction "fermerModale" au clique sur la croix ou en dehors du modale**/
function evenementFermetureModale() {
  croix.addEventListener("click", fermerModale);
  modale.addEventListener("click", function (event) {
    if (event.target === modale) {
      fermerModale();
      enleverMessageErreur();
    }
  });
}

/***----------------------------------------------------
 Changement de fenetre du modale
-----------------------------------------------------***/

/*Fonction qui affiche le modale "gallerie" et cache "Ajout photo"*/
function afficherModaleGalerie() {
  modale1.style.display = "block";
  modale2.style.display = "none";
  boutonAjoutPhoto.style.display = "block";
  boutonValider.style.display = "none";
  enleverMessageErreur();
}
/*Fonction qui affiche la modale "Ajout photo" et cache "gallerie"*/
function afficherAjoutPhoto() {
  modale1.style.display = "none";
  modale2.style.display = "block";
  boutonAjoutPhoto.style.display = "none";
  boutonValider.style.display = "block";
  boutonValider;
  enleverMessageErreur();
}

/*Passage au modal2 au clique du bouton "Ajouter une photo"*/
boutonAjoutPhoto.addEventListener("click", afficherAjoutPhoto);
/* Retour au modal 1 au clique de la fleche */
flecheRetour.addEventListener("click", afficherModaleGalerie);

/***----------------------------------------------------
 Gallerie du modale
-----------------------------------------------------***/

/*Affichage de la gallerie dans le modale*/
async function affichageTravauxModale() {
  const travaux = await recupererTravaux();
  afficherGalerieModale(travaux);
}

/*Creation du shemas html de la gallerie pour la page du modale*/
function afficherGalerieModale(travaux) {
  let modalGallery = document.querySelector(".modal-gallery");
  travaux.forEach(function (objet) {
    let html = `
            <figure class="projet projet-modal" data-id="${objet.id}">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
            <button class="modal-poubelle" data-id="${objet.id}">
        		<i class="fa-solid fa-trash-can" data-id="${objet.id}"></i>
   				</button>	
	        </figure>
        `;
    modalGallery.innerHTML += html;
  });
}

/***----------------------------------------------------
 Fonctionnalité du modale /Supression gallerie\
-----------------------------------------------------***/

/*Supression de l'image de la gallerie a partir du modale quand on clique sur la poubelle*/
async function supressionImageGallerie() {
  const poubelles = document.querySelectorAll(".modal-poubelle");
  poubelles.forEach(function (poubelle) {
    poubelle.addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (reponse.ok) {
        document
          .querySelectorAll(`.projet[data-id="${id}"]`)
          .forEach(function (element) {
            element.remove();
          });
      }
    });
  });
}

/***----------------------------------------------------
 Fonctionnalité du modale /Ajout gallerie\
-----------------------------------------------------***/
const imageInput = document.querySelector("#fichier");
/*Affichage de la preview  */

function afficherPreview() {
  imageInput.addEventListener("change", function () {
    const image = imageInput.files[0];
    if (!image) {
      alert("Veuillez choisir une image.");
      return;
    } else {
      const prePreview = document.querySelector(".pre-preview");
      const preview = document.querySelector(".preview");
      const bouton = document.querySelector(".bouton-modal2");
      prePreview.style.display = "none";
      preview.style.display = "flex";
      preview.src = URL.createObjectURL(image);
      bouton.style.backgroundColor = "#1D6154";
    }
  });
}

/*Integration de la liste des categories dans le modale "Ajout photo"*/
async function affichageCategorieModale() {
  const categories = await recupererCategories();
  const categorieDeroulant = document.getElementById("category");
  categories.forEach(function (objet) {
    const html = `<option value="${objet.id}">${objet.name}</option>`;
    categorieDeroulant.innerHTML += html;
  });
}

/*Fonction qui permet d'ajouter une image dans la gallerie a partir du modale*/
function ajoutProjetDansGallerie() {
  const titre = document.querySelector("#title");
  const categorie = document.querySelector("#category");

  boutonValider.addEventListener("click", async function () {
    const image = imageInput.files[0];
    if (!image || !titre.value || !categorie.value) {
    if (document.querySelector(".erreurP")) {
    return;
    } else { 
    const messageErreur = document.createElement("p");
    const selectionModal2 =document.querySelector(".modal2")
    messageErreur.classList.add("erreurP");
    messageErreur.innerText ="Le formulaire n’est pas correctement rempli.";
    selectionModal2.appendChild(messageErreur);
    }
    } else {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", titre.value);
      formData.append("category", categorie.value);

      enleverMessageErreur();
      const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (reponse.ok) {
        const prePreview = document.querySelector(".pre-preview");
        const preview = document.querySelector(".preview");
        document.querySelector(".gallery").innerHTML = "";
        document.querySelector(".modal-gallery").innerHTML = "";
        await affichageTravaux();
        await affichageTravauxModale();
        supressionImageGallerie();
        prePreview.style.display = "flex";
        preview.style.display = "none";
        categorie.value = "";
        imageInput.value = "";
        titre.value = "";
      } else {
        alert("Erreur lors de l'ajout du projet.");
      }
    }
  });
}

/***----------------------------------------------------
Fonction qui appel toute les fonction du fichiers en async
-----------------------------------------------------***/
async function fonctionement() {
  await affichageTravaux(); /*Affichage par default */
  if (token) {
    /*Si le token contient une valeur considérée comme vraie => on charge le mode administrateur*/
    affichageModeEdition();
    desAffichageModeEdition();
    evenementFermetureModale();
    await affichageTravauxModale();
    supressionImageGallerie();
    afficherPreview();
    await affichageCategorieModale();
    ajoutProjetDansGallerie();
  } else {
    /*=> Sinon on charge le mode utilisateur par default*/
    await affichageCategories();
    await filtreBouton();
  }
}

fonctionement();
