//manejo de estado para personajes

import { FC, ReactNode, createContext, useReducer, useContext} from "react";
import Character from "../../domain/entities/character"
import CharactersResult from "../../domain/entities/charactersResult";
import CharactersRepositoryImp from "../../infraestructure/repositories/charactersRepositoryImp";
import CharacterDatasourceImp from "../../infraestructure/datasources/charactersDatasourceImp";

//estructura decontext

interface ContextDefinition{
    loading:  boolean,
    page:number,
    totalpages:number,
    count:number,
    characters:Character[],

    getCharacters:(page:number)=>void;
}

const charactersContext = createContext ( {} as ContextDefinition);


interface CharacterState {
    loading:  boolean,
    page:number,
    totalpages:number,
    count:number,
    characters:Character[],
}

//definir los tipos de acciones que podra ejecutar el context

type CharactersActionType = 
{ type: 'Set Loading', payload: boolean}
|    {type: 'Set Data', payload: CharactersResult}
    
//iniciar el state

const InitialState : CharacterState = {
    
    loading:  false,
    page: 0,
    count: 0,
    totalpages: 0,
    characters: [],
}

function characterReducer(
    state: CharacterState,
    action: CharactersActionType){
        switch (action.type){
            case 'Set Loading':
                return{...state, loading: action.payload};
            case 'Set Data':
                return {
                    ...state,
                    page:action.payload.page,
                    count:action.payload.count,
                    totalPages:action.payload.totalPages,
                    characters:action.payload.characters,
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

const CharactersProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( characterReducer, InitialState);

    //acciones

    const getCharacters = async (page: number) => {
        const reposirtory = new CharactersRepositoryImp(
            new CharacterDatasourceImp()
        );

//cambiar el estado a loaging

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await reposirtory.getCharacters(page);

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        })
    }

    return(
        <charactersContext.Provider value ={{
            ...state,
            getCharacters
        }}>
        {children}
        </charactersContext.Provider>
    )
};

    function useCharactersState(){
        const context = useContext(charactersContext);
        if(context === undefined){
            throw new Error ("useCharactersState debe ser usado" + "con un charactersProvider");
        }

        return context;
    }

export {CharactersProvider, useCharactersState}