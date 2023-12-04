import categorysDatasource from "../datasourses/savingsDatasource";

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