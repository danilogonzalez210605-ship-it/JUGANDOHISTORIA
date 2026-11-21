
"use strict";

// ==========================================
// 1. TIPOS DE DATOS
// ==========================================

/**
 * @typedef {{
 *   nombre: string,
 *   titulo: string,
 *   texto: string
 * }} PalabraHistorica
 */

/**
 * @typedef {{
 *   nombre: string,
 *   palabras: PalabraHistorica[]
 * }} PeriodoHistorico
 */

/**
 * @typedef {{
 *   nombre: string,
 *   celdas: {fila: number, columna: number}[]
 * }} PalabraEncontrada
 */

// ==========================================
// 2. CONFIGURACION GENERAL
// ==========================================

const TAMANO = 10;
const CANTIDAD_PALABRAS = 5;

// ==========================================
// 3. INFORMACION DE LOS PERIODOS
// ==========================================

/** @type {Record<string, PeriodoHistorico>} */
const periodos = {

    "precolombina": {
        nombre: "Época precolombina",
        palabras: [
            {
                nombre: "MUISCA",
                titulo: "La cultura muisca",
                texto: "Los muiscas fueron uno de los pueblos indígenas más importantes del territorio colombiano. Habitaron principalmente el altiplano cundiboyacense y se destacaron por su agricultura, comercio y trabajo del oro."
            },
            {
                nombre: "TAIRONA",
                titulo: "La cultura tairona",
                texto: "Los taironas habitaron la Sierra Nevada de Santa Marta. Construyeron poblados, caminos y terrazas de piedra, y desarrollaron importantes conocimientos de agricultura y orfebrería."
            },
            {
                nombre: "QUIMBAYA",
                titulo: "La cultura quimbaya",
                texto: "Los quimbayas habitaron principalmente el actual Eje Cafetero. Fueron reconocidos por sus extraordinarias piezas de oro y sus técnicas de orfebrería."
            },
            {
                nombre: "ZENU",
                titulo: "El pueblo zenú",
                texto: "Los zenúes habitaron regiones de los actuales departamentos de Córdoba y Sucre. Desarrollaron sistemas de canales para controlar el agua y aprovechar las tierras."
            },
            {
                nombre: "CACIQUE",
                titulo: "Los caciques",
                texto: "El cacique era una autoridad política y social en diferentes comunidades indígenas. Sus responsabilidades podían incluir la organización de la comunidad y la toma de decisiones."
            },
            {
                nombre: "CHIBCHA",
                titulo: "La lengua chibcha",
                texto: "El chibcha, también conocido como muysccubun, fue la lengua hablada por los muiscas del altiplano cundiboyacense."
            },
            {
                nombre: "ORFEBRE",
                titulo: "La orfebrería indígena",
                texto: "La orfebrería fue el trabajo artístico de los metales, especialmente el oro. Diversos pueblos indígenas del territorio desarrollaron técnicas muy elaboradas."
            }
        ]
    },

    "conquista": {
        nombre: "La Conquista",
        palabras: [
            {
                nombre: "COLON",
                titulo: "Cristóbal Colón",
                texto: "Cristóbal Colón encabezó la expedición europea que llegó al Caribe en 1492. Este acontecimiento abrió una etapa de exploración y conquista europea en América."
            },
            {
                nombre: "QUESADA",
                titulo: "Gonzalo Jiménez de Quesada",
                texto: "Gonzalo Jiménez de Quesada dirigió la expedición española que llegó al territorio muisca en 1537 y participó en la fundación de Santa Fe de Bogotá en 1538."
            },
            {
                nombre: "BASTIDAS",
                titulo: "Rodrigo de Bastidas",
                texto: "Rodrigo de Bastidas fue un explorador español que recorrió parte de la costa caribeña. Fundó Santa Marta en 1525."
            },
            {
                nombre: "CARTAGENA",
                titulo: "Cartagena de Indias",
                texto: "Cartagena de Indias fue fundada por los españoles en 1533. Se convirtió en un importante puerto del Caribe y en un centro del comercio colonial."
            },
            {
                nombre: "EXPEDICION",
                titulo: "Las expediciones",
                texto: "Las expediciones españolas recorrieron diferentes regiones del continente en busca de riquezas y territorios. Estos procesos provocaron grandes transformaciones y graves consecuencias para los pueblos indígenas."
            },
            {
                nombre: "ESPANA",
                titulo: "La Corona española",
                texto: "La Corona española organizó y respaldó expediciones de conquista. Con el tiempo estableció instituciones para controlar los territorios americanos."
            },
            {
                nombre: "SANTAMARTA",
                titulo: "Santa Marta",
                texto: "Santa Marta fue fundada por Rodrigo de Bastidas en 1525. Es una de las ciudades de fundación española más antiguas que siguen existiendo en Colombia."
            }
        ]
    },

    "colonial": {
        nombre: "Periodo colonial",
        palabras: [
            {
                nombre: "VIRREINATO",
                titulo: "El Virreinato",
                texto: "El Virreinato de la Nueva Granada fue creado en el siglo XVIII para administrar los territorios de la Corona española en el norte de Sudamérica."
            },
            {
                nombre: "CABILDO",
                titulo: "El cabildo",
                texto: "El cabildo era una institución de gobierno local durante la época colonial. Se ocupaba de asuntos administrativos de las ciudades."
            },
            {
                nombre: "MONARQUIA",
                titulo: "La monarquía",
                texto: "Durante la Colonia, los territorios americanos estaban bajo la autoridad de la monarquía española, encabezada por el rey."
            },
            {
                nombre: "MESTIZAJE",
                titulo: "El mestizaje",
                texto: "El mestizaje fue un proceso de mezcla cultural y poblacional entre distintos grupos. Transformó profundamente la sociedad colonial."
            },
            {
                nombre: "RESGUARDO",
                titulo: "Los resguardos indígenas",
                texto: "Los resguardos fueron territorios reconocidos para comunidades indígenas durante la Colonia. Su historia estuvo marcada por cambios y conflictos relacionados con la tierra."
            },
            {
                nombre: "HACIENDA",
                titulo: "Las haciendas",
                texto: "Las haciendas fueron grandes propiedades rurales dedicadas a actividades agrícolas y ganaderas. Tuvieron importancia en la economía colonial."
            },
            {
                nombre: "ESCLAVITUD",
                titulo: "La esclavitud",
                texto: "Durante la Colonia, miles de africanos fueron trasladados por la fuerza a América y sometidos a esclavitud. Sus descendientes contribuyeron profundamente a la cultura colombiana."
            }
        ]
    },

    "independencia": {
        nombre: "Independencia",
        palabras: [
            {
                nombre: "BOLIVAR",
                titulo: "Simón Bolívar",
                texto: "Simón Bolívar fue uno de los principales líderes de la independencia de varios territorios sudamericanos. Dirigió la Campaña Libertadora de 1819, decisiva para la independencia de la Nueva Granada."
            },
            {
                nombre: "SUCRE",
                titulo: "Antonio José de Sucre",
                texto: "Antonio José de Sucre fue un destacado militar y aliado de Simón Bolívar. Dirigió la victoria patriota en la batalla de Ayacucho, en 1824."
            },
            {
                nombre: "BOYACA",
                titulo: "La batalla de Boyacá",
                texto: "El 7 de agosto de 1819, las tropas patriotas obtuvieron una victoria decisiva sobre el ejército realista en el puente de Boyacá. Este triunfo fue fundamental para la independencia de la Nueva Granada."
            },
            {
                nombre: "LIBERTAD",
                titulo: "La libertad",
                texto: "La libertad fue uno de los grandes ideales de los movimientos independentistas. Muchas personas participaron en la lucha contra el dominio español."
            },
            {
                nombre: "PATRIOTA",
                titulo: "Los patriotas",
                texto: "Los patriotas fueron quienes apoyaron la independencia del dominio español. Entre ellos hubo militares, campesinos, mujeres y personas de distintos grupos sociales."
            },
            {
                nombre: "NARINO",
                titulo: "Antonio Nariño",
                texto: "Antonio Nariño fue un político y militar neogranadino. En 1794 publicó una traducción de los Derechos del Hombre y del Ciudadano, hecho que le ocasionó problemas con las autoridades españolas."
            },
            {
                nombre: "POLICARPA",
                titulo: "Policarpa Salavarrieta",
                texto: "Policarpa Salavarrieta fue una mujer que apoyó la causa independentista mediante labores de información y colaboración con los patriotas. Fue ejecutada en 1817."
            },
            {
                nombre: "LLANEROS",
                titulo: "Los llaneros",
                texto: "Los llaneros participaron en las campañas militares de independencia. Su conocimiento del territorio y sus habilidades a caballo fueron importantes para las tropas patriotas."
            }
        ]
    },

    "gran-colombia": {
        nombre: "La Gran Colombia",
        palabras: [
            {
                nombre: "BOLIVAR",
                titulo: "Simón Bolívar",
                texto: "Simón Bolívar fue una figura central en la creación de la Gran Colombia. Defendió la unión política de varios territorios liberados del dominio español."
            },
            {
                nombre: "SUCRE",
                titulo: "Antonio José de Sucre",
                texto: "Antonio José de Sucre fue uno de los principales colaboradores militares de Bolívar y participó en la vida política de los territorios que formaron la Gran Colombia."
            },
            {
                nombre: "ECUADOR",
                titulo: "Ecuador",
                texto: "El territorio del actual Ecuador formó parte de la Gran Colombia. Se incorporó a la república después de las campañas de independencia."
            },
            {
                nombre: "VENEZUELA",
                titulo: "Venezuela",
                texto: "Venezuela fue uno de los territorios que integraron la Gran Colombia desde su creación."
            },
            {
                nombre: "PANAMA",
                titulo: "Panamá",
                texto: "El territorio del actual Panamá formó parte de la Gran Colombia después de independizarse de España en 1821."
            },
            {
                nombre: "CUCUTA",
                titulo: "El Congreso de Cúcuta",
                texto: "El Congreso de Cúcuta de 1821 organizó políticamente la nueva república y aprobó su primera Constitución."
            },
            {
                nombre: "ANGOSTURA",
                titulo: "El Congreso de Angostura",
                texto: "El Congreso de Angostura se reunió en 1819 y fue fundamental para impulsar la creación de una república que uniera varios territorios."
            },
            {
                nombre: "REPUBLICA",
                titulo: "La república",
                texto: "La Gran Colombia fue una república que reunió territorios de los actuales Colombia, Venezuela, Ecuador y Panamá. Existió entre 1819 y 1831."
            }
        ]
    },

    "contemporanea": {
        nombre: "Colombia contemporánea",
        palabras: [
            {
                nombre: "COLOMBIA",
                titulo: "Colombia",
                texto: "Colombia es un país sudamericano con una gran diversidad geográfica, cultural y natural. Su historia contemporánea está marcada por transformaciones políticas y sociales."
            },
            {
                nombre: "BOGOTA",
                titulo: "Bogotá",
                texto: "Bogotá es la capital de Colombia. Es el principal centro político y administrativo del país."
            },
            {
                nombre: "CULTURA",
                titulo: "La cultura colombiana",
                texto: "La cultura colombiana reúne tradiciones indígenas, africanas y europeas, además de expresiones regionales propias en la música, la gastronomía y las artes."
            },
            {
                nombre: "DEMOCRACIA",
                titulo: "La democracia",
                texto: "La democracia es una forma de organización política en la que la ciudadanía participa en las decisiones públicas, entre otras formas, mediante el voto."
            },
            {
                nombre: "CAFE",
                titulo: "El café colombiano",
                texto: "El café ha sido uno de los productos más representativos de la economía colombiana y ha influido en la historia de distintas regiones del país."
            },
            {
                nombre: "AMAZONIA",
                titulo: "La Amazonía",
                texto: "La Amazonía colombiana es una región de enorme biodiversidad. Sus comunidades indígenas y sus ecosistemas son fundamentales para el patrimonio natural y cultural del país."
            },
            {
                nombre: "ANDES",
                titulo: "La región Andina",
                texto: "La región Andina atraviesa el territorio colombiano y concentra importantes ciudades, actividades económicas y expresiones culturales."
            },
            {
                nombre: "CARIBE",
                titulo: "La región Caribe",
                texto: "La región Caribe se caracteriza por su diversidad cultural, sus costas y sus tradiciones musicales, gastronómicas y festivas."
            },
            {
                nombre: "PAZ",
                titulo: "La construcción de paz",
                texto: "La construcción de paz es uno de los grandes desafíos de la Colombia contemporánea. Incluye procesos de diálogo, reconciliación y búsqueda de soluciones a los conflictos."
            }
        ]
    }

};

