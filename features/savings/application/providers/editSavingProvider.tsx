import { FC, ReactNode, createContext, useContext, useReducer } from "react";

import Saving from "../../domain/entities/savings";
import SavingsRepositoryImp from "../../infraestructure/repositories/savingsRepositoryImp";
import SavingsDatasourceImp from "../../infraestructure/datasources/savingsDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saved: boolean,
  message?: string,
  saving: Saving,
  

  // acciones que tendrá mi context
  setSavingProp: (property: string, value: any) => void,
  saveSaving: (onSaved: Function) => void,
  setSaving: (saving: Saving) => void;
}

//crear el objeto context de react
const EditSavingContext = createContext({} as ContextDefinition);

interface EditSavingState {
  //definición del estado
  loading: boolean;
  saved: boolean,
  message?: string,
  saving: Saving,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type EditSavingActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Saved"; payload: boolean }
  | { type: "Set Saving"; payload: Saving };

//inicializar el state
const initialState: EditSavingState = {
  loading: false,
  saved: false,
  message: undefined,
  saving: new Saving(
    '',
    0,
    0,
    0,
    0,
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
    case "Set Saved":
      return {
        ...state,
        saved: action.payload,
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
      type: 'Set Saved',
      payload: true,
    });


    //si ya me mando, cerrar el modal
    const savedCategory = await categorysRepository.addCategory(state.category);
    console.log(savedCategory);
    dispatch({
      type: 'Set Saved',
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