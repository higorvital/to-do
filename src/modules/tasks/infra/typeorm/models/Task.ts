import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/infra/typeorm/models/User";

@Entity('tasks')
class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('date')
    date: Date;

    @Column('time')
    time: Date;

    @Column()
    user_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    completed: boolean;

    @Column('timestamp')
    completed_at: Date;

    @Column()
    important: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Task;