// ==========================================
// 4. VARIABLES DEL JUEGO
// ==========================================

let periodoActual = "independencia";

/** @type {PalabraHistorica[]} */
let palabras = [];

/** @type {string[][]} */
let tablero = [];

/** @type {PalabraEncontrada[]} */
let palabrasEncontradas = [];

/** @type {{fila: number, columna: number} | null} */
let inicioSeleccion = null;

/** @type {HTMLElement[]} */
let celdasSeleccionadas = [];

let seleccionActiva = false;
let contextoActual = null;
let juegoCompletado = false;

// ==========================================
// 5. OBTENER PERIODO DE LA URL
// ==========================================

/**
 * @returns {string | null}
 */
function obtenerPeriodo() {

    const parametros = new URLSearchParams(
        window.location.search
    );

    return parametros.get("periodo");
}

// ==========================================
// 6. MEZCLAR ELEMENTOS ALEATORIAMENTE
// ==========================================

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function mezclarArray(array) {

    const resultado = [...array];

    for (let i = resultado.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [resultado[i], resultado[j]] =
            [resultado[j], resultado[i]];
    }

    return resultado;
}

// ==========================================
// 7. MOSTRAR NOMBRE DEL PERIODO
// ==========================================

function mostrarPeriodo() {

    const periodo = periodos[periodoActual];

    const nombre =
        document.getElementById("nombrePeriodo");

    if (nombre && periodo) {
        nombre.textContent = periodo.nombre;
    }

    document.title =
        "Sopa de letras - " + periodo.nombre;
}

