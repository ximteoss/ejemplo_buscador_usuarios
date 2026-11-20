import sun from './assets/sun.png'

export default function Header(props){
    return (<div id='cabecera'>
            <img className="logo" src={sun} alt='el logo de la pagina'/>
            <h3 className="mensaje"> Bienvenido a la pagina de Oscar Bermudez Gonzalez</h3>
        </div>)
}