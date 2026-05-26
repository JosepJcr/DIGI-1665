
const url_api = "http://localhost:5000";

function enviarCita() {

    const vehicle = document.getElementById("camp_vehicle").value.trim();
    const data    = document.getElementById("camp_data").value;
    const servei  = document.getElementById("camp_servei").value.trim();


    if (vehicle === "" || data === "" || servei === "") {
        mostrarMissatge("⚠ Omple tots els camps!", "var(--vermell)");
        return;
    }

    const dades = {
        vehicle_id:        vehicle,
        data_cita:         data,
        servei_sollicitat: servei
    };

    fetch(url_api + "/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dades)
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(resultat) {
        mostrarMissatge("✓ " + resultat.message, "var(--verd)");
        buidarFormulari();
        carregarCites();
    })
    .catch(function(error) {
        mostrarMissatge("✗ No s'ha pogut connectar amb el servidor.", "var(--vermell)");
        console.error(error);
    });
}


function carregarCites() {

    fetch(url_api + "/appointments")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(llista_cites) {
        mostrarCitesALaTaula(llista_cites);
    })
    .catch(function(error) {
        console.error("Error carregant cites:", error);
    });
}


function mostrarCitesALaTaula(llista_cites) {

    const cos_taula = document.getElementById("cos_taula");
    cos_taula.innerHTML = "";

    if (llista_cites.length === 0) {
        cos_taula.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#555; padding:20px;'>No hi ha cites registrades.</td></tr>";
        return;
    }

    for (let i = 0; i < llista_cites.length; i++) {

        const cita = llista_cites[i];

       
        let fila = "<tr>";
        fila += "<td>#" + cita.id               + "</td>";
        fila += "<td>" + cita.vehicle_id         + "</td>";
        fila += "<td>" + cita.data_cita          + "</td>";
        fila += "<td>" + cita.servei_sollicitat  + "</td>";
        fila += "</tr>";

        cos_taula.innerHTML += fila;
    }
}


function mostrarMissatge(text, color) {
    const p = document.getElementById("missatge");
    p.textContent = text;
    p.style.color = color;
}

function buidarFormulari() {
    document.getElementById("camp_vehicle").value = "";
    document.getElementById("camp_data").value    = "";
    document.getElementById("camp_servei").value  = "";
}


// =============================================
// En carregar la pàgina, ja mostrem les cites
// =============================================
carregarCites();
