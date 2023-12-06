import categorysDatasource from "../datasourses/incomesDatasource";

class Saving {
    
    id?: number;
    description: string;
    acount: string;
    balance: string;
    categoryId: number;
    clientId: number;

    constructor(
        
        description: string,
        acount: string,
        balance: string,
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