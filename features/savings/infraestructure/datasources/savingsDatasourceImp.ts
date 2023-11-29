import backendConfig from "../../../../config/backend/config";
import SavingsDatasource from "../../domain/datasourses/savingsDatasource";
import Saving from "../../domain/entities/savings";
import SavingsResult from "../../domain/entities/savingsResult";

class SavingsDatasourceImp extends SavingsDatasource {

    deleteSaving(id: any): Promise<Saving> {

        
         return fetch (`${backendConfig.url}/api/saving?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
         })
         .then((response) => response.json())
         .then((response) => {
            console.log(response);

        return response;

        
            
         })
    }

    addSaving(saving: Saving): Promise<Saving> {
        
        console.log(saving);
         return fetch (`${backendConfig.url}/api/category?id=${saving.id}`, {
            method: !saving.id ? "POST" : "PUT",
            body: JSON.stringify(saving),
            headers: {
                "Content-Type": "application/json",
            },
         })
         .then((response) => response.json())
         .then((response) => {
            
        console.log(response);

            return saving;
            
         })
    }

    async getSavings(): Promise<SavingsResult> {

        return fetch(`${backendConfig.url}/api/saving`)
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new SavingsResult(
                    []
                )
            }
            const saving = response.map((item : any) => new Saving(
                item.description,
                item.acount,
                item.balance,
                item.categoryId,
                item.clientId,
                item.id
                )
            );

            return new SavingsResult(saving)
        });
    }

    
}

export default SavingsDatasourceImp;