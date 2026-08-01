let cartes = [];


// ==============================
// AFFICHAGE DU TABLEAU
// ==============================

function afficherCartes(liste) {

    const tbody = document.querySelector("#listeCartes tbody");

    tbody.innerHTML = "";


    liste.forEach(carte => {

        const ligne = document.createElement("tr");


        ligne.innerHTML = `

            <td>${carte.Card_Reference ?? ""}</td>
            <td>${carte.Card_Name_Fr ?? ""}</td>
            <td>${carte.Card_Type ?? ""}</td>
            <td>${carte["Couleur FR"] ?? ""}</td>
            <td>${carte["Card Level"] ?? ""}</td>
            <td>${carte.Card_Rarity ?? ""}</td>

        `;


        ligne.onclick = () => {

            window.location.href = `carte.html?id=${carte.ID}`;

        };


        tbody.appendChild(ligne);

    });


    document.getElementById("nbResultats").textContent =
        liste.length + " cartes trouvées";

}




// ==============================
// CHARGEMENT CSV
// ==============================

Papa.parse("data/wixoss_data.csv", {

    download: true,
    header: true,
    skipEmptyLines: true,


    complete: function(resultats) {


        cartes = resultats.data;


        afficherCartes(cartes);


        suiteDuScript();


    }

});





// ==============================
// CREATION DES LISTES POUR AUTOCOMPLETE
// ==============================

function obtenirValeurs(colonne) {


    return [...new Set(

        cartes
        .map(carte => carte[colonne])
        .filter(valeur => valeur)

    )];


}





// ==============================
// AUTOCOMPLETE
// ==============================

function autocomplete(inputId, listeId, valeurs) {


    const input = document.getElementById(inputId);

    const liste = document.getElementById(listeId);



    input.addEventListener("input", () => {


        liste.innerHTML = "";


        const recherche = input.value.toLowerCase();



        if (recherche === "") {

            filtrer();

            return;

        }



        valeurs

        .filter(v =>
            v.toLowerCase().includes(recherche)
        )

        .slice(0,20)

        .forEach(v => {


            const div = document.createElement("div");

            div.className = "suggestion";

            div.textContent = v;



            div.onclick = () => {


                input.value = v;

                liste.innerHTML = "";

                filtrer();


            };


            liste.appendChild(div);


        });


    });



    document.addEventListener("click", e => {


        if (!input.contains(e.target)) {

            liste.innerHTML = "";

        }


    });


}





// ==============================
// FILTRAGE
// ==============================

function filtrer() {


    const texte =
        document.getElementById("recherche")
        .value
        .toLowerCase();



    const extension =
        document.getElementById("filtreExtension").value;



    const type =
        document.getElementById("filtreType").value;



    const couleur =
        document.getElementById("filtreCouleur").value;



    const rarete =
        document.getElementById("filtreRarete").value;



    const niveau =
        document.getElementById("filtreNiveau").value;



    const archetype =
        document.getElementById("filtreArchetype").value;



    const restriction =
        document.getElementById("filtreRestriction").value;



    const timing =
        document.getElementById("filtreTiming").value;





    const resultat = cartes.filter(carte => {



        const correspondRecherche =

            texte === "" ||

            carte.Card_Name_Fr?.toLowerCase().includes(texte) ||

            carte.Card_Name_Ang?.toLowerCase().includes(texte) ||

            carte["カードのなまえ"]?.toLowerCase().includes(texte) ||

            carte.Card_Reference?.toLowerCase().includes(texte) ||

            carte.Card_Effect_FR?.toLowerCase().includes(texte);





        const correspondExtension =

            extension === "" ||

            carte.Extension === extension;




        const correspondType =

            type === "" ||

            carte.Card_Type === type;




        const correspondCouleur =

            couleur === "" ||

            carte["Couleur FR"] === couleur;




        const correspondRarete =

            rarete === "" ||

            carte.Card_Rarity === rarete;




        const correspondNiveau =

            niveau === "" ||

            carte["Card Level"] === niveau;




        const correspondArchetype =

            archetype === "" ||

            carte.Archetype_FR === archetype;




        const correspondRestriction =

            restriction === "" ||

            carte.Restriction_FR === restriction;




        const correspondTiming =

            timing === "" ||

            carte.Timing === timing;





        return (

            correspondRecherche &&

            correspondExtension &&

            correspondType &&

            correspondCouleur &&

            correspondRarete &&

            correspondNiveau &&

            correspondArchetype &&

            correspondRestriction &&

            correspondTiming

        );


    });




    afficherCartes(resultat);


}





// ==============================
// INITIALISATION
// ==============================

function suiteDuScript() {



    autocomplete(
        "filtreExtension",
        "listeExtension",
        obtenirValeurs("Extension")
    );


    autocomplete(
        "filtreType",
        "listeType",
        obtenirValeurs("Card_Type")
    );


    autocomplete(
        "filtreCouleur",
        "listeCouleur",
        obtenirValeurs("Couleur FR")
    );


    autocomplete(
        "filtreRarete",
        "listeRarete",
        obtenirValeurs("Card_Rarity")
    );


    autocomplete(
        "filtreNiveau",
        "listeNiveau",
        obtenirValeurs("Card Level")
    );


    autocomplete(
        "filtreArchetype",
        "listeArchetype",
        obtenirValeurs("Archetype_FR")
    );


    autocomplete(
        "filtreRestriction",
        "listeRestriction",
        obtenirValeurs("Restriction_FR")
    );


    autocomplete(
        "filtreTiming",
        "listeTiming",
        obtenirValeurs("Timing")
    );




    document

    .querySelectorAll("#zoneRecherche input")

    .forEach(element => {


        element.addEventListener("input", filtrer);


    });




    document.getElementById("reset").onclick = () => {


        document

        .querySelectorAll("#zoneRecherche input")

        .forEach(input => input.value = "");



        filtrer();


    };


}