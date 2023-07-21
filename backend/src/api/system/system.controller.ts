import { Request, Response, NextFunction } from "express";
import factory from "../../services/factory.service";
import { SystemSettingModel } from "./system.model";

const getSystemSettings = factory.getAll(SystemSettingModel);
const addSystemSettings = factory.createOne(SystemSettingModel);
const updateSystemSettings = factory.updateOne(SystemSettingModel, []);

const saveSiteEntry = async (req: Request, res: Response, next: NextFunction) => {
  const { ipAddress, userAgent } = req.body;
  SystemSettingModel.create({ ipAddress, userAgent });
  next();
};

export { getSystemSettings, addSystemSettings, updateSystemSettings, saveSiteEntry };
