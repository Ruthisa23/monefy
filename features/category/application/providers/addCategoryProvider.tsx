import { FC, ReactNode, createContext, useContext, useReducer } from "react";

import Category from "../../domain/entities/categorys";
import CategorysRepositoryImp from "../../infraestructure/repositories/categorysRepositoryImp";
import CategorysDatasourceImp from "../../infraestructure/datasources/categorysDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  message?: string,
  category: Category,

  // acciones que tendrá mi context
  setCategoryProp: (property: string, value: any) => void,
  saveCategory: () => void,
}

//crear el objeto context de react
const AddCategoryContext = createContext({} as ContextDefinition);

interface AddCategoryState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  message?: string,
  category: Category,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type AddCategoryActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Category"; payload: Category };

//inicializar el state
const initialState: AddCategoryState = {
  loading: false,
  saving: false,
  message: undefined,
  category: new Category(
    ''
    ),
};

function AddCategoryReducer(
  state: AddCategoryState, 
  action: AddCategoryActionType
) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      }
    case "Set Category":
      return {
        ...state,
        category: action.payload,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const AddCategoryProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AddCategoryReducer, initialState);

  function setCategoryProp(property: string, value: any) {
    // mandar el valor al estado user
    dispatch({
      type: 'Set Category',
      payload: {
        ...state.category,
        [property]: value,
      }
    });
  }

  async function saveCategory() {
    const categorysRepository = new CategorysRepositoryImp(
      new CategorysDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });
    
    const savedCategory = await categorysRepository.addCategory(state.category);
    console.log(savedCategory);
    dispatch({
      type: 'Set Saving',
      payload: false,
    });
  }

  return (
    <AddCategoryContext.Provider value={{
        ...state,
        //funciones
        setCategoryProp,
        saveCategory,
      }}
    >
      {children}
    </AddCategoryContext.Provider>
  );
}

function useAddCategoryState() {
  const context = useContext(AddCategoryContext);
  if (context === undefined) {
    throw new Error("useAddCategoryState debe ser usado " + " con un useAddCategoryState");
  }
  return context;
}

export { AddCategoryProvider, useAddCategoryState };