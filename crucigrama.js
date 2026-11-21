
/**
 * CRUCIGRAMA - HISTORIA DE COLOMBIA
 * Generador corregido para los seis periodos.
 */

/**
 * @typedef {Object} PeriodoHistorico
 * @property {string} nombre
 * @property {string} resumen
 * @property {[string,string][]} palabras
 */

/**
 * @typedef {Object} Celda
 * @property {number} fila
 * @property {number} columna
 * @property {string} letra
 * @property {number|null} numero
 */

/**
 * @typedef {Object} PalabraColocada
 * @property {string} palabra
 * @property {string} pista
 * @property {number} numero
 * @property {number} fila
 * @property {number} columna
 * @property {"H"|"V"} direccion
 */

/** @type {Record<string,PeriodoHistorico>} */
const periodos = {

    precolombina: {
        nombre: "Época precolombina",
        resumen: "Antes de la llegada de los europeos, el territorio colombiano estaba habitado por diversas sociedades indígenas. Los muiscas, taironas y otros pueblos desarrollaron formas propias de organización, agricultura, comercio y artesanía.",
        palabras: [
            ["MUISCAS", "Pueblo indígena del altiplano cundiboyacense."],
            ["TAIRONAS", "Cultura indígena de la Sierra Nevada de Santa Marta."],
            ["CACIQUE", "Autoridad principal de una comunidad indígena."],
            ["ORFEBRES", "Artesanos especializados en trabajar metales preciosos."],
            ["CHIBCHA", "Familia lingüística relacionada con los muiscas."]
        ]
    },

    conquista: {
        nombre: "La Conquista",
        resumen: "La conquista española transformó profundamente los territorios que hoy forman Colombia. La llegada de los europeos provocó enfrentamientos, cambios políticos y sociales y consecuencias profundas para las comunidades indígenas.",
        palabras: [
            ["JIMENEZ", "Apellido del conquistador Gonzalo Jiménez de Quesada."],
            ["ESPANA", "País europeo del que procedían los conquistadores."],
            ["SANTA", "Primera palabra del nombre de Santa Marta."],
            ["ORO", "Metal precioso muy buscado por los conquistadores."],
            ["INDIGENAS", "Pueblos que habitaban América antes de la llegada europea."]
        ]
    },

    colonial: {
        nombre: "Época colonial",
        resumen: "Durante la época colonial, el territorio estuvo bajo el dominio de la monarquía española. Se establecieron instituciones políticas y religiosas y se impusieron estructuras sociales desiguales.",
        palabras: [
            ["VIRREY", "Representante del rey español en un virreinato."],
            ["COLONIA", "Territorio dominado por otro país."],
            ["ESCLAVOS", "Personas sometidas a trabajo forzado y sin libertad."],
            ["IGLESIA", "Institución religiosa con gran influencia colonial."],
            ["IMPUESTO", "Pago exigido por las autoridades."]
        ]
    },

    independencia: {
        nombre: "Independencia",
        resumen: "El proceso de independencia estuvo marcado por movimientos políticos, campañas militares y personajes como Simón Bolívar, Francisco de Paula Santander y Antonio Nariño. La batalla de Boyacá, el 7 de agosto de 1819, fue decisiva para la independencia de Nueva Granada.",
        palabras: [
            ["BOLIVAR", "Libertador conocido como el Hombre de América."],
            ["NARINO", "Prócer que tradujo y difundió los Derechos del Hombre."],
            ["SANTANDER", "Prócer conocido como el Hombre de las Leyes."],
            ["BOYACA", "Lugar de la batalla decisiva del 7 de agosto de 1819."],
            ["LIBERTAD", "Ideal fundamental del proceso independentista."]
        ]
    },

    "gran-colombia": {
        nombre: "La Gran Colombia",
        resumen: "La Gran Colombia fue una república creada en 1819 que reunió territorios de los actuales Colombia, Venezuela, Ecuador y Panamá. Simón Bolívar fue una de sus figuras centrales. Las diferencias políticas y regionales contribuyeron a su disolución en 1831.",
        palabras: [
            ["BOLIVAR", "Figura central en la creación de la Gran Colombia."],
            ["SANTANDER", "Vicepresidente y figura política de la república."],
            ["CARACAS", "Ciudad natal de Simón Bolívar."],
            ["QUITO", "Territorio que formó parte de la Gran Colombia."],
            ["CONGRESO", "Institución que participó en la organización política."]
        ]
    },

    contemporanea: {
        nombre: "Colombia contemporánea",
        resumen: "La Colombia contemporánea ha atravesado transformaciones políticas, sociales y económicas. La Constitución de 1991 reorganizó aspectos fundamentales del Estado y reconoció nuevos derechos y mecanismos de participación ciudadana.",
        palabras: [
            ["BOGOTA", "Capital de Colombia."],
            ["CONSTITUCION", "Norma fundamental que organiza el Estado."],
            ["DEMOCRACIA", "Sistema político basado en la participación ciudadana."],
            ["CAFE", "Producto agrícola históricamente importante para el país."],
            ["INDUSTRIA", "Actividad económica relacionada con la producción."]
        ]
    }
};

