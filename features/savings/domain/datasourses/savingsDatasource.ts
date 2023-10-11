
import CharactersResult from "../entities/savingsResult";

abstract class CharactersDatasource {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getCharacters(page: number) : Promise<CharactersResult>;
}

export default CharactersDatasource;