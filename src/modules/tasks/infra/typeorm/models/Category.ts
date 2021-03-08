import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Subcategory from "./Subcategory";

@Entity('categories')
class Category{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    user_id: string;

    @OneToMany(()=> Subcategory, subcategory=>subcategory.category)
    @JoinTable()
    subcategories: Subcategory[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

}

export default Category;