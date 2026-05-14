/*Recuperation des données de l'api des traveaux*/
async function recupererTraveaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

/* Creation de la fonction qui creer la galleries dans le html*/
function html(traveaux) {
    let gallery = document.querySelector(".gallery")
  traveaux.forEach(function (objet) {
    let html = `
            <figure class="projet">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
		        <figcaption> ${objet.title} </figcaption>
	        </figure>
        `;
    gallery.innerHTML += html;
  });
}

/*Fonction de  l'affichage de la gallerie par default */
async function implementerTraveaux() {
  const traveaux = await recupererTraveaux();
  /* Appel de la fonction qui me permet de creer les differentes gallery */
 html(traveaux,);
}

/* Appel de la fonction qui affiche les galleries*/
implementerTraveaux();

/*Fonction qui recupere les données de l'api des "categories"*/
async function recupererCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

/*Fonction de  de l'affichage des bouttons "categories" */
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
  div.innerHTML += html;
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
/* appel de la fonction qui affiche les filtres */
implementerCategories();

/* Fonction du filtre "Tous" */
async function fonctionBoutonFiltrerTous() {
const traveaux = await recupererTraveaux();
const boutonFiltrerObjets = document.querySelector('[data-category-id="0"]');

/* Creation de l'evenement "clique", quand l'utilisateur clique sur le bouton "Tous"  affiche toute la galleries*/
boutonFiltrerObjets.addEventListener("click", function () {
    console.log(traveaux)
    /* Supprime l'affichage dans "gallery"  et re-creer le html uniquement avec la liste dans objetFiltrees*/
    document.querySelector(".gallery").innerHTML = "";
    html(traveaux)
});
}
/* appel de la fonction qui filtres les objets */
fonctionBoutonFiltrerTous()



/* Fonction du filtre "Objets" */
async function fonctionBoutonFiltrerObjets() {
const traveaux = await recupererTraveaux();
const boutonFiltrerObjets = document.querySelector('[data-category-id="1"]');

/* Creation de l'evenement "clique", quand l'utilisateur clique sur le bouton "objets" filtres dans la galleries les objets*/
boutonFiltrerObjets.addEventListener("click", function () {
    const objetFiltrees = traveaux.filter(function (objet) {
        return objet.category.name === "Objets";
    });
    console.log(objetFiltrees)
    /* Supprime l'affichage dans "gallery"  et re-creer le html uniquement avec la liste dans objetFiltrees*/
    document.querySelector(".gallery").innerHTML = "";
    html(objetFiltrees)
});
}
/* appel de la fonction qui filtres les objets */
fonctionBoutonFiltrerObjets()



/* Fonction du filtre "Appartements" */
async function fonctionBoutonFiltrerAppartements() {
const traveaux = await recupererTraveaux();
const boutonFiltrerAppartements = document.querySelector('[data-category-id="2"]');

/* Creation de l'evenement "clique", quand l'utilisateur clique sur le bouton "objets" filtres dans la galleries les objets*/
boutonFiltrerAppartements.addEventListener("click", function () {
    const AppartementsFiltrees = traveaux.filter(function (objet) {
        return objet.category.name === "Appartements";
    });
    console.log(AppartementsFiltrees)
    /* Supprime l'affichage dans "gallery"  et re-creer le html uniquement avec la liste dans objetFiltrees*/
    document.querySelector(".gallery").innerHTML = "";
    html(AppartementsFiltrees)
});
}
/* appel de la fonction qui filtres les Hotels & restaurants */
fonctionBoutonFiltrerAppartements()

/* Fonction du filtre "Hotels & restaurants" */
async function fonctionBoutonFiltrerHotelsRestaurants() {
const traveaux = await recupererTraveaux();
const boutonFiltrerHotelsRestaurants = document.querySelector('[data-category-id="3"]');

/* Creation de l'evenement "clique", quand l'utilisateur clique sur le bouton "objets" filtres dans la galleries les objets*/
boutonFiltrerHotelsRestaurants.addEventListener("click", function () {
    const HotelsRestaurantsFiltrees = traveaux.filter(function (objet) {
        return objet.category.name === "Hotels & restaurants";
    });
    console.log(HotelsRestaurantsFiltrees)
    /* Supprime l'affichage dans "gallery"  et re-creer le html uniquement avec la liste dans objetFiltrees*/
    document.querySelector(".gallery").innerHTML = "";
    html(HotelsRestaurantsFiltrees)
});
}
/* appel de la fonction qui filtres les objets */
fonctionBoutonFiltrerHotelsRestaurants()



/* 
async function filtreBoutton() {
    const traveaux = await recupererTraveaux();
    const bouton = document.querySelectorAll(".filtre-bouton");

    bouton.forEach(function (bouton) {
        bouton.addEventListener("click", function() {

        const Filtrees = traveaux.filter(function (objet2) {
        return objet2.category.name === `${objet.category.name}`;
        })
        console.log(Filtrees)
        })
    
})
}


filtreBoutton()
*/