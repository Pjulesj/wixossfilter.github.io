let cartes = [];

function afficherCartes(liste){

    const tbody = document.querySelector("#listeCartes tbody");

    tbody.innerHTML = "";

    liste.forEach(carte=>{

        const ligne = document.createElement("tr");

        ligne.innerHTML=`

            <td>${carte.Card_Reference}</td>
            <td>${carte.Card_Name_Fr}</td>
            <td>${carte.Card_Type}</td>
            <td>${carte["Couleur FR"]}</td>
            <td>${carte["Card Level"]}</td>
            <td>${carte.Card_Rarity}</td>

        `;

        ligne.onclick=()=>{

            window.location.href=`carte.html?id=${carte.ID}`;

        };

        tbody.appendChild(ligne);

    });

}

Papa.parse("data/wixoss_data.csv", {

    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(resultats) {

        cartes = resultats.data;

        afficherCartes(cartes);

    }

});


function remplirListe(id, colonne){

    const select=document.getElementById(id);

    const valeurs=[...new Set(cartes
        .map(c=>c[colonne])
        .filter(v=>v && v!=""))];

    valeurs.sort();

    valeurs.forEach(v=>{

        const option=document.createElement("option");

        option.value=v;
        option.textContent=v;

        select.appendChild(option);

    });

}

remplirListe("filtreExtension","Extension");
remplirListe("filtreType","Card_Type");
remplirListe("filtreCouleur","Couleur FR");
remplirListe("filtreRarete","Card_Rarity");
remplirListe("filtreNiveau","Card Level");
remplirListe("filtreArchetype","Archetype_FR");
remplirListe("filtreRestriction","Restriction");
remplirListe("filtreTiming","Timing_FR");

document
.querySelectorAll("#zoneRecherche input, #zoneRecherche select")
.forEach(element=>{

    element.addEventListener("input", filtrer);

    element.addEventListener("change", filtrer);

});

document.getElementById("reset").onclick=()=>{

    document
    .querySelectorAll("#zoneRecherche input")
    .forEach(i=>i.value="");

    document
    .querySelectorAll("#zoneRecherche select")
    .forEach(s=>s.selectedIndex=0);

    filtrer();

};