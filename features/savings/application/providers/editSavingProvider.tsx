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

function EditSavingReducer(
  state: EditSavingState, 
  action: EditSavingActionType
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
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const EditSavingProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EditSavingReducer, initialState);

  function setSavingProp(property: string, value: any) {
    // mandar el valor al estado user
    dispatch({
      type: 'Set Saving',
      payload: {
        ...state.saving,
        [property]: value,
      }
    });
  }

  async function saveSaving(onSaved: Function) {
    const savingsRepository = new SavingsRepositoryImp(
      new SavingsDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saved',
      payload: true,
    });


    //si ya me mando, cerrar el modal
    const savedSaving = await savingsRepository.addSaving(state.saving);
    console.log(savedSaving);
    dispatch({
      type: 'Set Saved',
      payload: false,
    });

    onSaved(state.saving);
    return;
    
  }

    

  function setSaving(saving: Saving){
    dispatch({
        type: 'Set Saving',
        payload: saving
      });

      

  }

  return (
    <EditSavingContext.Provider value={{
        ...state,
        //funciones
        setSavingProp,
        saveSaving,
        setSaving,
      }}
    >
      {children}
    </EditSavingContext.Provider>
  );
}

function useEditSavingState() {
  const context = useContext(EditSavingContext);
  if (context === undefined) {
    throw new Error("useEditSavingState debe ser usado " + " con un useEditSavingState");
  }
  return context;
}

export { EditSavingProvider, useEditSavingState };