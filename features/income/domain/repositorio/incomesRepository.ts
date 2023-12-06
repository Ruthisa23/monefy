import CategorysResult from "../entities/categoryResult";
import Saving from "../entities/incomes";
import SavingsResult from "../entities/incomesResult";
import UsersResult from "../entities/usersResult";


abstract class SavingsRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getSavings(): Promise<SavingsResult>;
    
    abstract deleteSaving(id:any): Promise<Saving>;
    
    abstract getUsers() : Promise<UsersResult>;
    
    abstract getCategorys() : Promise<CategorysResult>;

}

export default SavingsRepository;