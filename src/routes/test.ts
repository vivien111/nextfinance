import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const data = req.body;
  console.log('Data reçue :', data);
  res.json({
    success: true,
    message: 'API de test fonctionne !',
    received: data
  });
});

export default router;
