export class Cve {
    cveId:string;
    cweId:string;
    vulnerabilityType:string;
    description:string;
    publishDate:string;
    updateDate:string;
    score:number;
    exploitExists:string;
    access:string;
    complexity:string;
    authentication:string;
    confidentiality:string;
    integrity:string;
    availability:string;

    constructor(){
        this.cveId = '';
        this.cweId = '';
        this.vulnerabilityType = '';
        this.description = '';
        this.publishDate = '';
        this.updateDate ='';
        this.score =0;
        this.exploitExists ='';
        this.access = '';
        this.complexity ='';
        this.authentication ='';
        this.confidentiality='';
        this.integrity='';
        this.availability='';
    }

}
