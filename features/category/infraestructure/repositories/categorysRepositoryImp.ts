import CharactersDatasource from "../../domain/datasourses/charactersDatasource";
import CharactersResult from "../../domain/entities/charactersResult";
import CharactersRepository from "../../domain/repositorio/charactersRepository";

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