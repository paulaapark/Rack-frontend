import { Iuser } from "./iuser";

export interface Irack {
    id:number;
    Title:string;
    Description:string;
    Season:string;
    Item_type:number;
    Image:string;
    User_id:Iuser;
}
