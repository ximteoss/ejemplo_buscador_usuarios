// 📌 EXAMEN (Assets en Vite):
// - Imágenes en 'src/assets/' -> se IMPORTAN como módulo (import sun from './assets/sun.png')
//   y se usan entre llaves: src={sun}.
// - Imágenes en 'public/' -> NO se importan; se usan como string con ruta absoluta: src="/sun.png".
// - Todo fichero que contenga JSX en Vite DEBE tener extensión '.jsx' (no '.js').
import sun from './assets/sun.png';

export default function Header(props) {
  return (
    <div id="cabecera">
      {/* 📌 En JSX es 'className', nunca 'class', y las etiquetas vacías como <img /> deben cerrarse */}
      <img className="logo" src={sun} alt="el logo de la pagina" />
      <h3 className="mensaje">Bienvenido a la pagina de Oscar Bermudez Gonzalez</h3>
    </div>
  );
}