// ------------------------------------
// ELEMENTOS
// ------------------------------------

const parametros = new URLSearchParams(window.location.search);
const idPeriodo = parametros.get("periodo") || "independencia";
const periodo = periodos[idPeriodo] || periodos.independencia;

const tablero = document.getElementById("tableroCrucigrama");
const listaPistas = document.getElementById("listaPistas");
const mensaje = document.getElementById("mensajeCrucigrama");

const contadorProgreso = document.getElementById("contadorProgreso");
const rellenoProgreso = document.getElementById("rellenoProgreso");

const desafioFinal = document.getElementById("desafioFinal");
const resultadoFinal = document.getElementById("resultadoFinal");
const resumenHistorico = document.getElementById("resumenHistorico");

const nombrePeriodo = document.getElementById("nombrePeriodo");

if (nombrePeriodo) {
    nombrePeriodo.textContent = periodo.nombre;
}

/** @type {Celda[]} */
let colocadas = [];

/** @type {PalabraColocada[]} */
let palabrasCrucigrama = [];

const TAMANO = 100;
const CENTRO = 30;

// ------------------------------------
// NORMALIZAR TEXTO
// ------------------------------------

/**
 * @param {string} texto
 * @returns {string}
 */
function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z]/g, "");
}

// ------------------------------------
// COMPROBAR POSICIONES
// ------------------------------------

/**
 * @param {string} palabra
 * @param {number} fila
 * @param {number} columna
 * @param {"H"|"V"} direccion
 * @returns {boolean}
 */
function puedeColocar(palabra, fila, columna, direccion) {

    if (
        fila < 1 ||
        columna < 1 ||
        fila >= TAMANO - 1 ||
        columna >= TAMANO - 1
    ) {
        return false;
    }

    let cruces = 0;

    for (let i = 0; i < palabra.length; i++) {

        const f = fila + (direccion === "V" ? i : 0);
        const c = columna + (direccion === "H" ? i : 0);

        if (f < 1 || c < 1 || f >= TAMANO - 1 || c >= TAMANO - 1) {
            return false;
        }

        const existente = colocadas.find(
            p => p.fila === f && p.columna === c
        );

        if (existente) {

            if (existente.letra !== palabra[i]) {
                return false;
            }

            cruces++;

        } else {

            const vecinos = direccion === "H"
                ? [[f - 1, c], [f + 1, c]]
                : [[f, c - 1], [f, c + 1]];

            for (const [vf, vc] of vecinos) {

                if (colocadas.some(
                    p => p.fila === vf && p.columna === vc
                )) {
                    return false;
                }
            }
        }
    }

    const antesFila = fila - (direccion === "V" ? 1 : 0);
    const antesCol = columna - (direccion === "H" ? 1 : 0);

    const despuesFila = fila + (direccion === "V" ? palabra.length : 0);
    const despuesCol = columna + (direccion === "H" ? palabra.length : 0);

    if (colocadas.some(p =>
        (p.fila === antesFila && p.columna === antesCol) ||
        (p.fila === despuesFila && p.columna === despuesCol)
    )) {
        return false;
    }

    return cruces === 1;
}

