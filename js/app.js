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