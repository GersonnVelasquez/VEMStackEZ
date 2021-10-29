export class Instruction {
    RecordId: number;
    UnitNumber: string;
    LocationId: number;
    Location: Location;
    TransactionBaseId: any;
    TransactionBase: any;
    From: string;
    To: string;
    ActualTo: any;
    CompletedById: any;
    CompletedOn: any;
    DateCreated: Date;
    CreatedById: number;
    Status: number;
    MovementType: number;
    Notes: any;
    RowRecordId: number;
    StackRecordId: number;
    Depth: number;
    Height: number;

    constructor(item: Instruction) {
        this.RecordId = item.RecordId;
        this.UnitNumber = item.UnitNumber;
        this.LocationId = item.LocationId;
        this.Location = item.Location;
        this.TransactionBaseId = item.TransactionBaseId;
        this.TransactionBase = item.TransactionBase;
        this.From = item.From;
        this.To = item.To;
        this.ActualTo = item.ActualTo;
        this.CompletedById = item.CompletedById;
        this.CompletedOn = item.CompletedOn;
        this.DateCreated = item.DateCreated;
        this.CreatedById = item.CreatedById;
        this.Status = item.Status;
        this.MovementType = item.MovementType;
        this.Notes = item.Notes;
        this.RowRecordId = item.RowRecordId;
        this.StackRecordId = item.StackRecordId;
        this.Depth = item.Depth;
        this.Height = item.Height;
    }



    get cantCompleteTospecifiedYardLocation() {
        if (this.Status === 4) {
            return true;
        }
        return false;
    }

    get movementType() {
        if (this.MovementType === 0) {
            return "Inbound"
        }
        if (this.MovementType === 1) {
            return "Outbound"
        }
        if (this.MovementType === 2) {
            return "Internal"
        }

        return '';
    }
}


export interface Location {
    LocationId: number;
    Name: string;
    Code: string;
    Address: string;
    Address2: string;
    ZipCode: number;
    State: string;
    ContactName: string;
    ContactNumber: string;
    ContactEmail: string;
    Customers: any;
    Deleted: boolean;
    NonUnion: boolean;
    Latitude: number;
    Longitude: number;
    SubLocations: any;
    UnitStatuses: any;
    UnitGrades: any;
    CHETypes: any;
    InternalPrimaryWebURL: string;
    InternalSecondaryWebURL: string;
    TransactionUnitTypesNotAllowed: any;
    TransactionTypesNotAllowed: any;
}