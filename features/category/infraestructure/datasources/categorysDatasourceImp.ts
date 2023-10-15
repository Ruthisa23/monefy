import CategorysDatasource from "../../domain/datasourses/categorysDatasource";
import Category from "../../domain/entities/categorys";
import CategorysResult from "../../domain/entities/categorysResult";

class CategorysDatasourceImp extends CategorysDatasource {
    async getCategorys(): Promise<CategorysResult> {

        return fetch('http://192.168.8.13:3000/api/category')
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new CategorysResult(
                    []
                )
            }
            const category = response.map((item : any) => new Category(
                item.id,
                item.name
                )
            );
            return new CategorysResult(
                category
            )
        });
    }
}

export default CategorysDatasourceImp;