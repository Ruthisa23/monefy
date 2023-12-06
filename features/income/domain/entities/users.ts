import categorysDatasource from "../datasourses/incomesDatasource";

class User {
    
   
    name: string;
    id?: number;

    constructor(
        
        name: string,
        id?: number,

    ) {
        
        this.name = name;
        this.id = id;
    }
}
export default User;