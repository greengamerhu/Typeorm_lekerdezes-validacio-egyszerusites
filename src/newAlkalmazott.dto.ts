import { IsEmail } from "class-validator";

export default class newAlkalmazott {
    kezdoDatum: Date;
    haviBer: number;
    @IsEmail()
    hivatalosEmail: string;
}