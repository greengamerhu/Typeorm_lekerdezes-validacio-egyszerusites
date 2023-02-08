import { IsEmail, Min } from "class-validator";

export default class newAlkalmazott {
    kezdoDatum: Date;
    
    @Min(0)
    haviBer: number;
    
    @IsEmail()
    hivatalosEmail: string;
}