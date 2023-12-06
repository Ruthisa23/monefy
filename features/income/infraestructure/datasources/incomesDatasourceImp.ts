import backendConfig from "../../../../config/backend/config";
import SavingsDatasource from "../../domain/datasourses/incomesDatasource";
import Saving from "../../domain/entities/incomes";
import User from "../../domain/entities/users";
import Category from "../../domain/entities/category";
import SavingsResult from "../../domain/entities/incomesResult";
import UsersResult from "../../domain/entities/usersResult";
import CategorysResult from "../../domain/entities/categoryResult";

class SavingsDatasourceImp extends SavingsDatasource {

    async getCategorys(): Promise<CategorysResult> {

        return fetch(`${backendConfig.url}/api/category`)
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new CategorysResult(
                    []
                )
            }
            const user = response.map((item : any) => new Category(
                item.id,
                item.name
                )
            );

            return new CategorysResult(user)
        });
    }

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

        
         return fetch (`${backendConfig.url}/api/income?id=${id}`, {
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
         return fetch (`${backendConfig.url}/api/income?id=${saving.id}`, {
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

        return fetch(`${backendConfig.url}/api/income`)
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
                item.clientId,
                item.id
                )
            );

            return new SavingsResult(saving)
        });
    }
}

export default SavingsDatasourceImp;