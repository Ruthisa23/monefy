import CategorysResult from "../entities/categorysResult";

abstract class CategorysDatasource {
    // tendra una funcion para leer las categorias por numero de pagina, y retonarlos
    abstract getCategorys() : Promise<CategorysResult>;
}

export default CategorysDatasource;