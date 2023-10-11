import CharactersDatasource from "../../domain/datasourses/incomesDatasource";
import Character from "../../domain/entities/incomes";
import CharactersResult from "../../domain/entities/incomesResult";

class CharacterDatasourceImp extends CharactersDatasource {
    getCharacters(page: number): Promise<CharactersResult> {
        return fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((response) => {
            // response.data { info, results}
            const characters = response.results.map((item : any) => new Character(
                item.id,
                item.name,
                item.status,
                item.gender,
                item.image,
                item.origin,
                item.species,
                )
            );
            return new CharactersResult(
                page,
                response.info.count,
                response.info.pages,
                characters
            )
        });
    }
}

export default CharacterDatasourceImp;