// ==========================================
// 8. SELECCIONAR PALABRAS ALEATORIAS
// ==========================================

function seleccionarPalabras() {

    const banco = periodos[periodoActual].palabras;

    palabras = mezclarArray(banco)
        .slice(0, CANTIDAD_PALABRAS);
}

// ==========================================
// 9. CREAR TABLERO VACIO
// ==========================================

function crearTablero() {

    tablero = [];

    for (let fila = 0; fila < TAMANO; fila++) {

        tablero.push(
            Array(TAMANO).fill("")
        );
    }
}

// ==========================================
// 10. COLOCAR UNA PALABRA
// ==========================================

/**
 * @param {string} palabra
 * @returns {boolean}
 */
function colocarPalabra(palabra) {

    const direcciones = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    for (let intento = 0; intento < 500; intento++) {

        const direccion =
            direcciones[
                Math.floor(Math.random() * direcciones.length)
            ];

        const fila = Math.floor(Math.random() * TAMANO);
        const columna = Math.floor(Math.random() * TAMANO);

        const finalFila =
            fila + (palabra.length - 1) * direccion[0];

        const finalColumna =
            columna + (palabra.length - 1) * direccion[1];

        if (
            finalFila < 0 ||
            finalFila >= TAMANO ||
            finalColumna < 0 ||
            finalColumna >= TAMANO
        ) {
            continue;
        }

        let disponible = true;

        for (let i = 0; i < palabra.length; i++) {

            const letra =
                tablero[
                    fila + i * direccion[0]
                ][
                    columna + i * direccion[1]
                ];

            if (letra !== "" && letra !== palabra[i]) {
                disponible = false;
                break;
            }
        }

        if (!disponible) continue;

        for (let i = 0; i < palabra.length; i++) {

            tablero[
                fila + i * direccion[0]
            ][
                columna + i * direccion[1]
            ] = palabra[i];
        }

        return true;
    }

    return false;
}

