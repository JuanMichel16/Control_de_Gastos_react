import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
            const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

            const totalDisponible = presupuesto - totalGastado;

            const nuevoPorcentaje = ( (presupuesto - totalDisponible) / presupuesto ) * 100;

            setDisponible(totalDisponible)
            setGastado(totalGastado);

            setTimeout(() => {
                setPorcentaje(nuevoPorcentaje);
            }, 1000)
    }, [gastos])

    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const confirmar = confirm("Estas seguro que deseas resetear la app?");

        if(confirmar) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                    styles={buildStyles({
                        textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
                        pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
                        trailColor: '#f5f5f5'
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    onClick={handleResetApp}
                    >
                        Resetear app
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearPresupuesto(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible:</span> {formatearPresupuesto(disponible)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    );
}
 
export default ControlPresupuesto;