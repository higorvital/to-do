import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/typeorm/models/User";
import Subcategory from "./Subcategory";

@Entity('tasks')
class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('date')
    date: Date | null;

    @Column('time')
    time: Date | null;

    @Column()
    user_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    completed: boolean;

    @Column('timestamp')
    completed_at: Date | null;

    @Column()
    important: boolean;

    @Column()
    subcategory_id: string;

    @ManyToOne(()=>Subcategory, {
        eager: true
    })
    @JoinColumn({name: 'subcategory_id'})
    subcategory: Subcategory;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Task;