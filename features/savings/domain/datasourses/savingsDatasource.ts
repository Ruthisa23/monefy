import Saving from "../entities/savings";
import SavingsResult from "../entities/savingsResult";

abstract class SavingsDatasource {   
    // tendra una funcion para leer las categorias por numero de pagina, y retonarlos
    abstract getSavings() : Promise<SavingsResult>;
    abstract addSaving(saving: Saving): Promise<Saving>;
    abstract deleteSaving(id:any): Promise<Saving>;
}
export default SavingsDatasource;