// ==========================================
// 11. RELLENAR ESPACIOS VACIOS
// ==========================================

function rellenarTablero() {

    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    for (let fila = 0; fila < TAMANO; fila++) {

        for (let columna = 0; columna < TAMANO; columna++) {

            if (tablero[fila][columna] === "") {

                const indice =
                    Math.floor(Math.random() * letras.length);

                tablero[fila][columna] = letras[indice];
            }
        }
    }
}

// ==========================================
// 12. GENERAR UNA PARTIDA
// ==========================================

function generarPartida() {

    let generado = false;

    for (let intento = 0; intento < 30; intento++) {

        crearTablero();

        generado = palabras.every(palabra =>
            colocarPalabra(palabra.nombre)
        );

        if (generado) break;
    }

    if (!generado) {

        console.error("No se pudo generar el tablero.");

        return;
    }

    rellenarTablero();

    mostrarPalabras();
    mostrarTablero();
    actualizarProgreso();
}

// ==========================================
// 13. MOSTRAR LISTA DE PALABRAS
// ==========================================

function mostrarPalabras() {

    const contenedor =
        document.getElementById("listaPalabras");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    palabras.forEach(palabra => {

        const elemento = document.createElement("p");

        elemento.textContent = "🔎 " + palabra.nombre;
        elemento.dataset.palabra = palabra.nombre;

        contenedor.appendChild(elemento);
    });
}

