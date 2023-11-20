export enum Status {
    Open = 'Open',
    Resolved = 'Resolved',
}

export class NuisanceReport {
    public ID:number
    public status:Status

    constructor(public witnessName:string, public witnessPhoneNumber:string, public baddieName:string,
                public locationName:string, public latitude:number, public longitude:number, public timeReported:Date,
                public picLink?:string, public extraInfo?:string) {
        this.ID = NuisanceReport.getNewID()
        this.status = Status.Open
    }

    static getReportList():NuisanceReport[] {
        // TODO: GET from server 
        return [
            new NuisanceReport('witnessA', '123-456-7890', 'Bob the Builder', 'Burnaby', 1.1, 2.2, new Date()),
            new NuisanceReport('witnessB', '778-423-1534', 'Elmo', 'Vancouver', 3.3, 4.4, new Date()),
            new NuisanceReport('witnessC', '604-645-1275', 'Dora the Explorer', 'Surrey', 5.5, 6.6, new Date()),
            new NuisanceReport('witnessD', '800-512-7453', 'Winnie the Pooh', 'Richmond', 7.7, 8.8, new Date()),
        ]
    }

    static addReport(report:NuisanceReport) {
        // TODO: PUT to server

    }

    static getNewID():number {
        // TODO: GET next ID from server then PUT to update next ID
        return 0
    }
}