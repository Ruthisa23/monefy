import CategorysResult from "../entities/categorysResult";

import Category from "../entities/categorys";


abstract class CategorysRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getCategorys(): Promise<CategorysResult>;
}

export default CategorysRepository;