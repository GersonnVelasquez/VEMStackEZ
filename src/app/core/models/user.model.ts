interface UserGroup {
    RecordId: number;
    Name: string;
    Description: string;
    EMail: string;
    Users: User[];
    Deleted: boolean;
}

interface Preference {
    RecordId: number;
    Key: string;
    User: User;
    Value: string;
}

export interface User {
    UserId: number;
    LoginName: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    MobileNumber: string;
    ProfilePicture: null;
    EMail: string;
    Location: Location;
    AllowRoaming: boolean;
    Password: null;
    Deleted: boolean;
    Deactivated: boolean;
    Role: Role;
    Preferences?: Preference[];
    MenuVEM: MenuVEM;
    HourlyEmployee: boolean;
    UserType: number;
    SignatureFile: string;
    SignatureExpirationDate: Date;
    UserAccessLocations: UserAccessLocation[];
    UserActivities: any[];
    UserGroups?: UserGroup[];
    AssignedWorkOrders: null;
}







interface Location {
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
    Customers: Customer[];
    Deleted: boolean;
    NonUnion: boolean;
    Latitude: number;
    Longitude: number;
    SubLocations: SubLocation[];
    UnitStatuses: SubLocation[];
    UnitGrades: SubLocation[];
    CHETypes: null;
    InternalPrimaryWebURL: string;
    InternalSecondaryWebURL: string;
    TransactionUnitTypesNotAllowed: null;
    TransactionTypesNotAllowed: null;
}




interface Customer {
    CustomerId: number;
    Name: string;
    LongName: null;
    LogoUrl: null;
    Address: string;
    Address2: string;
    City: string;
    ZipCode: number;
    State: string;
    Country: string;
    WebSite: string;
    ContactName: string;
    ContactPhoneNumber: string;
    ContactMobileNumber: string;
    EMail: string;
    Locations: any[];
    cBasicCriteria: null;
    reeferPreTripMeasurements: null;
    Deleted: boolean;
    AllowManHourRateEdit: boolean;
}




interface SubLocation {
    RecordId: number;
    Name: string;
    Code: string;
    Description: string;
    Deleted: boolean;
    Locations?: any[];
}





interface MenuVEM {
    MenuGroups: MenuGroup[];
}

interface MenuGroup {
    GroupName: string;
    MenuItems: MenuItem[];
}



interface MenuItem {
    ScreenId: number;
    ScreenMenuTitle: string;
    ScreenMenuIcon: string;
    ScreenTitle: string;
    ScreenDescription: string;
    MenuGroupName: string;
    ScreenName: string;
    ScreenReferenceId: number;
    AccessLevel: number;
}






interface Role {
    UserRoleId: number;
    RoleName: string;
    RoleDescription: string;
    CreatedOn: Date;
    CreatedBy: string;
    LastModifiedOn: Date;
    ModifiedBy: string;
    AllowRecordDelete: boolean;
    Deleted: boolean;
}


interface UserAccessLocation {
    RecordId: number;
    LocationId: number;
    Location: Location;
}