// ------------------------------------
// AGREGAR PALABRA
// ------------------------------------

/**
 * @param {string} palabra
 * @param {string} pista
 * @param {number} numero
 * @param {number} fila
 * @param {number} columna
 * @param {"H"|"V"} direccion
 * @returns {PalabraColocada}
 */
function agregarPalabra(palabra, pista, numero, fila, columna, direccion) {

    for (let i = 0; i < palabra.length; i++) {

        const f = fila + (direccion === "V" ? i : 0);
        const c = columna + (direccion === "H" ? i : 0);

        const existente = colocadas.find(
            p => p.fila === f && p.columna === c
        );

        if (!existente) {

            colocadas.push({
                fila: f,
                columna: c,
                letra: palabra[i],
                numero: i === 0 ? numero : null
            });

        } else if (i === 0 && existente.numero === null) {

            existente.numero = numero;
        }
    }

    return {
        palabra,
        pista,
        numero,
        fila,
        columna,
        direccion
    };
}

// ------------------------------------
// BUSCAR CRUCES
// ------------------------------------

/**
 * @param {string} palabra
 * @returns {{fila:number,columna:number,direccion:"H"|"V"}|null}
 */
function buscarCruce(palabra) {

    for (const existente of palabrasCrucigrama) {

        const direccion = existente.direccion === "H" ? "V" : "H";

        for (let a = 0; a < existente.palabra.length; a++) {

            for (let b = 0; b < palabra.length; b++) {

                if (existente.palabra[a] !== palabra[b]) {
                    continue;
                }

                const fila = existente.fila +
                    (existente.direccion === "V" ? a : 0) -
                    (direccion === "V" ? b : 0);

                const columna = existente.columna +
                    (existente.direccion === "H" ? a : 0) -
                    (direccion === "H" ? b : 0);

                if (puedeColocar(palabra, fila, columna, direccion)) {
                    return { fila, columna, direccion };
                }
            }
        }
    }

    return null;
}

// ------------------------------------
// BUSCAR FILA LIBRE
// ------------------------------------

/**
 * @param {string} palabra
 * @returns {number}
 */
function buscarFilaLibre(palabra) {

    let fila = colocadas.length > 0
        ? Math.max(...colocadas.map(p => p.fila)) + 2
        : CENTRO;

    while (fila < TAMANO - 2) {

        if (puedeColocar(palabra, fila, CENTRO, "H")) {
            return fila;
        }

        fila += 2;
    }

    return -1;
}

// ------------------------------------
// CREAR CRUCIGRAMA
// ------------------------------------

function crearCrucigrama() {

    colocadas = [];
    palabrasCrucigrama = [];

    const palabras = periodo.palabras
        .map(p => ({
            palabra: normalizar(p[0]),
            pista: p[1]
        }))
        .sort((a, b) => b.palabra.length - a.palabra.length);

    if (palabras.length === 0) {
        mensaje.textContent = "No hay palabras disponibles.";
        return;
    }

    let numero = 1;

    const primera = palabras.shift();

    palabrasCrucigrama.push(
        agregarPalabra(
            primera.palabra,
            primera.pista,
            numero++,
            CENTRO,
            CENTRO,
            "H"
        )
    );

    const sinCruce = [];

    for (const candidata of palabras) {

        const posicion = buscarCruce(candidata.palabra);

        if (posicion) {

            palabrasCrucigrama.push(
                agregarPalabra(
                    candidata.palabra,
                    candidata.pista,
                    numero++,
                    posicion.fila,
                    posicion.columna,
                    posicion.direccion
                )
            );

        } else {

            sinCruce.push(candidata);
        }
    }

    // Colocar las palabras restantes en filas cercanas.
    // Cada fila queda separada por una línea vacía.

    for (const candidata of sinCruce) {

        const fila = buscarFilaLibre(candidata.palabra);

        if (fila === -1) {
            continue;
        }

        palabrasCrucigrama.push(
            agregarPalabra(
                candidata.palabra,
                candidata.pista,
                numero++,
                fila,
                CENTRO,
                "H"
            )
        );
    }

    dibujarTablero();
    actualizarProgreso();
}

