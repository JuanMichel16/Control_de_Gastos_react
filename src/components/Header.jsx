import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos, }) => {
    return ( 
        <header>
            <h1>Planificador de gastos</h1>

            {isValidPresupuesto ? (
                <ControlPresupuesto
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setGastos={setGastos}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                    setPresupuesto={setPresupuesto}
                />

            ): (

                <NuevoPresupuesto 
                    setPresupuesto={setPresupuesto}
                    presupuesto={presupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}

        </header>
     );
}
 
export default Header;