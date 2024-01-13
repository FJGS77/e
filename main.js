const impGanancias = 0.30;
const bienesPersonales = 0.00;
const impPais = 0.30;
const iva21 = 0.21;
const iva105 = 0.105;
const iva27 = 0.27;

const defaultConfig = {
    impGanancias: 0.30,
    bienesPersonales: 0.00,
    impPais: 0.30,
    iva21: 0.21,
    iva105: 0.105,
    iva27: 0.27
};
const procesadaConfig = localStorage.getItem("appConfig");
if (procesadaConfig) {
    try {
        const usuarioConfig = JSON.parse(procesadaConfig);
        const ambasConfig = { ...defaultConfig, ...usuarioConfig };
        const { impGanancias, bienesPersonales, impPais, iva21, iva105, iva27 } = ambasConfig;
    } catch (error) {
        console.error("Error", error);
    }
} else {
    console.error("Configuración no encontrada");
}
const guardarConfig = () => {
    const usuarioConfig = {
        impGanancias,
        bienesPersonales,
        impPais,
        iva21,
        iva105,
        iva27
    };
    localStorage.setItem("appConfig", JSON.stringify(usuarioConfig));
};
guardarConfig();

const boton1 = document.getElementById("btn1");
const boton2 = document.getElementById("btn2");
const boton3 = document.getElementById("btn3");
const contenedor = document.getElementById("contenedor");

boton1.addEventListener("click", function () {
    let h2 = document.getElementById("descripcion");
    h2.textContent = "Calculadora";
    asignarCalculadora(1);
});
boton2.addEventListener("click", function () {
    let h2 = document.getElementById("descripcion");
    h2.textContent = "Calculadora de impuestos ARGENTINOS";
    asignarCalculadora(2);
});
boton3.addEventListener("click", function () {
    let h2 = document.getElementById("descripcion");
    h2.textContent = "Impuestos de los servicios más populares";
    asignarCalculadora(3);
});

