import CharactersResult from "../entities/incomesResult";

abstract class CharactersRepository {
    // tendra una funcion para ller los personajes por numero de pagina, y retonarlos
    abstract getCharacters(page: number) : Promise<CharactersResult>;
}

export default CharactersRepository;