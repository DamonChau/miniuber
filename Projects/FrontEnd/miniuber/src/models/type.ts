export interface Users {
    id: string;
    userName: string;
    phoneNo: string;
    password: string;
    userRole: UserRole;
    status: Status;
    createdDate: string;
    loginDate: string;
  }

  export interface Drivers {
    id: string;
    userId: string;
    latidude: number;
    longitude: number;
    image: string;
    rate: number;
  }

  export interface Customers {
    id: string;
    userId: string;
    address: string;
    latidude: number;
    longitude: number;
  }

  export interface Trips {
    id: string;
    driverId: string;
    customerId: string;
    status: TripStatus;
    createdDate: string;
    finishDate: string;
    addFrom: string;
    addTo: string;
  }

  export enum Status{
    InActive,
    Active
  }

  export enum TripStatus{
    Booking,
    Booked,
    Ongoing,
    Finish
  }


  export enum UserRole{
    Customer,
    Driver,
    Admin,
  }