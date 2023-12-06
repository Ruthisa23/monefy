import SavingsDatasource from "../../domain/datasourses/incomesDatasource";
import CategorysResult from "../../domain/entities/categoryResult";
import Saving from "../../domain/entities/incomes";
import SavingsResult from "../../domain/entities/incomesResult";
import UsersResult from "../../domain/entities/usersResult";
import SavingsRepository from "../../domain/repositorio/incomesRepository";

class SavingsRepositoryImp extends SavingsRepository {

    datasource: SavingsDatasource;

    constructor(datasource: SavingsDatasource) {
        super();
        this.datasource = datasource;
    }

    deleteSaving(id: any): Promise<Saving> {
        return this.datasource.deleteSaving(id);
    }

    addSaving(saving: Saving): Promise<Saving>{
        return this.datasource.addSaving(saving);
    }

    getSavings(): Promise<SavingsResult> {
        return this.datasource.getSavings();
    }

    getUsers(): Promise<UsersResult> {
        return this.datasource.getUsers();
    }

    getCategorys(): Promise<CategorysResult> {
        return this.datasource.getCategorys();
    }

}
export default SavingsRepositoryImp;