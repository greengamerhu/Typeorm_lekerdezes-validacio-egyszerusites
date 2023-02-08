import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Alkalmazott {
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    kezdoDatum : Date
    @Column('int')
    haviBer : number
    @Column()
    hivatalosEmail : string
}