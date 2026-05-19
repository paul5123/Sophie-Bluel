
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
async function affichageTravaux() {
  const travaux = await recupererTravaux();
  html(travaux);
}

/*Fonction de l'affichage des boutons filtres "categories" */
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
        html(Filtre);
      } else {
        document.querySelector(".gallery").innerHTML = "";
        html(travaux);
      }
    });
  });
}

function affichageModeEdition () {
const classEdition = document.querySelectorAll(".edition");
classEdition.forEach(function(html) {
  html.style.display = "flex";
});
const filtresEditionTitre = document.querySelector("#filtres-Edition h2");
filtresEditionTitre.style.marginBottom = 0;
const filtreEdition = document.querySelector("#filtres-Edition");
filtreEdition.style.marginBottom = "128px";
const loginAffichage = document.querySelector("#edition-login a");
loginAffichage.innerText = "logout";
loginAffichage.href = "#";
loginAffichage.addEventListener("click", function(){
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
}




async function fonctionement() {
  await affichageTravaux();
  const token = localStorage.getItem("token");
  console.log("token =", token);
  if (token) {
    affichageModeEdition();
  } else { 
  await affichageCategories();
  await filtreBouton();
  }
}

fonctionement();
