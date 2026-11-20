import { useState } from 'react';
import './App.css';

// 📌 IMPORTACIONES (Default vs Named — Pregunta clásica de test):
// - SIN llaves {}: porque el archivo origen usa 'export default' (solo hay uno por fichero).
import Header from './Header.jsx';
import Resultados from './Resultados';
import Formulario from './Formulario';
import CONFIG from './config/config';

// - CON llaves {}: porque 'mock1' NO se exporta como default (export const mock1 = ...).
//   Si quitas las llaves, falla la importación.
import { mock1 } from './constants/users.js';

function App() {
  // ==========================================================================
  // 1️⃣ DEFINICIÓN DEL ESTADO (Regla del profesor para saber qué va al state)
  // ==========================================================================
  // 📌 EXAMEN: ¿Cómo sé qué meter en el estado?
  // Pregúntate: "Si quisiera pintar esta misma pantalla exacta en otro dispositivo
  // (teniendo ya el JS y el CSS), ¿qué datos necesito?".
  // Respuesta: 1) Lo que ha escrito el usuario, 2) Los resultados en pantalla, 3) Si hay error.

  const [query, setQuery] = useState("");       // String: texto del input de búsqueda.
  const [resultado, setResultado] = useState(null); // 📌 null (no "") porque guardará un ARRAY de usuarios.
  const [error, setError] = useState(null);         // 📌 null porque guardará un OBJETO de error { description }.

  // ==========================================================================
  // 2️⃣ LLAMADA AL SERVIDOR (Reutilización, Async/Await y Try/Catch)
  // ==========================================================================
  // 📌 EXAMEN (Async/Await): 'await' SOLO puede usarse dentro de una función 'async'.
  // 📌 REUTILIZACIÓN: En vez de crear dos funciones distintas para "Buscar" y "Buscar Todos",
  // usamos la misma función diferenciando el comportamiento mediante el parámetro 'param'.
  const callServer = async (param) => {
    console.log("CLICK!");

    // 📌 PATRÓN CONFIG.use_server:
    // Permite apagar el servidor real y usar 'mock1' (datos controlados) para depurar bugs,
    // comprobar qué pasa si falta un campo o trabajar sin red.
    if (CONFIG.use_server) {
      try {
        let queryparams;

        // 📌 FILTRADO EN SERVIDOR VS LOCAL:
        // Nunca nos traemos una base de datos entera para filtrar en local con .filter().
        // Delegamos el filtrado al endpoint del API (/search?q=...) usando 'query' del estado
        // (sin recurrir a document.getElementById).
        if (param === "all") {
          queryparams = "?limit=" + CONFIG.num_items;
        } else {
          queryparams = "/search?q=" + query;
        }

        // 📌 TEMPLATE LITERALS: Obligatorio usar comillas invertidas (` `) para usar ${...}.
        // 📌 DOBLE AWAIT: 1º para esperar la respuesta HTTP (fetch), 2º para parsear el cuerpo (.json()).
        const response = await fetch(`${CONFIG.server_url}${queryparams}`);

        // 💡 AMPLIACIÓN DE EXAMEN (response.ok):
        // OJO: try/catch SOLO captura fallos de red/timeout (ej. modo avión).
        // Un error HTTP 400, 404 o 500 NO salta al catch automáticamente.
        // Para controlarlos también, en examen suele pedirse:
        // if (!response.ok) { throw new Error(`Error HTTP ${response.status}`); }

        const data = await response.json();
        console.log(data);

        // ⚠️ TRAMPA DE API: 'data' (igual que 'mock1') es un OBJETO { users: [...], total, skip, limit }.
        // Hay que guardar 'data.users' (el ARRAY), NO 'data' entero, porque <Resultados /> hará .map().
        // Si guardas 'data' entero -> Crash: "props.resultado.map is not a function".
        setResultado(data.users);

        // 📌 LIMPIEZA DE ERROR: Si antes hubo un error y ahora la petición funciona,
        // hay que poner error a null para que desaparezca el aviso de la pantalla.
        setError(null);

      } catch (err) {
        console.log(err);
        // Guardamos el error en el estado para poder avisar al usuario en la interfaz (no solo en consola).
        setError({ description: err.message });
      }

    } else {
      // Modo Mock (use_server: false): cargamos el array .users del fichero local
      setResultado(mock1.users);
      setError(null);
    }
  };

  return (
    <div className='App'>
      <Header />

      {/* ⚠️ Corregido: sin espacio al final del id ("buscador", no "buscador ") para no romper tests */}
      <h2 id="buscador">Buscador de usuarios</h2>

      {/* ====================================================================
          3️⃣ FLUJO DE DATOS UNIDIRECCIONAL (Concepto estrella de la asignatura)
          ====================================================================
          📌 EXAMEN: "En React, los DATOS fluyen hacia ABAJO (por props) y los
          EVENTOS/ACCIONES fluyen hacia ARRIBA (llamando a funciones pasadas por props)".
          Como en JS las funciones son objetos, podemos pasar 'setQuery' y 'callServer'
          como si fueran simples props hacia el componente hijo <Formulario />. */}
      <Formulario
        contenido={query}        // ⬇️ Dato baja al hijo (puedes renombrar la prop como quieras)
        setContenido={setQuery}  // ⬆️ Callback para que el hijo avise de cambios en el input
        callServer={callServer}  // ⬆️ Callback para que el hijo dispare la búsqueda al padre
      />

      {/* 📌 EVENTOS CON PARÁMETROS:
          Se envuelve en arrow function () => callServer("all").
          Si pusieras onClick={callServer("all")} se ejecutaría sola al pintar la página. */}
      <button id="botonall" onClick={() => callServer("all")}>
        Buscar Todos
      </button>

      {/* ====================================================================
          4️⃣ RENDERIZADO CONDICIONAL CON CORTOCIRCUITO (&&)
          ====================================================================
          📌 EXAMEN: Si 'error' es null (falsy), React no pinta nada. Si es un objeto (truthy), pinta el aviso.
          (En producción suele extraerse a un componente hijo <Error error={error} />). */}
      {error && <h1>Ha habido un error: {error.description}</h1>}

      {/* 📌 SALVAGUARDA CONTRA NULL:
          Al arrancar la app, 'resultado' vale null (nadie ha pulsado buscar todavía).
          Sin 'resultado &&', <Resultados /> se pintaría inmediatamente y crashearía al hacer
          props.resultado.map(...) -> "Cannot read properties of null (reading 'map')".
          Alternativa con ternario: {resultado ? <Resultados resultado={resultado} /> : <p>Sin resultados</p>} */}
      {resultado && <Resultados resultado={resultado} />}
    </div>
  );
}

export default App;