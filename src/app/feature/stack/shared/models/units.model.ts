export interface Units {
    ActiveUnits: ActiveUnit[];
    WorkInstructions: WorkInstruction[];
}

export interface ActiveUnit {
    Category: string
    Customer: any
    CustomerId: number
    DateIn: string

    Depth: number
    Height: number
    RowRecordId: number
    StackRecordId: number

    EquipmentSizeType: any
    EquipmentSizeTypeId: number
    EquipmentType: any
    EquipmentTypeId: number
    HexColorCode: string
    Inactive: boolean
    Location: any
    LocationId: number
    RecordId: number
    UnitGrade: any
    UnitGradeId: number
    UnitISO: string
    UnitNumber: string
    UnitStatus: any
    UnitStatusId: number
    UpdatedBy: any
    UpdatedOn: any
    YardLocation: string
    customerName?:string
    UnitStatusDescription?:string
    EquipmentSizeTypeDescription?:string

}


export interface WorkInstruction {
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
