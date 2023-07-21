import { Request, Response, NextFunction } from "express";
import factory from "../../services/factory.service";
import { SystemSettingModel } from "./system.model";
import { asyncErrorCatcher } from "../../services/error.service";
import { ravenStore } from "../../server";
import { systemSettings } from "../../../../shared/types/system";

const getSystemSettings = asyncErrorCatcher(async (req: Request, res: Response, next: NextFunction) => {
  const session = ravenStore.openSession();
  const settings = await session.load<systemSettings>("System/Settings");
  console.log(settings);
  res.status(200).json({
    status: "success",
    data: settings,
  });
});


// const getSystemSettings = factory.getAll(SystemSettingModel);
const addSystemSettings = factory.createOne(SystemSettingModel);
const updateSystemSettings = factory.updateOne(SystemSettingModel, []);

const saveSiteEntry = async (req: Request, res: Response, next: NextFunction) => {
  const { ipAddress, userAgent } = req.body;
  SystemSettingModel.create({ ipAddress, userAgent });
};

export { getSystemSettings, addSystemSettings, updateSystemSettings, saveSiteEntry };
