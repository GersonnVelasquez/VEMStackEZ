export interface YardLayout {
    RecordId:                     number;
    Name:                         string;
    Description:                  string;
    DateCreated:                  Date;
    CreatedById:                  number;
    UpdatedOn:                    Date;
    UpdatedById:                  number;
    Active:                       boolean;
    Rows:                         Row[];
    LocationId:                   number;
    Location:                     Location;
    Mask:                         string;
    PositionExample:              string;
    RowStartCharacterPosition:    number;
    RowNameLength:                number;
    StackStartCharacterPosition:  number;
    StackNameLength:              number;
    DepthStartCharacterPosition:  number;
    DepthNameLength:              number;
    HeightStartCharacterPosition: number;
    HeightNameLength:             number;
}

interface Location {
    LocationId:                     number;
    Name:                           string;
    Code:                           string;
    Address:                        string;
    Address2:                       string;
    ZipCode:                        number;
    State:                          string;
    ContactName:                    string;
    ContactNumber:                  string;
    ContactEmail:                   string;
    Customers:                      null;
    Deleted:                        boolean;
    NonUnion:                       boolean;
    Latitude:                       number;
    Longitude:                      number;
    SubLocations:                   any;
    UnitStatuses:                   any;
    UnitGrades:                     any;
    CHETypes:                       any;
    InternalPrimaryWebURL:          string;
    InternalSecondaryWebURL:        string;
    TransactionUnitTypesNotAllowed: any;
    TransactionTypesNotAllowed:     any;
}

interface Row {
    RecordId:                       number;
    Number:                         string;
    Wheeled:                        boolean;
    Stacks:                         Stack[];
    CheStyleTopLoaderEnabledRow:    boolean;
    CheStyleReachStackerEnabledRow: boolean;
    CheStyleRMGEnabledRow:          boolean;
    CheStyleOtherEnabledRow:        boolean;
    Direction:                      number;
    RowDirection:                   number;
    RowUI:                          RowUI;
    IsHeapRow:                      boolean;
    MaxQuantityOfContainers:        number;
}

interface RowUI {
    RecordId:    number;
    Points:      Point[];
    RowColorHex: string;
}

interface Point {
    RecordId: number;
    XCoords:  number;
    YCoords:  number;
}

interface Stack {
    RecordId:      number;
    Number:        string;
    Depth:         number;
    Height:        number;
    Locked:        number;
    ManualControl: boolean;
}