// ==========================================
// 14. ACTUALIZAR PROGRESO
// ==========================================

function actualizarProgreso() {

    const contador =
        document.getElementById("contadorProgreso");

    const relleno =
        document.getElementById("rellenoProgreso");

    if (!contador || !relleno) return;

    const total = palabras.length;
    const encontradas = palabrasEncontradas.length;

    const porcentaje =
        total === 0 ? 0 : (encontradas / total) * 100;

    contador.textContent =
        encontradas + "/" + total;

    relleno.style.width =
        porcentaje + "%";
}

// ==========================================
// 15. MOSTRAR TABLERO
// ==========================================

function mostrarTablero() {

    const contenedor =
        document.getElementById("tableroSopa");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    tablero.forEach((fila, indiceFila) => {

        const filaElemento =
            document.createElement("div");

        fila.forEach((letra, indiceColumna) => {

            const celda =
                document.createElement("span");

            celda.textContent = letra;

            celda.dataset.fila =
                String(indiceFila);

            celda.dataset.columna =
                String(indiceColumna);

            celda.style.width = "30px";
            celda.style.height = "34px";
            celda.style.display = "flex";
            celda.style.alignItems = "center";
            celda.style.justifyContent = "center";
            celda.style.border = "1px solid #cbd5e1";
            celda.style.background = "white";
            celda.style.fontWeight = "bold";
            celda.style.userSelect = "none";
            celda.style.cursor = "pointer";

            filaElemento.appendChild(celda);
        });

        contenedor.appendChild(filaElemento);
    });

    contenedor.style.touchAction = "none";
}

// ==========================================
// 16. OBTENER CELDA SELECCIONADA
// ==========================================

/**
 * @param {number} x
 * @param {number} y
 * @returns {HTMLElement | null}
 */
function obtenerCelda(x, y) {

    const elemento =
        document.elementFromPoint(x, y);

    if (!(elemento instanceof HTMLElement)) {
        return null;
    }

    if (
        !elemento.hasAttribute("data-fila") ||
        !elemento.hasAttribute("data-columna")
    ) {
        return null;
    }

    return elemento;
}

// ==========================================
// 17. DIBUJAR SELECCION
// ==========================================

/**
 * @param {number} filaFinal
 * @param {number} columnaFinal
 */
function actualizarSeleccion(filaFinal, columnaFinal) {

    if (!inicioSeleccion) return;

    limpiarSeleccion();

    const diferenciaFila =
        filaFinal - inicioSeleccion.fila;

    const diferenciaColumna =
        columnaFinal - inicioSeleccion.columna;

    if (
        diferenciaFila !== 0 &&
        diferenciaColumna !== 0
    ) {
        return;
    }

    const pasos = Math.max(
        Math.abs(diferenciaFila),
        Math.abs(diferenciaColumna)
    );

    const direccionFila =
        Math.sign(diferenciaFila);

    const direccionColumna =
        Math.sign(diferenciaColumna);

    for (let i = 0; i <= pasos; i++) {

        const fila =
            inicioSeleccion.fila + i * direccionFila;

        const columna =
            inicioSeleccion.columna + i * direccionColumna;

        const celda = document.querySelector(
            `[data-fila="${fila}"][data-columna="${columna}"]`
        );

        if (celda instanceof HTMLElement) {

            celda.style.background = "#FACC15";

            celdasSeleccionadas.push(celda);
        }
    }
}

