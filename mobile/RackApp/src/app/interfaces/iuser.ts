import { Icity } from "./icity"; 
export interface Iuser {
    id:number;
    FirstName:string;
    LastName:string;
    Email:string;
    Email_verification:number;
    Password:string;
    Birthday:Date;
    Gender:string;
    Image:string;
    Language:string;
    City_id:Icity;
}
