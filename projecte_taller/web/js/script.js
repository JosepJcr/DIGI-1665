// =============================================
// URL de l'API — canvia-la pel teu servidor
// =============================================
const url_api = "http://localhost:5000";


// =============================================
// FUNCIÓ 1: Enviar una cita nova
// =============================================
function enviarCita() {

    const vehicle = document.getElementById("camp_vehicle").value.trim();
    const data    = document.getElementById("camp_data").value;
    const servei  = document.getElementById("camp_servei").value.trim();

    // Validació de camps buits
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


// =============================================
// FUNCIÓ 2: Carregar i mostrar totes les cites
// =============================================
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


// =============================================
// FUNCIÓ 3: Dibuixar les cites a la taula HTML
// =============================================
function mostrarCitesALaTaula(llista_cites) {

    const cos_taula = document.getElementById("cos_taula");
    cos_taula.innerHTML = "";

    if (llista_cites.length === 0) {
        cos_taula.innerHTML = "<tr><td colspan='4' style='text-align:center; color:#555; padding:20px;'>No hi ha cites registrades.</td></tr>";
        return;
    }

    // Correcció: "let" en lloc de "const" perquè és un comptador
    for (let i = 0; i < llista_cites.length; i++) {

        const cita = llista_cites[i];

        // Correcció: "let" en lloc de "const" perquè reassignem la variable
        let fila = "<tr>";
        fila += "<td>#" + cita.id               + "</td>";
        fila += "<td>" + cita.vehicle_id         + "</td>";
        fila += "<td>" + cita.data_cita          + "</td>";
        fila += "<td>" + cita.servei_sollicitat  + "</td>";
        fila += "</tr>";

        cos_taula.innerHTML += fila;
    }
}


// =============================================
// FUNCIÓ 4: Mostrar un missatge a l'usuari
// =============================================
function mostrarMissatge(text, color) {
    const p = document.getElementById("missatge");
    p.textContent = text;
    p.style.color = color;
}


// =============================================
// FUNCIÓ 5: Buidar els camps del formulari
// =============================================
function buidarFormulari() {
    document.getElementById("camp_vehicle").value = "";
    document.getElementById("camp_data").value    = "";
    document.getElementById("camp_servei").value  = "";
}


// =============================================
// En carregar la pàgina, ja mostrem les cites
// =============================================
carregarCites();
