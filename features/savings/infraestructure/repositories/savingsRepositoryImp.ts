import SavingsDatasource from "../../domain/datasourses/savingsDatasource";
import Saving from "../../domain/entities/savings";
import SavingsResult from "../../domain/entities/savingsResult";
import SavingsRepository from "../../domain/repositorio/savingsRepository";



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

}
export default SavingsRepositoryImp;