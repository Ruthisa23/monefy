import backendConfig from "../../../../config/backend/config";
import SavingsDatasource from "../../domain/datasourses/savingsDatasource";
import Saving from "../../domain/entities/savings";
import User from "../../domain/entities/users";
import SavingsResult from "../../domain/entities/savingsResult";
import UsersResult from "../../domain/entities/usersResult";

class SavingsDatasourceImp extends SavingsDatasource {

    async getUsers(): Promise<UsersResult> {

        return fetch(`${backendConfig.url}/api/users`)
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new UsersResult(
                    []
                )
            }
            const user = response.map((item : any) => new User(
                item.id,
                item.name
                )
            );

            return new UsersResult(user)
        });
    }

    deleteSaving(id: any): Promise<Saving> {

        
         return fetch (`${backendConfig.url}/api/savings?id=${id}`, {
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
         return fetch (`${backendConfig.url}/api/savings?id=${saving.id}`, {
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

        return fetch(`${backendConfig.url}/api/savings`)
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new SavingsResult(
                    []
                )
            }
            const saving = response.map((item : any) => new Saving(
                
                item.concepto,
                item.monto,
                item.clientId,
                item.id
                )
            );

            return new SavingsResult(saving)
        });
    }
}

export default SavingsDatasourceImp;