// ------------------------------------
// DIBUJAR TABLERO
// ------------------------------------

function dibujarTablero() {

    tablero.innerHTML = "";
    listaPistas.innerHTML = "";

    if (colocadas.length === 0) {
        mensaje.textContent = "No se pudo construir el tablero.";
        return;
    }

    const minFila = Math.min(...colocadas.map(p => p.fila));
    const maxFila = Math.max(...colocadas.map(p => p.fila));
    const minCol = Math.min(...colocadas.map(p => p.columna));
    const maxCol = Math.max(...colocadas.map(p => p.columna));

    const columnas = maxCol - minCol + 1;

    tablero.style.gridTemplateColumns = `repeat(${columnas}, 30px)`;

    /** @type {Map<string,Celda>} */
    const mapa = new Map();

    colocadas.forEach(p => {
        mapa.set(`${p.fila},${p.columna}`, p);
    });

    // Dibujar únicamente el rectángulo que contiene las palabras.

    for (let f = minFila; f <= maxFila; f++) {

        for (let c = minCol; c <= maxCol; c++) {

            const celda = document.createElement("div");
            celda.className = "celda-crucigrama";

            const dato = mapa.get(`${f},${c}`);

            if (dato) {

                celda.classList.add("activa");

                if (dato.numero !== null) {

                    const numero = document.createElement("span");
                    numero.className = "numero-celda";
                    numero.textContent = String(dato.numero);

                    celda.appendChild(numero);
                }

                const input = document.createElement("input");

                input.maxLength = 1;
                input.autocomplete = "off";
                input.dataset.fila = String(f);
                input.dataset.columna = String(c);

                input.addEventListener("input", () => {

                    input.value = normalizar(input.value).slice(0, 1);

                    actualizarProgreso();
                });

                celda.appendChild(input);
            }

            tablero.appendChild(celda);
        }
    }

    // Crear pistas.

    palabrasCrucigrama.forEach(p => {

        const div = document.createElement("div");
        div.className = "pista";

        const titulo = document.createElement("strong");

        titulo.textContent =
            `${p.numero}. ${p.direccion === "H" ? "Horizontal" : "Vertical"}`;

        const texto = document.createElement("p");
        texto.textContent = p.pista;

        div.appendChild(titulo);
        div.appendChild(texto);

        listaPistas.appendChild(div);
    });
}

// ------------------------------------
// OBTENER RESPUESTA
// ------------------------------------

/**
 * @param {PalabraColocada} palabra
 * @returns {string}
 */
function obtenerRespuesta(palabra) {

    let respuesta = "";

    for (let i = 0; i < palabra.palabra.length; i++) {

        const fila = palabra.fila + (palabra.direccion === "V" ? i : 0);
        const columna = palabra.columna + (palabra.direccion === "H" ? i : 0);

        const input = tablero.querySelector(
            `input[data-fila="${fila}"][data-columna="${columna}"]`
        );

        respuesta += input ? normalizar(input.value) : "";
    }

    return respuesta;
}

// ------------------------------------
// PROGRESO
// ------------------------------------

