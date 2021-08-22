import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan')
class Plan {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}

export default Plan;
