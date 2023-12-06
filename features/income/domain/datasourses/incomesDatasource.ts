import CategorysResult from "../entities/categoryResult";
import Saving from "../entities/incomes";
import SavingsResult from "../entities/incomesResult";
import UsersResult from "../entities/usersResult";


abstract class SavingsDatasource {   
    // tendra una funcion para leer las categorias por numero de pagina, y retonarlos
    abstract getSavings() : Promise<SavingsResult>;
    abstract addSaving(saving: Saving): Promise<Saving>;
    abstract deleteSaving(id:any): Promise<Saving>;

    abstract getUsers() : Promise<UsersResult>;
    abstract getCategorys() : Promise<CategorysResult>;

}
export default SavingsDatasource;