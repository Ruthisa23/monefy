import CategorysDatasource from "../../domain/datasourses/categorysDatasource";
import Category from "../../domain/entities/categorys";
import CategorysResult from "../../domain/entities/categorysResult";
import CategorysRepository from "../../domain/repositorio/categorysRepository";

class CategorysRepositoryImp extends CategorysRepository {

    
    datasource: CategorysDatasource;


    constructor(datasource: CategorysDatasource) {
        super();
        this.datasource = datasource;
    }

    // editCategory(category: Category): Promise<Category>{
    //     return this.datasource.editCategory(category);
    // }
   
    deleteCategory(id: any): Promise<Category> {
        return this.datasource.deleteCategory(id);
    }

    addCategory(category: Category): Promise<Category>{
        return this.datasource.addCategory(category);
    }

    getCategorys(): Promise<CategorysResult> {
        return this.datasource.getCategorys();
    }

}
export default CategorysRepositoryImp;