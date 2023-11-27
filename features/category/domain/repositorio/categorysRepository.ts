import Category from "../entities/categorys";
import CategorysResult from "../entities/categorysResult";


abstract class CategorysRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getCategorys(): Promise<CategorysResult>;
    
    abstract deleteCategory(id:any): Promise<Category>;

}

export default CategorysRepository;