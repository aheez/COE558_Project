export type Driver = {
    fname: string;
    lname: string;
    govID: number;
    id: number;
    phone: number;
    age: number;
    address: string;
    email: string;
    licenseStatus: LicenseStatus;
    startingDate: string;
    endDate: string;
    score: number;
    workStatus: WorkStatus;
}

export enum LicenseStatus {
    valid = "Valid",
    invalid ="Invalid",
    pending = "Pending"
}

export enum WorkStatus {
    OnDuty = "On Duty",
    OffDuty = "Off Duty",
    OnLeave = "On Leave",
    OnTraining = "On Training",
    OnVacation = "On Vacation"
}

export type Customer = {
    fname: string;
    lname: string;
    address: string;
    email: string;
    phone: number;
}

export type Car = {
    licensePlate: string;
    make: string;
    model: string;
    year: number;
    status: CarStatus;
}

export enum CarStatus {
    Available = "Available",
    Unavailable = "Unavailable"
}

export type Package = {
    id: number;
    customer: Customer;
    location_x: number;
    location_y: number;
    status: PackageStatus;
    priority: PackagePriority;
    deliveryDate: string;
}

export enum PackagePriority {
    high = "High",
    medium = "Medium",
    low = "Low"
}

export enum PackageStatus {
    delivered = "Delivered",
    pending = "Pending",
    inTransit = "In Transit",
    cancelled = "Cancelled"
}

export enum WarningSeverity {
    low = "Low",
    medium = "Medium",
    high = "High",
    critical = "Critical"
}

export type Warning = {
    severity: WarningSeverity;
    message: string;
    date: string;
}