// ==========================================
// 18. LIMPIAR SELECCION
// ==========================================

function limpiarSeleccion() {

    celdasSeleccionadas.forEach(celda => {

        const fila = Number(celda.dataset.fila);
        const columna = Number(celda.dataset.columna);

        const encontrada = palabrasEncontradas.some(palabra =>
            palabra.celdas.some(posicion =>
                posicion.fila === fila &&
                posicion.columna === columna
            )
        );

        celda.style.background =
            encontrada ? "#86EFAC" : "white";
    });

    celdasSeleccionadas = [];
}

// ==========================================
// 19. COMPROBAR PALABRA
// ==========================================

function comprobarPalabra() {

    if (celdasSeleccionadas.length === 0) return;

    const palabraSeleccionada = celdasSeleccionadas
        .map(celda => celda.textContent || "")
        .join("");

    const invertida =
        palabraSeleccionada.split("").reverse().join("");

    const encontrada = palabras.find(item =>
        item.nombre === palabraSeleccionada ||
        item.nombre === invertida
    );

    if (!encontrada) return;

    if (
        palabrasEncontradas.some(
            item => item.nombre === encontrada.nombre
        )
    ) {
        return;
    }

    const posiciones = celdasSeleccionadas.map(celda => ({
        fila: Number(celda.dataset.fila),
        columna: Number(celda.dataset.columna)
    }));

    palabrasEncontradas.push({
        nombre: encontrada.nombre,
        celdas: posiciones
    });

    const elemento = document.querySelector(
        `[data-palabra="${encontrada.nombre}"]`
    );

    if (elemento) {

        elemento.style.textDecoration = "line-through";
        elemento.style.background = "#86EFAC";
        elemento.textContent = "✅ " + encontrada.nombre;
    }

    actualizarProgreso();
    limpiarSeleccion();

    if (palabrasEncontradas.length === palabras.length) {
        juegoCompletado = true;
    }

    mostrarContexto(encontrada.nombre);
}

// ==========================================
// 20. MOSTRAR VENTANA HISTORICA
// ==========================================

/**
 * @param {string} palabra
 */
function mostrarContexto(palabra) {

    const modal =
        document.getElementById("modalContexto");

    const titulo =
        document.getElementById("tituloContexto");

    const texto =
        document.getElementById("textoContexto");

    const btnAprender =
        document.getElementById("btnAprender");

    const btnAhoraNo =
        document.getElementById("btnAhoraNo");

    if (!modal || !titulo || !texto || !btnAprender || !btnAhoraNo) {
        console.error("No se encontró la ventana histórica.");
        return;
    }

    contextoActual = palabra;

    titulo.textContent =
        "¡Encontraste " + palabra + "!";

    texto.textContent =
        "¿Quieres conocer la importancia histórica de esta palabra?";

    btnAprender.textContent =
        "Sí, quiero aprender";

    btnAhoraNo.textContent =
        "Ahora no";

    btnAhoraNo.hidden = false;

    modal.hidden = false;
}

// ==========================================
// 21. MOSTRAR EXPLICACION HISTORICA
// ==========================================

function aprenderHistoria() {

    if (!contextoActual) return;

    const titulo =
        document.getElementById("tituloContexto");

    const texto =
        document.getElementById("textoContexto");

    const btnAprender =
        document.getElementById("btnAprender");

    const btnAhoraNo =
        document.getElementById("btnAhoraNo");

    if (!titulo || !texto || !btnAprender || !btnAhoraNo) return;

    const banco = periodos[periodoActual].palabras;

    const informacion = banco.find(
        item => item.nombre === contextoActual
    );

    if (!informacion) return;

    titulo.textContent = informacion.titulo;
    texto.textContent = informacion.texto;

    btnAprender.textContent = "Cerrar";
    btnAhoraNo.hidden = true;
}

// ==========================================
// 22. CERRAR VENTANA HISTORICA
// ==========================================

function cerrarContexto() {

    const modal =
        document.getElementById("modalContexto");

    if (modal) {
        modal.hidden = true;
    }

    contextoActual = null;

    if (juegoCompletado) {
        mostrarVictoria();
    }
}

