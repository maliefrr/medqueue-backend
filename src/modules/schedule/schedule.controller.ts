import { Request, Response } from "express";

export const createSchedule = (_req: Request, res: Response) => {
    res.json({ message: "Create Schedule Endpoint" });
}

export const getSchedules = (_req: Request, res: Response) => {
    res.json({ message: "Get Schedules Endpoint" });
}

export const updateSchedule = (_req: Request, res: Response) => {
    res.json({ message: "Update Schedule Endpoint" });
}

export const deleteSchedule = (_req: Request, res: Response) => {
    res.json({ message: "Delete Schedule Endpoint" });
}