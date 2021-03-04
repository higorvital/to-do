import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Category from "./Category";

@Entity('subcategories')
class Subcategory{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category_id: string;

    @ManyToOne(()=>Category, {
        eager: true
    })
    @JoinColumn({name: 'category_id'})
    category: Category;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

}

export default Subcategory;