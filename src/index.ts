import express, { Express,Request, Response, urlencoded, json } from 'express'
import { config } from "dotenv";
import authRoutes from './modules/auth/auth.routes'
import scheduleRoutes from './modules/schedule/schedule.routes'
import clinicRoutes from './modules/clinics/clinics.routes'
import roleRoutes from './modules/role/role.routes'
import rootRoutes from './modules/root/root.routes'


config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/clinics', clinicRoutes)
app.use('/roles', roleRoutes)
app.use('/', rootRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'MedQueue Backend API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