function asignarCalculadora(opcion) {
    if (opcion === 1) {
        contenedor.innerHTML = "";
        crearCalculadora(contenedor);
        contenedor.style.backgroundColor = "rgba(15, 1, 66, 0.795)";
        contenedor.style.display = "grid";
        contenedor.style.gridTemplateColumns = "repeat(4, 1fr)";
        contenedor.style.width = "35%";
        contenedor.style.maxWidth = "100%";
        contenedor.style.padding = "1.5rem";
        contenedor.style.borderRadius = "1rem";
        contenedor.style.gap = "0.25rem";

        function crearCalculadora(contenedor) {
            let pantalla = document.createElement("input");
            pantalla.type = "text";
            pantalla.id = "pantalla";
            pantalla.value = "0";
            pantalla.readOnly = true;
            contenedor.appendChild(pantalla);
            const botones = [
                { id: "limpiar", class: "botones", label: "C" },
                { id: "borrar", class: "botones", label: "DEL" },
                { id: "division", class: "botones", label: "/" },
                { id: "multiplicacion", class: "botones", label: "*" },
                { id: "uno", class: "botones", label: "1" },
                { id: "dos", class: "botones", label: "2" },
                { id: "tres", class: "botones", label: "3" },
                { id: "menos", class: "botones", label: "-" },
                { id: "cuatro", class: "botones", label: "4" },
                { id: "cinco", class: "botones", label: "5" },
                { id: "seis", class: "botones", label: "6" },
                { id: "mas", class: "botones", label: "+" },
                { id: "siete", class: "botones", label: "7" },
                { id: "ocho", class: "botones", label: "8" },
                { id: "nueve", class: "botones", label: "9" },
                { id: "igual", class: "botones", label: "=" },
                { id: "cero", class: "botones", label: "0" },
                { id: "punto", class: "botones", label: "." },
            ];
            botones.forEach((botonInfo) => {
                const boton = document.createElement("button");
                boton.id = botonInfo.id;
                boton.className = botonInfo.class;
                boton.textContent = botonInfo.label;
                boton.addEventListener("click", () => {
                    cliquearBoton(botonInfo.label);
                });
                contenedor.appendChild(boton);
            });
        }

        function cliquearBoton(valor) {
            let contenido = pantalla.value;
            switch (valor) {
                case "=":
                    try {
                        pantalla.value = eval(contenido);
                    } catch (error) {
                        pantalla.value = "Error";
                    }
                    return;
                case "C":
                    pantalla.value = "0";
                    return;
                case "DEL":
                    if (pantalla.value === "Error") {
                        pantalla.value = "0";
                    } else {
                        pantalla.value = contenido.slice(0, -1);
                        if (pantalla.value === "") {
                            pantalla.value = "0";
                        }
                    }
                    return;
                default:
                    if (contenido === "0" && /[0-9]/.test(valor) || pantalla.value === "Error") {
                        contenido = valor;
                    } else {
                        contenido += valor;
                    }
                    pantalla.value = contenido;
                    return;
            }
        }
    } else if (opcion === 2) {
        contenedor.innerHTML = "";

        contenedor.style.backgroundColor = "rgba(15, 1, 66, 0.795)";
        contenedor.style.display = "grid";
        contenedor.style.gridTemplateColumns = "repeat(2, 1fr)";
        contenedor.style.width = "50%";
        contenedor.style.padding = "1.5rem";
        contenedor.style.borderRadius = "1rem";
        contenedor.style.gap = "1rem";

        const importe = document.createElement("input");
        importe.type = "number";
        importe.id = "numero";
        importe.placeholder = "Ingrese el monto";
        contenedor.appendChild(importe);
        importe.addEventListener("input", function () {
            localStorage.setItem("userImporte", importe.value);
            calcularImpuestos();
        });
        const importeGuardado = localStorage.getItem("userImporte");
        if (importeGuardado) {
            importe.value = importeGuardado;
        }
        function calcularImpuestos() {
            const importe = parseFloat(document.getElementById("numero").value);

            function calcularImpGanancias(importe, impGanancias) {
                let resultado = importe * impGanancias;
                return resultado.toFixed(2);
            }
            function calcularBsPersonales(importe, bienesPersonales) {
                let resultado = importe * bienesPersonales;
                return resultado.toFixed(2);
            }
            function calcularImpPais(importe, impPais) {
                let resultado = importe * impPais;
                return resultado.toFixed(2);
            }
            function calcularIva21(importe, iva21) {
                let resultado = importe * iva21;
                return resultado.toFixed(2);
            }
            function calcularIva105(importe, iva105) {
                let resultado = importe * iva105;
                return resultado.toFixed(2);
            }
            function calcularIva27(importe, iva27) {
                let resultado = importe * iva27;
                return resultado.toFixed(2);
            }

            let resultadoImpGanancias = calcularImpGanancias(importe, impGanancias);
            let resultadoBsPersonales = calcularBsPersonales(importe, bienesPersonales);
            let resultadoImpPais = calcularImpPais(importe, impPais);
            let resultadoImpIva21 = calcularIva21(importe, iva21);
            let resultadoImpIva105 = calcularIva105(importe, iva105);
            let resultadoImpIva27 = calcularIva27(importe, iva27);

            mostrarResultado("Impuesto a las Ganancias (30%)", resultadoImpGanancias);
            mostrarResultado("IVA al 10.5%", resultadoImpIva105);
            mostrarResultado("Impuesto País (30%)", resultadoImpPais);
            mostrarResultado("IVA al 21%", resultadoImpIva21);
            mostrarResultado("Bienes Personales (0%)", resultadoBsPersonales);
            mostrarResultado("IVA al 27%", resultadoImpIva27);

            function mostrarResultado(nombreImpuesto, resultado) {
                let resultadoParrafo = document.getElementById(`resultado${nombreImpuesto.replace(/\s/g, "")}`);
                if (!resultadoParrafo) {
                    resultadoParrafo = document.createElement("p");
                    resultadoParrafo.id = `resultado${nombreImpuesto.replace(/\s/g, "")}`;
                    contenedor.appendChild(resultadoParrafo);
                }
                resultadoParrafo.innerText = `${nombreImpuesto}: $${resultado}`;
                resultadoParrafo.style.fontSize = "1.10rem";
            }
        }
    } else if (opcion === 3) {
        contenedor.innerHTML = "";

        contenedor.style.backgroundColor = "rgba(15, 1, 66, 0.795)";
        contenedor.style.display = "grid";
        contenedor.style.gridTemplateColumns = "100%";
        contenedor.style.width = "50%";
        contenedor.style.padding = "1.5rem";
        contenedor.style.borderRadius = "1rem";
        contenedor.style.gap = "1rem";

        const servicios = {
            "Netflix": [
                { id: "Netflix", tipo: "Básico", precio: 2499.00 },
                { id: "Netflix", tipo: "Estándar", precio: 4199.00 },
                { id: "Netflix", tipo: "Premium", precio: 5799.00 }
            ],
            "Amazon Prime Video": [
                { id: "Amazon Prime Video", tipo: "Estándar", precio: 1599.00 }
            ],
            "Spotify": [
                { id: "Spotify", tipo: "Individual", precio: 599.00 },
                { id: "Spotify", tipo: "Dúo", precio: 799.00 },
                { id: "Spotify", tipo: "Familiar", precio: 999.00 },
                { id: "Spotify", tipo: "Premium p/ estudiantes", precio: 329.00 }
            ],
            "HBO MAX": [
                { id: "HBO MAX", tipo: "Estándar", precio: 1590.00 }
            ],
            "Youtube": [
                { id: "Youtube Premium", tipo: "Individual", precio: 869.00 },
                { id: "Youtube Premium", tipo: "Familiar", precio: 1569.00 }
            ],
            "Paramount+": [
                { id: "Paramount+", tipo: "Estándar", precio: 599.00 }
            ],
            "Disney+ y Star+": [
                { id: "Disney+ y Star+", tipo: "Disney+", precio: 799.00 },
                { id: "Disney+ y Star+", tipo: "Star+", precio: 1749.00 },
                { id: "Disney+ y Star+", tipo: "Disney+ y Star+", precio: 1999.00 },
                { id: "Disney+ y Star+", tipo: "Disney+, Star+ y Lionsgate+", precio: 2399.00 }
            ]
        };

        const detallesServicio = document.createElement("div");
        detallesServicio.id = "detallesServicio";
        contenedor.appendChild(detallesServicio);
        const nombresServicios = Object.keys(servicios);
        nombresServicios.forEach(nombre => {
            const servicioBtn = document.createElement("button");
            servicioBtn.textContent = nombre;
            servicioBtn.addEventListener("click", () => {
                mostrarDetalles(servicios[nombre]);
            });
            detallesServicio.appendChild(servicioBtn);
        });

        function mostrarDetalles(planes) {
            detallesServicio.innerHTML = "";

            const titulo = document.createElement("h3");
            titulo.textContent = `${planes[0].id}`;
            const listaPlanes = document.createElement("ul");
            planes.forEach(plan => {
                const elementoLista = document.createElement("li");
                elementoLista.textContent = `+ ${plan.tipo} ⭢ Precio: $${plan.precio.toFixed(2)}`;
                listaPlanes.appendChild(elementoLista);
            });
            detallesServicio.appendChild(titulo);
            detallesServicio.appendChild(listaPlanes);
        }
    }
}