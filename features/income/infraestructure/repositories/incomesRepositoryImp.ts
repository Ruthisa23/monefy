import CharactersDatasource from "../../domain/datasourses/incomesDatasource";
import CharactersResult from "../../domain/entities/incomesResult";
import CharactersRepository from "../../domain/repositorio/incomesRepository";

class CharactersRepositoryImp extends CharactersRepository {
    datasource: CharactersDatasource;

    constructor(datasource: CharactersDatasource) {
        super();
        this.datasource = datasource;
    }

    getCharacters(page: number): Promise<CharactersResult> {
        return this.datasource.getCharacters(page);
    }
}

export default CharactersRepositoryImp;