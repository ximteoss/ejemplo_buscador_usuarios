// 📌 EXAMEN (Componente Presentacional / Sin Estado):
// Fíjate en que Formulario NO tiene ningún useState propio.
// Todo su estado vive en el padre (App.jsx -> "Lifting State Up").
// Recibe los datos hacia abajo (props.contenido) y sube los eventos hacia arriba
// ejecutando las funciones que el padre le prestó (props.setContenido y props.callServer).
export default function Formulario(props) {
  return (
    // 📌 Regla del único nodo raíz: el <input> y el <button> van envueltos en un <div> (o <>...</>)
    <div>
      {/* 📌 COMPONENTE CONTROLADO (Input):
          1. 'value' atado a la prop que viene del estado del padre (props.contenido).
          2. 'onChange' captura cada tecla (e.target.value) y sube el evento al padre (props.setContenido). */}
      <input
        type="text"
        id="query"
        value={props.contenido}
        onChange={(e) => props.setContenido(e.target.value)}
        placeholder="Texto a buscar"
      />

      {/* 📌 Al pulsar, avisa al padre llamando a props.callServer() SIN parámetro
          (por lo que en App.jsx entrará en el 'else' y hará /search?q=...). */}
      <button id="botonsearch" onClick={() => props.callServer()}>
        Buscar
      </button>
    </div>
  );
}