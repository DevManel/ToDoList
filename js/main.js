// Données initiales
let taches = [
    {
        titre: "Apprendre mon cours de JavaScript",
        priorite: 1,
        id: 1
    },
    {
        titre: "Créer mon compte Github",
        priorite: 2,
        id: 2
    },
    {
        titre: "Répondre à mes emails",
        priorite: 3,
        id: 3
    }
];

// Fonction pour afficher les tâches
function afficherTaches() {
    const listeTaches = document.getElementById("taches");
    listeTaches.innerHTML = ''; // On vide la liste avant de la remplir

    // Tri des tâches par priorité
    taches.sort((a, b) => a.priorite - b.priorite);

    taches.forEach((tache) => {
        const itemTache = document.createElement("li");
        const etiquetteTache = document.createElement("label");
        
        // Création de l'élément checkbox
        const caseTache = document.createElement("input");
        caseTache.type = "checkbox";
        caseTache.setAttribute("data-id", tache.id); // Utilisation de 'data-id' pour l'identification unique
        
        // Ajout du texte de la tâche avec couleur selon la priorité
        etiquetteTache.classList.add(`priorite-${tache.priorite}`);
        etiquetteTache.innerHTML = tache.titre;

        itemTache.appendChild(caseTache);
        itemTache.appendChild(etiquetteTache);
        listeTaches.appendChild(itemTache);
    });
}

// Fonction pour ajouter une tâche
function ajouterTache(event) {
    event.preventDefault();

    const titre = document.getElementById("titre-tache").value;
    const priorite = parseInt(document.getElementById("priorite-tache").value, 10);

    if (titre) {
        const nouvelleTache = {
            titre,
            priorite,
            id: Date.now() // Générer un ID unique basé sur l'heure actuelle
        };
        taches.push(nouvelleTache);
        document.getElementById("titre-tache").value = ""; // Réinitialiser le champ texte
        afficherTaches(); // Réactualiser la liste
        sauvegarderTachesDansLocalStorage(); // Sauvegarder dans localStorage
    }
}

// Fonction pour supprimer les tâches sélectionnées
function supprimerTachesSelectionnees() {
    const casesSelectionnees = document.querySelectorAll('input[type="checkbox"]:checked');
    const idsSelectionnes = Array.from(casesSelectionnees).map(caseCheckbox => parseInt(caseCheckbox.getAttribute("data-id")));

    // Filtrer les tâches non sélectionnées
    const compteSupprimees = idsSelectionnes.length;
    taches = taches.filter((tache) => !idsSelectionnes.includes(tache.id));

    if (compteSupprimees > 0) {
        const notification = document.createElement("p");
        notification.textContent = `${compteSupprimees} tâche(s) supprimée(s) avec succès`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000); // Retirer la notification après 3 secondes
        afficherTaches();
        sauvegarderTachesDansLocalStorage(); // Sauvegarder dans localStorage
    }
}

// Sauvegarder les tâches dans le localStorage
function sauvegarderTachesDansLocalStorage() {
    localStorage.setItem("taches", JSON.stringify(taches));
}

// Charger les tâches depuis le localStorage
function chargerTachesDepuisLocalStorage() {
    const tachesSauvegardees = localStorage.getItem("taches");
    if (tachesSauvegardees) {
        taches = JSON.parse(tachesSauvegardees);
    }
}

// Initialisation du projet
document.addEventListener("DOMContentLoaded", () => {
    chargerTachesDepuisLocalStorage();
    afficherTaches();

    // Ajouter une nouvelle tâche
    const formulaire = document.getElementById("formulaire-tache");
    formulaire.addEventListener("submit", ajouterTache);

    // Supprimer les tâches sélectionnées
    const boutonSupprimer = document.getElementById("supprimer-selectionnes");
    boutonSupprimer.addEventListener("click", supprimerTachesSelectionnees);
});
