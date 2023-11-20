import { NuisanceReportService } from "app/services/nuisance-report.service"

export enum Status {
    Open = 'Open',
    Resolved = 'Resolved',
}

export class NuisanceReport {
    public ID:number
    public status:Status
    public timeReported:Date

    constructor(private nrs:NuisanceReportService, public witnessName:string, public witnessPhoneNumber:string, public baddieName:string,
                public locationName:string, public latitude:number, public longitude:number,
                public picLink?:string, public extraInfo?:string) {
        this.timeReported = new Date()
        this.ID = nrs.getNewID()
        this.status = Status.Open
    }
}