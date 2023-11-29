import { FC, ReactNode, createContext, useReducer, useContext} from "react";

import Saving from "../../domain/entities/savings";

import SavingsResult from "../../domain/entities/savingsResult";
import SavingsRepositoryImp from "../../infraestructure/repositories/savingsRepositoryImp";
import SavingsDatasourceImp from "../../infraestructure/datasources/savingsDatasourceImp";

//estructura de context


interface ContextDefinition{

    loading:  boolean,
    savings: Saving[];
    savingSelected: Saving | null;

    getSavings:()=>void;
    setSavingSelected:(saving: Saving | null) => void;
    onUpdateSaving: (saving: Saving) => void;
}

const savingsContext = createContext ( {} as ContextDefinition);


interface SavingsState {
    loading:  boolean,
    savings:Saving[],
    savingSelected: Saving | null;
}

//definir los tipos de acciones que podra ejecutar el context

type SavingsActionType = 
    |  { type: 'Set Loading', payload: boolean}
    |  {type: 'Set Data', payload: SavingsResult}
    |  {type: 'Set Saving Selected', payload:  Saving | null}
    // |  {type: 'Set Category Selected', payload: Category | null } //parte para editar
    
//iniciar el state

const InitialState : SavingsState = {
    
    loading:  false,
    savings: [],
    savingSelected: null,
}

function savingReducer(
    state: SavingsState,
    action: SavingsActionType){
        switch (action.type){
            case 'Set Loading':
                return {
                    ...state, 
                    loading: action.payload
                };
            case 'Set Data':
                return {
                    ...state,
                    savings:action.payload.saving,
                    loading: false
                };
            case 'Set Saving Selected':
                return {
                    ...state,
                    savingSelected:action.payload,
                };
                default:
                    return state;
    }
}
    //implementar el proveedor para Characters

type Props = {
        children?: ReactNode
}

const SavingsProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( savingReducer, InitialState);

    //acciones

    const getSavings = async () => {
        const reposirtory = new SavingsRepositoryImp(
            new SavingsDatasourceImp()
        );

    
//cambiar el estado a loaging

        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        const apiResult = await reposirtory.getSavings();

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };

    function setSavingSelected (saving: Saving | null) {
   
        dispatch({
            type: 'Set Saving Selected',
            payload: saving,
        });
    }

    function onUpdateSaving(saving: Saving) {
        //buscar el registro en category y reemplazarlo
        //actualizar el estado category
        const savingsClone = [...state.savings];
        const index = savingsClone.findIndex((item)=> item.id == saving.id);
        savingsClone.splice(index, 1, saving);

        dispatch({
            type: 'Set Data',
            payload: {
                saving: savingsClone,
            }
        }
        )
        //cerrar el modal
        setSavingSelected(null);
    }

    return(
        <savingsContext.Provider value ={{
            ...state,
            getSavings,
            setSavingSelected,
            onUpdateSaving,
        }}>
        {children}
        </savingsContext.Provider>
    )
};

    function useSavingsState(){
        const context = useContext(savingsContext);
        if(context === undefined){
            throw new Error ("useSavingsState debe ser usado" + "con un savingsProvider");
        }

        return context;
    }

export {SavingsProvider, useSavingsState}