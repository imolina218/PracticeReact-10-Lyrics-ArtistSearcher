import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";

import axios from "axios";

function App() {

  // Definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra , guardarLetra] = useState("");
  const [informacion, guardarInformacion] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {

      const {artista, cancion} = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

      const [letra, informacion] = await  Promise.all([
        axios(url),
        axios(url2)
      ]);

      guardarLetra(letra.data.lyrics);
      guardarInformacion(informacion.data.artists[0]);
    }
    consultarApiLetra();

  }, [busquedaletra, informacion]);

  return (
    <>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
              <Informacion
                informacion={informacion}
              />
          </div>
          <div className="col-md-6">
              <Cancion
                letra={letra}
              />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
