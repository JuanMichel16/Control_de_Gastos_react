import { useState, useEffect } from 'react';
import Header from './components/Header';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {

  const [ gastos, setGastos ] = useState([]);

  const [ presupuesto, setPresupuesto ] = useState(0);
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);

  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  
  const [ gastoEditar, setGastoEditar ] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0) {
      setModal(true);
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      console.log(gastosFiltrados)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])


  const eliminarGasto = (id) => {
    const nuevoGastos = gastos.filter(gasto => gasto.id !== id);
    setGastos(nuevoGastos);
  } 

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({}); //Al presionar en el signo de nuevo gasto vaciamos el state donde se encuentra el gasto en edicion.

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  return (
    <div className={modal?  "fijar" : ''}>
        <Header
          gastos={gastos}
          setGastos = {setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>


            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
                >
              </img>
            </div>
          </>
        )}

        {modal && <Modal 
                    setModal={setModal} 
                    setAnimarModal={setAnimarModal} 
                    animarModal={animarModal} 
                    setGastos={setGastos} 
                    gastos={gastos} 
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  /> }
    </div>
  )
}

export default App
