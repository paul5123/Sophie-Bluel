
/*Recuperation des données de l'api*/
async function recupererTraveaux() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const traveaux = await reponse.json();

    console.log(traveaux);

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

recupererTraveaux();




