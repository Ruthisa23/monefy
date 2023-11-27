import Category from "../entities/categorys";
import CategorysResult from "../entities/categorysResult";

abstract class CategorysDatasource {
    
    // tendra una funcion para leer las categorias por numero de pagina, y retonarlos
    abstract getCategorys() : Promise<CategorysResult>;
    abstract addCategory(category: Category): Promise<Category>;
    abstract deleteCategory(id:any): Promise<Category>;
}

export default CategorysDatasource;