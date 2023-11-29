import Saving from "../entities/savings";
import SavingsResult from "../entities/savingsResult";


abstract class SavingsRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getSavings(): Promise<SavingsResult>;
    
    abstract deleteSaving(id:any): Promise<Saving>;
}

export default SavingsRepository;