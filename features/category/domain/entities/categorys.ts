import categorysDatasource from "../datasourses/categorysDatasource";

class Category {
    
    id?: number;
    name: string;

    constructor(
        
        name: string,
        id?: number,

    ) {
        this.id = id;
        this.name = name;
    }
}
export default Category;