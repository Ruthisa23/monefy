import backendConfig from "../../../../config/backend/config";
import CategorysDatasource from "../../domain/datasourses/categorysDatasource";
import Category from "../../domain/entities/categorys";
import CategorysResult from "../../domain/entities/categorysResult";

class CategorysDatasourceImp extends CategorysDatasource {

    deleteCategory(id: any): Promise<Category> {

        
         return fetch (`${backendConfig.url}/api/category?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
         })
         .then((response) => response.json())
         .then((response) => {
            console.log(response);

        return response;

        
            
         })
    }

    addCategory(category: Category): Promise<Category> {
        
        console.log(category);
         return fetch (`${backendConfig.url}/api/category?id=${category.id}`, {
            method: !category.id ? "POST" : "PUT",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
            },
         })
         .then((response) => response.json())
         .then((response) => {
            
        console.log(response);

            return category;
            
         })
    }

    async getCategorys(): Promise<CategorysResult> {

        return fetch(`${backendConfig.url}/api/category`)
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

            if (!response) {
                return new CategorysResult(
                    []
                )
            }
            const category = response.map((item : any) => new Category(
                item.name,
                item.id
                )
            );

            return new CategorysResult(category)
        });
    }

    
}

export default CategorysDatasourceImp;