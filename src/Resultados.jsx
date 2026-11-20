// 📌 EXAMEN (Componente Presentacional de Lista):
// Recibe por props 'props.resultado', que es el ARRAY de usuarios (data.users o mock1.users).
// ⚠️ PELIGRO DE CRASH: Si este componente se pintara cuando 'resultado' vale null (al arrancar la app),
// explotaría en la línea del .map() con: "TypeError: Cannot read properties of null (reading 'map')".
// Aquí NO crashea porque App.jsx lo protege con renderizado condicional: {resultado && <Resultados ... />}
export default function Resultados(props) {
  return (
    <div>
      {/* 📌 ID de contenedor: revisa siempre en el enunciado si el test busca id="resultado" o id="resultados" */}
      <ul id="resultado">
        {/* 📌 EXAMEN (Renderizado de listas con .map()):
            1. Abrimos llaves {} para meter código JavaScript dentro del JSX.
            2. .map() recorre el array y transforma cada objeto usuario ('item') en un elemento <li>.
            3. Como usamos llaves en la arrow function (item => { ... }), es OBLIGATORIO poner 'return'.
               (Si usaras paréntesis item => (<li>...</li>), el return sería implícito). */}
        {props.resultado.map((item) => {
          return (
            // 📌 EXAMEN (Prop obligatoria 'key' — Virtual DOM):
            // Todo elemento raíz devuelto dentro de un .map() DEBE tener una 'key' única entre hermanos
            // para que el Virtual DOM de React optimice qué elementos cambian, se añaden o se borran.
            // - Mejor opción: un ID único del dato (key={item.id}).
            // - Último recurso (si no hay ID): usar el índice -> .map((item, index) => <li key={index}>...)
            <li key={item.id}>
              {/* Accedemos a las propiedades exactas del objeto JSON que devuelve el API */}
              <p>
                Nombre: <b>{item.firstName}</b> {item.lastName}
              </p>
              <p>Email: {item.email}</p>
              <p>
                {/* ✅ CORREGIDO: En atributos JSX, para mezclar texto y variables JS se usan llaves + backticks (` `).
                    Si pones "{item.firstName}" dentro de comillas dobles, NO se evalúa como JS. */}
                <img
                  src={item.image}
                  alt={`imagen del usuario ${item.firstName}`}
                />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}