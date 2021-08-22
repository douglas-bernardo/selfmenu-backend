import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Plan from './Plan';
import User from './User';

@Entity('account')
class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    plan_id: string;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'plan_id' })
    plan: Plan;

    @Column('time with time zone')
    start_time: Date;

    @Column('time with time zone')
    end_time: Date;

    // @Column({ default: true })
    @Column()
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Account;
