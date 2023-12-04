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
  saveSaving: () => void,
}

//crear el objeto context de react
const AddSavingContext = createContext({} as ContextDefinition);

interface AddSavingState {
  //definición del estado
  loading: boolean;
  saved: boolean,
  message?: string,
  saving: Saving,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type AddSavingActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Saved"; payload: boolean }
  | { type: "Set Saving"; payload: Saving };

//inicializar el state
const initialState: AddSavingState = {
  loading: false,
  saved: false,
  message: undefined,
  saving: new Saving(
    '',
    0,
    0
    ),
};

function AddSavingReducer(
  state: AddSavingState, 
  action: AddSavingActionType
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

const AddSavingProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AddSavingReducer, initialState);

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

  async function saveSaving() {
    const savingsRepository = new SavingsRepositoryImp(
      new SavingsDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saved',
      payload: true,
    });
    
    const savedSaving = await savingsRepository.addSaving(state.saving);
    console.log(savedSaving);
    dispatch({
      type: 'Set Saved',
      payload: false,
    });
  }

  return (
    <AddSavingContext.Provider value={{
        ...state,
        //funciones
        setSavingProp,
        saveSaving,
      }}
    >
      {children}
    </AddSavingContext.Provider>
  );
}

function useAddSavingState() {
  const context = useContext(AddSavingContext);
  if (context === undefined) {
    throw new Error("useAddSavingState debe ser usado " + " con un useAddSavingState");
  }
  return context;
}

export { AddSavingProvider, useAddSavingState };