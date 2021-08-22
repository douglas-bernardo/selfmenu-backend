import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePlanService from '../services/CreatePlanService';

const plansRouter = Router();

plansRouter.post('/', ensureAuthenticated, async (request, response) => {
    const { name, description } = request.body;

    const createPlanService = new CreatePlanService();

    const plan = await createPlanService.execute({ name, description });

    return response.json(plan);
});

export default plansRouter;
