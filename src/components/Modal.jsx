import { useState, useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
import { generarId } from "../helpers";


const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    setGastos, 
    gastos, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState("")
    const [ gasto, setGasto] = useState({nombre: "", cantidad: "", categoria: ""});
    const { nombre, cantidad, categoria } = gasto;

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0) {
            setGasto(gastoEditar);
        }
    }, [gastoEditar])
    

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})

        setTimeout(() => {
            setModal(false);
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes("")) {
            setMensaje("Todos los campos son obligatorios");

            setTimeout(() => {
                setMensaje("")
            }, 2000)
            return;
        }

        if(gasto.id) {
            const gastosActualizados = gastos.map( gastoGuardado => gasto.id === gastoGuardado.id ? gasto : gastoGuardado);
            setGastos(gastosActualizados);
            setGastoEditar({})

        } else {
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        ocultarModal();
    }

    return ( 
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="cerrar modal"
                    onClick={ocultarModal}
                    />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal? "animar" : "cerrar"}`}>
                <legend>{ gastoEditar.id? "Editar Gasto" : "Nuevo gasto"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre" 
                        type="text" 
                        placeholder="Añade el nombre del gasto"
                        onChange={(e) => setGasto({...gasto, [e.target.id] : e.target.value})}
                        value={nombre}
                        />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad" 
                        type="number" 
                        placeholder="Cantidad"
                        onChange={(e) => setGasto({...gasto, [e.target.id] : Number(e.target.value)})}
                        value={cantidad}
                        />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setGasto({...gasto, [e.target.id] : e.target.value})}
                        > 
                        <option value=""> -- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={ gastoEditar.id? "Guardar Cambios" : "Añadir Gasto"}
                />
            </form>
        </div>
     );
}
 
export default Modal;