// ==========================================
// 23. PANTALLA DE VICTORIA
// ==========================================

function mostrarVictoria() {

    const modal =
        document.getElementById("modalVictoria");

    const resultado =
        document.getElementById("resultadoFinal");

    if (!modal || !resultado) return;

    resultado.textContent =
        palabrasEncontradas.length + "/" + palabras.length;

    modal.hidden = false;
}

// ==========================================
// 24. VOLVER AL PERIODO
// ==========================================

function volverAlPeriodo() {

    window.location.href =
        "periodo.html?periodo=" +
        encodeURIComponent(periodoActual);
}

// ==========================================
// 25. REINICIAR JUEGO
// ==========================================

function reiniciarJuego() {

    const modalVictoria =
        document.getElementById("modalVictoria");

    if (modalVictoria) {
        modalVictoria.hidden = true;
    }

    juegoCompletado = false;
    contextoActual = null;
    inicioSeleccion = null;
    seleccionActiva = false;

    palabrasEncontradas = [];
    celdasSeleccionadas = [];

    seleccionarPalabras();
    generarPartida();
}

// ==========================================
// 26. CONECTAR EVENTOS
// ==========================================

function conectarEventos() {

    const contenedor =
        document.getElementById("tableroSopa");

    if (!contenedor) return;

    contenedor.addEventListener("pointerdown", event => {

        if (juegoCompletado) return;

        const celda =
            obtenerCelda(event.clientX, event.clientY);

        if (!celda) return;

        event.preventDefault();

        seleccionActiva = true;

        inicioSeleccion = {
            fila: Number(celda.dataset.fila),
            columna: Number(celda.dataset.columna)
        };

        celdasSeleccionadas = [];

        actualizarSeleccion(
            inicioSeleccion.fila,
            inicioSeleccion.columna
        );
    });

    document.addEventListener("pointermove", event => {

        if (!seleccionActiva) return;

        const celda =
            obtenerCelda(event.clientX, event.clientY);

        if (!celda) return;

        actualizarSeleccion(
            Number(celda.dataset.fila),
            Number(celda.dataset.columna)
        );
    });

    document.addEventListener("pointerup", () => {

        if (!seleccionActiva) return;

        comprobarPalabra();

        seleccionActiva = false;
        inicioSeleccion = null;

        limpiarSeleccion();
    });

    const btnAprender =
        document.getElementById("btnAprender");

    const btnAhoraNo =
        document.getElementById("btnAhoraNo");

    const btnVolver =
        document.getElementById("btnVolver");

    const btnRepetir =
        document.getElementById("btnRepetir");

    const btnVictoriaInicio =
        document.getElementById("btnVictoriaInicio");

    if (btnAprender) {

        btnAprender.addEventListener("click", () => {

            if (btnAprender.textContent === "Cerrar") {
                cerrarContexto();
            } else {
                aprenderHistoria();
            }
        });
    }

    if (btnAhoraNo) {
        btnAhoraNo.addEventListener(
            "click",
            cerrarContexto
        );
    }

    if (btnVolver) {
        btnVolver.addEventListener(
            "click",
            volverAlPeriodo
        );
    }

    if (btnRepetir) {
        btnRepetir.addEventListener(
            "click",
            reiniciarJuego
        );
    }

    if (btnVictoriaInicio) {
        btnVictoriaInicio.addEventListener(
            "click",
            volverAlPeriodo
        );
    }
}

// ==========================================
// 27. INICIAR APLICACION
// ==========================================

function iniciarSopa() {

    const periodoSolicitado = obtenerPeriodo();

    if (
        periodoSolicitado &&
        Object.prototype.hasOwnProperty.call(
            periodos,
            periodoSolicitado
        )
    ) {
        periodoActual = periodoSolicitado;
    }

    mostrarPeriodo();

    palabrasEncontradas = [];

    seleccionarPalabras();
    generarPartida();

    conectarEventos();

    console.log(
        "Sopa de letras iniciada:",
        periodos[periodoActual].nombre
    );
}

// ==========================================
// 28. ARRANQUE
// ==========================================

iniciarSopa();




