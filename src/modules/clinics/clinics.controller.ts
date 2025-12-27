import { Request, Response } from "express";


export const createClinic = (_req: Request, res: Response) => {
    res.json({ message: "Create Clinic Endpoint" });
}

export const getClinics = (_req: Request, res: Response) => {
    res.json({ message: "Get Clinics Endpoint" });
}

export const updateClinic = (_req: Request, res: Response) => {
    res.json({ message: "Update Clinic Endpoint" });
}

export const deleteClinic = (_req: Request, res: Response) => {
    res.json({ message: "Delete Clinic Endpoint" });
}