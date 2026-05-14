
/*Recuperation des données de l'api*/
async function recupererTraveaux() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json();
}

async function implementerTraveaux() {

    const traveaux = await recupererTraveaux();

    /* Variable gallery qui s'associe a la class "gallery" de l'html */
    let gallery = document.querySelector(".gallery")

    /* Ouverture de la boucle qui me permet de creer les differentes gallery */
    traveaux.forEach(function(objet) {
    /*Ajout des gallery dans le html */
        let html = `
            <figure class="projet">
		        <img src="${objet.imageUrl}" alt="${objet.title}">
		        <figcaption> ${objet.title} </figcaption>
	        </figure>
        `
        gallery.innerHTML += html
    })
}
/* appel de la fonction qui recupere et  affiche les galleries*/
implementerTraveaux();

async function recupererCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories");
    return await reponse.json();
}

async function implementerCategories() {

    const categories = await recupererCategories();
    let portfolio = document.getElementById("portfolio");
    let gallery = document.querySelector(".gallery");
    let div = document .createElement("div");
    div.classList.add("divfiltre-bouton");
   
    portfolio.insertBefore(div, gallery);


        let html = `
            <button type="button" class="filtre-bouton Tous">
		        <span> Tous </span>
	        </button>
        `
        div.innerHTML += html

        /* Ouverture de la boucle qui me permet de creer les differents boutton */
    categories.forEach(function(objet) {
    /*Ajout des gallery dans le html */
        let html = `
            <button type="button" class="filtre-bouton ${objet.name}">
		        <span> ${objet.name}</span>
	        </button>
        `
        div.innerHTML += html
    })
}

/* appel de la fonction qui recupere et  affiche les filtres */
implementerCategories()


/* 
const boutonFiltrerObjets = document.querySelector(".Objets");

boutonFiltrerObjets.addEventListener("click", function () {
    const objetFiltrees = categories.filter(function (categories) {
        return objet.category.name = "Objets";
    })
})

*/





