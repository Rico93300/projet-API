const getMethod = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM1MDk5NmQ1M2NiYmIxMTg5MDlkNzIwZTc4ZWZlNiIsInN1YiI6IjY1YjM3NGQ3MGVkMmFiMDE4NDg2NDdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xngv1nWHbpUHHQNuDgS1jVgB5EiVBghPH3O33xVwY0g",
	},
};

// async function listMovies() {
// 	try {
// 		const response = await fetch(
// 			"https://api.themoviedb.org/3/list/1?language=fr-FR&page=1",
// 			getMethod
// 		);
// 		const data = await response.json();
// 		console.log(data.items);
// 		return data.items;
// 	} catch (error) {
// 		// Gérer les erreurs ici, si nécessaire
// 		console.error("Erreur lors de la requête:", error.message);
// 	}
// }
// listMovies();
// // Utilisez une fonction asynchrone pour attendre la résolution de la promesse
// async function loadMovies() {
// 	const moviesList = await listMovies();
// 	console.log(moviesList);

// 	// Récupérez le conteneur
// 	const container = document.getElementById("container");

// 	moviesList.forEach((movie) => {
// 		// Créez les éléments de la carte
// 		const card = document.createElement("div");
// 		//v3 pour la couleur
// 		card.className = "card text-bg-dark m-2";
// 		card.style.width = "18rem";

// 		const img = document.createElement("img");
// 		img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 		img.className = "card-img-top p-2";
// 		img.alt = movie.title;

// 		const bodyCard = document.createElement("div");
// 		bodyCard.className = "card-body";

// 		const title = document.createElement("h5");
// 		title.className = "card-little";
// 		title.textContent = movie.title;

// 		const overview = document.createElement("p");
// 		overview.className = "card-text";
// 		overview.textContent = movie.overview;
// 		overview.textContent = movie.overview.slice(0, 40) + " ect..";

// 		const btn = document.createElement("button");
// 		btn.className = "btn btn-primary";
// 		btn.textContent = "bouton favori";

// 		const btn2 = document.createElement("button");
// 		btn2.className = "btn btn-danger";
// 		btn2.textContent = "bouton numero 2";

		
// 		bodyCard.appendChild(overview);
// 		bodyCard.appendChild(title);
// 		bodyCard.appendChild(btn2);
// 		bodyCard.appendChild(btn);
// 		card.appendChild(img);
// 		card.appendChild(bodyCard);
// 		container.appendChild(card);
// 	});
// }
// loadMovies();

// ***********************correction*******************
async function listMovies() {
	try {
		const response = await fetch(
			"https://api.themoviedb.org/3/list/1?language=fr-FR&page=1",
			getMethod
		);
		const data = await response.json();
		//console.log(data.items);
		return data.items;
	} catch (error) {
		// Gérer les erreurs ici, si nécessaire
		console.error("Erreur lors de la requête:", error.message);
	}
}

// Liste de films favoris
const favoris = [];

// Liste de films (accessible dans le contexte global)
let moviesList;

// Fonction pour ajouter un film aux favoris
function ajouterAuxFavoris(titre) {
	const film = moviesList.find((movie) => movie.title === titre);

	if (film) {
		favoris.push(film);
		console.log(`Le film "${titre}" a été ajouté aux favoris.`);
		afficherFilmsFavoris();
	} else {
		console.log(`Film non trouvé : "${titre}"`);
	}
}

// Fonction pour afficher les titres des films favoris
function afficherFilmsFavoris() {
	console.log("Films favoris :");
	for (const movie of favoris) {
		console.log(movie.title);
	}
}

// Fonction pour supprimer un film des favoris
function supprimerDesFavoris(titre) {
	const index = favoris.findIndex((movie) => movie.title === titre);

	if (index !== -1) {
		favoris.splice(index, 1);
		console.log(`Le film "${titre}" a été supprimé des favoris.`);
		afficherFilmsFavoris();
	} else {
		console.log(`Film non trouvé dans les favoris : "${titre}"`);
	}
}

// Fonction pour créer une carte de film
function creerCarteFilm(movie) {
	// Créez les éléments de la carte
	const card = document.createElement("div");
	card.className = "card text-bg-dark m-2";
	card.style.width = "18rem";

	const img = document.createElement("img");
	img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	img.className = "card-img-top p-2";
	img.alt = movie.title;

	const cardBody = document.createElement("div");
	cardBody.className = "card-body";

	const title = document.createElement("h5");
	title.className = "card-title";
	title.textContent = movie.title;

	const overview = document.createElement("p");
	overview.className = "card-text";
	overview.textContent = movie.overview.slice(0, 40) + "...";

	// Ajoutez un bouton pour ajouter aux favoris
	const addButton = document.createElement("button");
	addButton.textContent = "Ajouter aux favoris";
	addButton.className = "btn btn-primary";
	addButton.addEventListener("click", () => ajouterAuxFavoris(movie.title));

	// Ajoutez un bouton pour supprimer des favoris
	const removeButton = document.createElement("button");
	removeButton.textContent = "Supprimer des favoris";
	removeButton.className = "btn btn-danger";
	removeButton.addEventListener("click", () =>
		supprimerDesFavoris(movie.title)
	);

	// Ajoutez les éléments à la carte(les petits enfants)
	cardBody.appendChild(title);
	cardBody.appendChild(overview);
	cardBody.appendChild(addButton);
	cardBody.appendChild(removeButton);

	// Ajoutez les éléments à la carte (les parents)
	card.appendChild(img);
	card.appendChild(cardBody);

	// Ajoutez la carte au conteneur (Le grand père)
	container.appendChild(card);
}

// Fonction principale pour charger les films
async function loadMovies() {
	try {
		moviesList = await listMovies();
		console.log(moviesList);

		// Récupérez le conteneur
		const container = document.getElementById("container");

		// Parcourez la liste de films et créez des cartes pour chaque film
		moviesList.forEach((movie) => {
			creerCarteFilm(movie);
		});
	} catch (error) {
		console.error("Erreur lors du chargement des films:", error.message);
	}
}

// Appelez votre fonction asynchrone pour charger les films
loadMovies();
console.log("liste des favoris : ", moviesList);
