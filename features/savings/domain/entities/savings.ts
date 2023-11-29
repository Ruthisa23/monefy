import categorysDatasource from "../datasourses/savingsDatasource";

class Saving {
    
    id?: number;
    description: string;
    acount: number;
    balance: number;
    categoryId: number;
    clientId: number;

    constructor(
        
        description: string,
        acount: number,
        balance: number,
        categoryId: number,
        clientId: number,
        id?: number,

    ) {
        this.id = id;
        this.description = description;
        this.acount = acount;
        this.balance = balance;
        this.categoryId = categoryId;
        this.clientId = clientId;
    }
}
export default Saving;