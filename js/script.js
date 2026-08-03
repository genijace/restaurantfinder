const titre = document.getElementById("titre");

if (titre) {
    titre.textContent = "Trouvez le meilleur restaurant à Libreville";
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
});

const restaurants = [
    {
        nom: "L'ASSIETTE D'OR",
        restaurantImage: "images/Terrasse.jpg.jpg",
        plats: [
            { nom: "Riz cantonais", image: "images/Riz cantonais.jpg" },
            { nom: "Poisson braisé", image: "images/poisson braisé.jpg" },
            { nom: "Gambas", image: "images/Gambas.jpg" }
        ],
        adresse: "Akanda",
        telephone: "+241 065 82 13 64"
    },
    {
        nom: " Hotel Radisson",
        restaurantImage: "images/hotel.jpg.jpg",
        plats: [
            { nom: "Pizza", image: "images/pizza.jpg" },
            { nom: "Spagetti", image: "images/Lasagne.jpg" },
            { nom: "Nems", image: "images/nems.jpg" }
        ],
        adresse: "Glass",
        telephone: "+241 062 22 22 22"
    },
    {
        nom: "Tokyo Sushi",
        restaurantImage: "images/chine.jpg",
        plats: [
            { nom: "Sushi", image: "images/sushi.jpg" },
            { nom: "Maki", image: "images/Curry.jpg" },
            { nom: "Ramen", image: "images/RAMEN.jpg" }
        ],
        adresse: "Louis",
        telephone: "+241 066 33 33 33"
    },
    {
        nom: "Bantu mystique",
        restaurantImage: "images/bantu mystique.jpg",
        plats: [
            { nom: "Poulet Nyembwe", image: "images/maman.jpg" },
            { nom: "Haricots", image: "images/Haricots.jpg" },
            { nom: "Chenille", image: "images/Chenille.jpg" }
        ],
        adresse: "Nzeng Ayong",
        telephone: "+241 074 44 44 44"
    },
    {
        nom: "Akwaba Lounge",
        restaurantImage: "images/Gabon.jpg.jpg",
        plats: [
            { nom: "Viande de brousse", image: "images/Viande de brousse.jpg" },
            { nom: "Feuille de Manioc", image: "images/feuille de manioc.mp4", video: true },
            { nom: "Le plat Spécial", image: "images/Sauce.mp4", video: true }
        ],
        adresse: "Charbonnages",
        telephone: "+241 065 55 55 55"
    }
];

const champs = document.querySelectorAll(".search-input");
const resultat = document.getElementById("resultats");
const restaurantList = document.getElementById("restaurant-list");
const boutons = document.querySelectorAll(".hero-search button, #plats button");
const sectionPlats = document.getElementById("plats");

function scrollToResults() {
    if (!sectionPlats) return;

    sectionPlats.scrollIntoView({ behavior: "smooth", block: "start" });
}

function createRestaurantCard(item, query, showDishes) {
    const card = document.createElement("article");
    card.className = "restaurant-card";

    const dishes = item.plats.map(function(plat) {
        const isMatch = query && plat.nom.toLowerCase().includes(query);

        if (plat.video) {
            return `
                <div class="dish-card ${isMatch ? "matched" : ""}">
                    <video autoplay muted loop playsinline class="dish-video">
                        <source src="${plat.image}" type="video/mp4">
                    </video>
                    <span>${plat.nom}</span>
                    ${isMatch ? "<small>Correspondance</small>" : ""}
                </div>
            `;
        }

        return `
            <div class="dish-card ${isMatch ? "matched" : ""}">
                <img src="${plat.image}" alt="${plat.nom}">
                <span>${plat.nom}</span>
                ${isMatch ? "<small>Correspondance</small>" : ""}
            </div>
        `;
    }).join("");

    const dishesMarkup = showDishes ? `
        <div class="dish-section">
            <div class="dish-section-title">Plats proposés</div>
            <div class="dish-gallery">${dishes}</div>
        </div>
    ` : `
        <div class="restaurant-preview">
            <span>Découvrez les plats proposés par ce restaurant.</span>
        </div>
    `;

    card.innerHTML = `
        <div class="restaurant-image-wrapper">
            <img class="restaurant-image" src="${item.restaurantImage}" alt="${item.nom}">
        </div>
        <div class="restaurant-content">
            <div class="restaurant-header">
                <h3>${item.nom}</h3>
                ${query ? '<span class="match-pill">Résultat</span>' : ""}
            </div>
            <p><strong>Adresse :</strong> ${item.adresse}</p>
            <p><strong>Téléphone :</strong> ${item.telephone}</p>
            ${dishesMarkup}
        </div>
    `;

    return card;
}

