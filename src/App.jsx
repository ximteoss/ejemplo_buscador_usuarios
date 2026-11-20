import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import {mock1} from "./constants/users.js"
import Resultados from "./Resultados"
import CONFIG from "./config/config"

function App() {
  const [query, setQuery] = useState("")

  const[resultado, setResultado] = useState(null);

  const callServer = async (param) => {
    console.log("CLICK!");
    if(CONFIG.use_server){

      try{

        let queryparams;

        if(param=="all"){

          queryparams = "?limit=" + CONFIG.num_items;

        } else {

          queryparams = "/search?q=" + query;

        }
        const response = await fetch(`${CONFIG.server_url}${queryparams}`);
        const data = await response.json();
        console.log(data);
        setResultado(data.users)

      } catch (error) {
        console.log(error)
      }

    } else {
      
      setResultado(mock1.users);
    }
    
  }

  return (
      <div className='App'>
        <Header/>
        <h2 id="buscador ">Buscador de usuarios</h2>
        <input type="text" id="query" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Texto a buscar"/>
        <button id="botonsearch" onClick={()=>callServer()}>Buscar</button>
        <button id="botonall" onClick={()=>callServer("all")}>Buscar Todos</button>

      {resultado && <Resultados resultado={resultado} />}

      </div>
  );
}

export default App
