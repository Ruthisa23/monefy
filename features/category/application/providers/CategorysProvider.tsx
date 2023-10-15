import { FC, ReactNode, createContext, useReducer, useContext} from "react";

import Category from "../../domain/entities/categorys";
import CategorysResult from "../../domain/entities/categorysResult";
import CategorysRepositoryImp from "../../infraestructure/repositories/categorysRepositoryImp";
import CategorysDatasourceImp from "../../infraestructure/datasources/categorysDatasourceImp";

//estructura de context

interface ContextDefinition{

    loading:  boolean,
    categorys:Category[],

    getCategorys:()=>void;
}

const categorysContext = createContext ( {} as ContextDefinition);


interface CategorysState {
    loading:  boolean,
    categorys:Category[],
}

//definir los tipos de acciones que podra ejecutar el context

type CategorysActionType = 
{ type: 'Set Loading', payload: boolean}
|    {type: 'Set Data', payload: CategorysResult}
    
//iniciar el state

const InitialState : CategorysState = {
    
    loading:  false,
    categorys: [],
}

function categoryReducer(
    state: CategorysState,
    action: CategorysActionType){
        switch (action.type){
            case 'Set Loading':
                return{...state, loading: action.payload};
            case 'Set Data':
                return {
                    ...state,
                    categorys:action.payload.category,
                    loading: false
                }
                default:
                    return state;
        }
}
    //implementar el proveedor para Characters

type Props = {
        children?: ReactNode
}

const CategorysProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( categoryReducer, InitialState);

    //acciones

    const getCategorys = async () => {
        const reposirtory = new CategorysRepositoryImp(
            new CategorysDatasourceImp()
        );

//cambiar el estado a loaging

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await reposirtory.getCategorys();

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        })
    }

    return(
        <categorysContext.Provider value ={{
            ...state,
            getCategorys
        }}>
        {children}
        </categorysContext.Provider>
    )
};

    function useCategorysState(){
        const context = useContext(categorysContext);
        if(context === undefined){
            throw new Error ("useCategorysState debe ser usado" + "con un categorysProvider");
        }

        return context;
    }

export {CategorysProvider, useCategorysState}