import { getRepository } from 'typeorm';
import Plan from '../models/Plan';

interface Request {
    name: string;
    description: string;
}
class CreatePlanService {
    public async execute({ name, description }: Request): Promise<Plan> {
        const planRepository = getRepository(Plan);

        const plan = planRepository.create({
            name,
            description,
        });

        await planRepository.save(plan);
        return plan;
    }
}

export default CreatePlanService;
