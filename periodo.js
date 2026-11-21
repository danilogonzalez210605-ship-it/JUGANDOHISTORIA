
"use strict";

// ==========================================
// 1. INFORMACION DE LOS PERIODOS
// ==========================================

const informacionPeriodos = {

    "precolombina": {
        nombre: "Época precolombina",
        icono: "🏺",
        descripcion:
            "Los pueblos indígenas antes de la llegada europea.",
        contenido:
            "Antes de la llegada de los españoles, el territorio " +
            "colombiano estaba habitado por diversos pueblos " +
            "indígenas, como los muiscas, taironas, quimbayas " +
            "y zenúes. Estas sociedades desarrollaron sus " +
            "propias culturas, conocimientos y formas de organización."
    },

    "conquista": {
        nombre: "La Conquista",
        icono: "⛵",
        descripcion:
            "La llegada de los españoles al territorio.",
        contenido:
            "La Conquista comenzó con las expediciones europeas " +
            "al territorio. Este proceso transformó profundamente " +
            "las sociedades indígenas y dio inicio al dominio " +
            "español en gran parte de la región."
    },

    "colonial": {
        nombre: "Periodo colonial",
        icono: "🏛️",
        descripcion:
            "La sociedad durante el dominio español.",
        contenido:
            "Durante el periodo colonial, la Corona española " +
            "estableció instituciones políticas, económicas " +
            "y sociales. La sociedad estaba organizada mediante " +
            "jerarquías y existían importantes diferencias " +
            "entre sus habitantes."
    },

    "independencia": {
        nombre: "Independencia",
        icono: "⚔️",
        descripcion:
            "La lucha por la independencia de la Nueva Granada.",
        contenido:
            "El proceso de independencia reunió diferentes " +
            "movimientos políticos y militares contra el dominio " +
            "español. Entre sus acontecimientos más importantes " +
            "se encuentran el 20 de julio de 1810 y la batalla " +
            "de Boyacá del 7 de agosto de 1819."
    },

    "gran-colombia": {
        nombre: "La Gran Colombia",
        icono: "🗺️",
        descripcion:
            "El proyecto de unión de varias naciones.",
        contenido:
            "La Gran Colombia fue una república creada en 1819 " +
            "que reunió territorios de los actuales Colombia, " +
            "Venezuela, Ecuador y Panamá. Simón Bolívar fue " +
            "una de sus principales figuras políticas."
    },

    "contemporanea": {
        nombre: "Colombia contemporánea",
        icono: "🇨🇴",
        descripcion:
            "Los acontecimientos de nuestra época.",
        contenido:
            "La Colombia contemporánea ha atravesado importantes " +
            "transformaciones políticas, sociales, económicas " +
            "y culturales. Su historia incluye cambios en " +
            "las instituciones, la sociedad y la vida cotidiana."
    }

};

// ==========================================
// 2. OBTENER EL PERIODO SELECCIONADO
// ==========================================

function obtenerPeriodo() {

    const parametros = new URLSearchParams(
        window.location.search
    );

    return parametros.get("periodo");
}

// ==========================================
// 3. MOSTRAR INFORMACION
// ==========================================

function mostrarInformacionPeriodo() {

    const idPeriodo = obtenerPeriodo();

    const periodo = informacionPeriodos[idPeriodo];

    const nombre = document.getElementById("nombrePeriodo");
    const icono = document.getElementById("iconoPeriodo");
    const descripcion = document.getElementById("descripcionPeriodo");
    const contenido = document.getElementById("contenidoPeriodo");
    const enlaceSopa = document.getElementById("enlaceSopa");

    if (!periodo) {

        document.getElementById("nombrePeriodo").textContent =
            "Periodo no encontrado";

        document.getElementById("descripcionPeriodo").textContent =
            "No se pudo identificar el periodo seleccionado.";

        document.getElementById("contenidoPeriodo").textContent =
            "Regresa al menú principal y selecciona una época histórica.";

        if (enlaceSopa) {
            enlaceSopa.hidden = true;
        }

        console.error("El periodo seleccionado no existe.");

        return;
    }

    nombre.textContent = periodo.nombre;
    icono.textContent = periodo.icono;
    descripcion.textContent = periodo.descripcion;
    contenido.textContent = periodo.contenido;

    // Enviar el periodo seleccionado a la sopa de letras

    enlaceSopa.href =
        "sopa.html?periodo=" + encodeURIComponent(idPeriodo);

    document.title =
        periodo.nombre + " | Historia de Colombia";

    console.log("Periodo cargado:", periodo.nombre);
}

// ==========================================
// 4. BOTON PARA VOLVER
// ==========================================

function conectarBotonVolver() {

    const boton = document.getElementById("btnVolverInicio");

    if (!boton) return;

    boton.addEventListener("click", () => {

        window.location.href = "index.html";

    });
}

// ==========================================
// 5. INICIAR
// ==========================================

function iniciarPeriodo() {

    mostrarInformacionPeriodo();

    conectarBotonVolver();

    console.log("Pantalla de periodo iniciada correctamente.");

}

// ==========================================
// 6. ARRANQUE
// ==========================================

iniciarPeriodo();
