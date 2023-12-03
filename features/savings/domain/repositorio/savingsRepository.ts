import Saving from "../entities/savings";
import SavingsResult from "../entities/savingsResult";
import UsersResult from "../entities/usersResult";


abstract class SavingsRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getSavings(): Promise<SavingsResult>;
    
    abstract deleteSaving(id:any): Promise<Saving>;
    
    abstract getUsers() : Promise<UsersResult>;

}

export default SavingsRepository;