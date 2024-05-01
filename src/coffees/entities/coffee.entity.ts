import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()  //sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    brand: string

    @Column({default: 0})
    recommendations: number

    //this gives us 3 tables in database, Coffee, Flavor, Coffee_flavors_flavor
    @JoinTable() //This decorator is specifically used on the owner side of a many-to-many relationship 
    // to specify the join table (i.e., the table that holds foreign keys from both related tables). 
    @ManyToMany(
        type => Flavor,  //specifies the target entity that participates in the relationship, which is the Flavor entity in this case.
        flavor => flavor.coffees, //is a "back-reference" from the related Flavor entity back to the Coffee entity. 
        //It indicates which property in the Flavor entity points back to the Coffee entity, facilitating bidirectional navigation.
        {
            cascade: true,  //boolean | ['insert', 'update'] ==> any new value will also be appended into flavor table in database
        }
    )
    flavors: Flavor[]  //we have to put the type in the owner-side as string not the refferedType
}