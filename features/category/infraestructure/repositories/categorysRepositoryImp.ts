import CategorysDatasource from "../../domain/datasourses/categorysDatasource";
import CategorysResult from "../../domain/entities/categorysResult";
import CategorysRepository from "../../domain/repositorio/categorysRepository";

class CategorysRepositoryImp extends CategorysRepository {

    datasource: CategorysDatasource;

    constructor(datasource: CategorysDatasource) {
        super();
        this.datasource = datasource;
    }

    getCategorys(): Promise<CategorysResult> {
        return this.datasource.getCategorys();
    }
}
export default CategorysRepositoryImp;