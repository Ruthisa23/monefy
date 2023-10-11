
import Character from "./categorys";


class CharactersResult{
    page : number;
    count : number;
    totalPages: number;
    characters: Character[];

    constructor(
        page: number,
        count: number,
        totalPages: number,
        characters: Character[],
    ) {
        this.characters = characters;
        this.page = page;
        this.count = count;
        this.totalPages = totalPages;
    }
}

export default CharactersResult;