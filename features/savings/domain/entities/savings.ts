import categorysDatasource from "../datasourses/savingsDatasource";

class Saving {
    
    id?: number;
    concepto: string;
    monto: number;
    clientId: number;

    constructor(
        
        concepto: string,
        monto: number,
        clientId: number,
        id?: number,

    ) {
        this.id = id;
        this.concepto = concepto;
        this.monto = monto;
        this.clientId = clientId;
    }
}
export default Saving;