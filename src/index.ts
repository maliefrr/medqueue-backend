import express, { Request, Response } from 'express'
import authRoutes from './modules/auth/auth.routes'
import scheduleRoutes from './modules/schedule/schedule.routes'
import clinicRoutes from './modules/clinics/clinics.routes'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/clinics', clinicRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'MedQueue Backend API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