function actualizarProgreso() {

    const correctas = palabrasCrucigrama.filter(
        p => obtenerRespuesta(p) === p.palabra
    ).length;

    const total = palabrasCrucigrama.length;

    const porcentaje = total > 0
        ? (correctas / total) * 100
        : 0;

    contadorProgreso.textContent =
        `${correctas} de ${total} palabras completadas`;

    rellenoProgreso.style.width = `${porcentaje}%`;

    if (correctas === total && total > 0) {
        mostrarDesafioFinal();
    }
}

// ------------------------------------
// COMPROBAR
// ------------------------------------

function comprobarRespuestas() {

    const correctas = palabrasCrucigrama.filter(
        p => obtenerRespuesta(p) === p.palabra
    ).length;

    const total = palabrasCrucigrama.length;

    if (correctas === total && total > 0) {

        mensaje.textContent = "¡Excelente! Completaste el crucigrama.";
        mensaje.style.color = "green";

        mostrarDesafioFinal();

    } else {

        mensaje.textContent =
            `Llevas ${correctas} de ${total} palabras correctas. ¡Sigue intentando!`;

        mensaje.style.color = "#b45309";
    }

    actualizarProgreso();
}

// ------------------------------------
// PISTAS
// ------------------------------------

function darPista() {

    const pendientes = palabrasCrucigrama.filter(
        p => obtenerRespuesta(p) !== p.palabra
    );

    if (pendientes.length === 0) {
        mensaje.textContent = "¡Ya completaste todas las palabras!";
        return;
    }

    const palabra = pendientes[0];

    for (let i = 0; i < palabra.palabra.length; i++) {

        const fila = palabra.fila + (palabra.direccion === "V" ? i : 0);
        const columna = palabra.columna + (palabra.direccion === "H" ? i : 0);

        const input = tablero.querySelector(
            `input[data-fila="${fila}"][data-columna="${columna}"]`
        );

        if (input && input.value !== palabra.palabra[i]) {

            input.value = palabra.palabra[i];
            input.focus();

            mensaje.textContent =
                `Pista: revelamos una letra de la palabra ${palabra.numero}.`;

            mensaje.style.color = "#1d4ed8";

            actualizarProgreso();
            return;
        }
    }
}

// ------------------------------------
// DESAFÍO FINAL
// ------------------------------------

function mostrarDesafioFinal() {

    if (!desafioFinal.hidden) {
        return;
    }

    desafioFinal.hidden = false;

    resultadoFinal.innerHTML = `
        <h3>¡Lo lograste!</h3>
        <p>Has completado las ${palabrasCrucigrama.length} palabras
        de ${periodo.nombre}.</p>
        <p>¡Eres un explorador de la historia de Colombia!</p>
    `;

    resumenHistorico.textContent = periodo.resumen;

    mensaje.textContent = "¡Desafío histórico completado!";
    mensaje.style.color = "green";

    desafioFinal.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ------------------------------------
// REINICIAR
// ------------------------------------

function reiniciarCrucigrama() {

    tablero.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    mensaje.textContent = "";
    desafioFinal.hidden = true;

    actualizarProgreso();
}

// ------------------------------------
// VOLVER
// ------------------------------------

function volverAlPeriodo() {
    window.location.href = `periodo.html?periodo=${idPeriodo}`;
}

// ------------------------------------
// BOTONES
// ------------------------------------

document.getElementById("btnComprobar").addEventListener(
    "click",
    comprobarRespuestas
);

document.getElementById("btnReiniciar").addEventListener(
    "click",
    reiniciarCrucigrama
);

document.getElementById("btnPista").addEventListener(
    "click",
    darPista
);

document.getElementById("btnVolver").addEventListener(
    "click",
    volverAlPeriodo
);

document.getElementById("btnVolverPeriodoFinal").addEventListener(
    "click",
    volverAlPeriodo
);

// ------------------------------------
// INICIAR
// ------------------------------------

crearCrucigrama();



 

