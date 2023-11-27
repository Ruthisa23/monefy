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
  saveCategory: (onSaved: Function) => void,
  setCategory: (category: Category) => void;
}

//crear el objeto context de react
const EditCategoryContext = createContext({} as ContextDefinition);

interface EditCategoryState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  message?: string,
  category: Category,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type EditCategoryActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Category"; payload: Category };

//inicializar el state
const initialState: EditCategoryState = {
  loading: false,
  saving: false,
  message: undefined,
  category: new Category(
    ''
    ),
};

function EditCategoryReducer(
  state: EditCategoryState, 
  action: EditCategoryActionType
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

const EditCategoryProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EditCategoryReducer, initialState);

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

  async function saveCategory(onSaved: Function) {
    const categorysRepository = new CategorysRepositoryImp(
      new CategorysDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });


    //si ya me mando, cerrar el modal
    const savedCategory = await categorysRepository.addCategory(state.category);
    console.log(savedCategory);
    dispatch({
      type: 'Set Saving',
      payload: false,
    });

    onSaved(state.category);
    return;
    
  }

    

  function setCategory(category: Category){
    dispatch({
        type: 'Set Category',
        payload: category
      });

      

  }

  return (
    <EditCategoryContext.Provider value={{
        ...state,
        //funciones
        setCategoryProp,
        saveCategory,
        setCategory,
      }}
    >
      {children}
    </EditCategoryContext.Provider>
  );
}

function useEditCategoryState() {
  const context = useContext(EditCategoryContext);
  if (context === undefined) {
    throw new Error("useEditCategoryState debe ser usado " + " con un useEditCategoryState");
  }
  return context;
}

export { EditCategoryProvider, useEditCategoryState };