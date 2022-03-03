export class Cve {
    CVEId:number;
    CWEId:number;
    VulnerabilityType:string;
    Description:string;
    PublishDate:string;
    UpdateDate:string;
    Score:number;
    ExploitExists:string;
    Access:string;
    Complexity:string;
    Authentication:string;
    Confidentiality:string;
    Integrity:string;
    Availability:string;

    constructor(){
        this.CVEId = 0;
        this.CWEId = 0;
        this.VulnerabilityType = '';
        this.Description = '';
        this.PublishDate = '';
        this.UpdateDate ='';
        this.Score =0;
        this.ExploitExists ='';
        this.Access = '';
        this.Complexity ='';
        this.Authentication ='';
        this.Confidentiality='';
        this.Integrity='';
        this.Availability='';
    }

}