function renderRestaurants(items, container, query, showDishes) {
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p class='message'>Aucun restaurant disponible.</p>";
        return;
    }

    const shell = document.createElement("div");
    shell.className = "results-shell";

    if (query) {
        const summary = document.createElement("div");
        summary.className = "search-summary";
        summary.innerHTML = `
            <h3>Résultats pour "${query}"</h3>
            <p>${items.length} restaurant${items.length > 1 ? "s" : ""} correspondant${items.length > 1 ? "s" : ""}</p>
        `;
        shell.appendChild(summary);
    }

    const grid = document.createElement("div");
    grid.className = "results-grid";

    items.forEach(function(item) {
        grid.appendChild(createRestaurantCard(item, query, showDishes));
    });

    shell.appendChild(grid);
    container.appendChild(shell);
}

function synchroniserChamps(valeur) {
    champs.forEach(function(champ) {
        champ.value = valeur;
    });
}

function lancerRechercheDepuisChamp(champ, shouldScroll = true) {
    if (!champ) return;

    const valeur = champ.value;
    synchroniserChamps(valeur);
    rechercherPlats(valeur, shouldScroll);
}

function rechercherPlats(recherche, shouldScroll = true) {
    const query = recherche.toLowerCase().trim();

    if (!query) {
        resultat.innerHTML = "<p class='message'>Tapez un plat pour voir les restaurants correspondants.</p>";
        return;
    }

    const filtres = restaurants.filter(function(item) {
        return item.plats.some(function(plat) {
            return plat.nom.toLowerCase().includes(query);
        });
    });

    if (filtres.length === 0) {
        resultat.innerHTML = `<p class='message'>Aucun restaurant trouvé pour "${recherche}".</p>`;
        if (shouldScroll) {
            scrollToResults();
        }
        return;
    }

    resultat.innerHTML = "";
    renderRestaurants(filtres, resultat, query, true);

    if (shouldScroll) {
        requestAnimationFrame(function() {
            scrollToResults();
        });
    }
}

champs.forEach(function(champ) {
    champ.addEventListener("input", function() {
        lancerRechercheDepuisChamp(champ, true);
    });

    champ.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            lancerRechercheDepuisChamp(champ, true);
        }
    });

    champ.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            lancerRechercheDepuisChamp(champ, true);
        }
    });

    champ.addEventListener("search", function() {
        lancerRechercheDepuisChamp(champ, true);
    });

    champ.addEventListener("change", function() {
        lancerRechercheDepuisChamp(champ, true);
    });
});

boutons.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        const boite = bouton.closest(".search-box");
        const champProche = boite ? boite.querySelector(".search-input") : champs[0];
        lancerRechercheDepuisChamp(champProche, true);
    });
});

// Fallback: ensure hero search button always triggers search (handles edge cases on pages)
const heroBtn = document.querySelector('.hero-search button');
if (heroBtn) {
    heroBtn.addEventListener('click', function() {
        const champ = document.querySelector('#searchInputHero');
        if (champ) lancerRechercheDepuisChamp(champ, true);
    });
    // also support pointerdown/touchstart for mobile devices
    heroBtn.addEventListener('pointerdown', function() {
        const champ = document.querySelector('#searchInputHero');
        if (champ) lancerRechercheDepuisChamp(champ, false);
    });
}

renderRestaurants(restaurants, restaurantList, "", false);
rechercherPlats("", false);
