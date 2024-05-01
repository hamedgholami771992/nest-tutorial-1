import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";



// @Index(['name', 'type'])  based on multiple columns
@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: string

    // @Index()  based one column
    @Column()
    type: string

    @Column(`json`)  //it automatically converts Record to/from json 
    payload: Record<string, any>
}


