import CharactersDatasource from "../datasourses/categorysDatasource";

class Character {
    id: number;
    name: string;
    status: string;
    gender: string;
    image: string;
    origin: string;
    species: string;

    constructor(
        id: number,
        name: string,
        status: string,
        gender: string,
        image: string,
        origin: string,
        species: string,
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.gender = gender;
        this.image = image;
        this.origin = origin;
        this.species = species;
    }
}
export default Character;