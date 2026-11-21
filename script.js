
"use strict";

// ==========================================
// 1. BANCO DE PERIODOS HISTORICOS
// ==========================================

const periodos = [
    {
        id: "precolombina",
        nombre: "Época precolombina",
        descripcion: "Los pueblos indígenas antes de la llegada europea.",
        icono: "🏺",
        contenido:
            "Conoce las culturas indígenas que habitaron " +
            "el territorio colombiano antes de la llegada " +
            "de los europeos."
    },
    {
        id: "conquista",
        nombre: "La Conquista",
        descripcion: "La llegada de los españoles al territorio.",
        icono: "⛵",
        contenido:
            "Explora la llegada de los conquistadores españoles, " +
            "sus expediciones y los cambios que provocaron " +
            "en las sociedades indígenas."
    },
    {
        id: "colonial",
        nombre: "Periodo colonial",
        descripcion: "La sociedad durante el dominio español.",
        icono: "🏛️",
        contenido:
            "Descubre cómo era la vida durante el dominio " +
            "español, su organización social, economía " +
            "y cultura."
    },
    {
        id: "independencia",
        nombre: "Independencia",
        descripcion: "La lucha por la independencia de la Nueva Granada.",
        icono: "⚔️",
        contenido:
            "Conoce los acontecimientos, personajes y batallas " +
            "que marcaron el proceso de independencia."
    },
    {
        id: "gran-colombia",
        nombre: "La Gran Colombia",
        descripcion: "El proyecto de unión de varias naciones.",
        icono: "🗺️",
        contenido:
            "Explora el proyecto político de la Gran Colombia, " +
            "su formación, sus protagonistas y su disolución."
    },
    {
        id: "contemporanea",
        nombre: "Colombia contemporánea",
        descripcion: "Los acontecimientos de nuestra época.",
        icono: "🇨🇴",
        contenido:
            "Conoce los acontecimientos políticos, sociales " +
            "y culturales que han marcado la Colombia moderna."
    }
];

// ==========================================
// 2. NAVEGACION
// ==========================================

function mostrarPeriodos() {
    const seccion = document.getElementById("periodos");

    if (!seccion) {
        console.error("No se encontró la sección de periodos.");
        return;
    }

    seccion.scrollIntoView({
        behavior: "smooth"
    });
}

// ==========================================
// 3. ABRIR UN PERIODO HISTORICO
// ==========================================

/**
 * Selecciona un periodo histórico.
 * @param {number} indice
 */
function seleccionarPeriodo(indice) {
    const periodo = periodos[indice];

    if (!periodo) {
        console.error("El periodo seleccionado no existe.");
        return;
    }

    const parametros = new URLSearchParams({
        periodo: periodo.id
    });

    window.location.href =
        "periodo.html?" + parametros.toString();
}

// ==========================================
// 4. GENERAR TARJETAS
// ==========================================

function cargarPeriodos() {
    const contenedor = document.getElementById("listaPeriodos");

    if (!contenedor) {
        console.error("No se encontró el contenedor de periodos.");
        return;
    }

    contenedor.innerHTML = "";

    periodos.forEach((periodo, indice) => {

        const tarjeta = document.createElement("article");
        tarjeta.className = "card";

        const icono = document.createElement("div");
        icono.style.fontSize = "30px";
        icono.style.marginBottom = "12px";
        icono.textContent = periodo.icono;

        const titulo = document.createElement("h3");
        titulo.textContent = periodo.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = periodo.descripcion;

        const boton = document.createElement("button");
        boton.textContent = "Explorar →";

        boton.addEventListener("click", () => {
            seleccionarPeriodo(indice);
        });

        tarjeta.appendChild(icono);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
    });
}

// ==========================================
// 5. INICIALIZACION
// ==========================================

function iniciarAplicacion() {

    const botonComenzar = document.getElementById("btnComenzar");

    if (botonComenzar) {
        botonComenzar.addEventListener("click", mostrarPeriodos);
    }

    cargarPeriodos();

    console.log("Historia de Colombia iniciada correctamente.");
}

// ==========================================
// 6. ARRANQUE
// ==========================================

iniciarAplicacion();




