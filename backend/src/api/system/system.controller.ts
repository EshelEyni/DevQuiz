import { Request, Response, NextFunction } from "express";
import { asyncErrorCatcher } from "../../services/error.service";
import { ravenStore } from "../../server";
import { systemSettings } from "../../../../shared/types/system";

const getSystemSettings = asyncErrorCatcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = ravenStore.openSession();
    const settings = await session.load<systemSettings>("System/Settings");
    res.status(200).json({
      status: "success",
      data: settings,
    });
  }
);

const updateSystemSettings = asyncErrorCatcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const settings = req.body;
    const session = ravenStore.openSession();
    await session.store(settings, "System/Settings");
    await session.saveChanges();
    res.status(200).json({
      status: "success",
      data: settings,
    });
  }
);

const saveSiteEntry = asyncErrorCatcher(async (req: Request, res: Response, next: NextFunction) => {
  type UserEntry = {
    ip: string;
    userAgent: string;
    timestamp: Date;
  };

  const ip = req.ip ? req.ip : "unknown";
  const userAgent = req.headers["user-agent"] ? req.headers["user-agent"] : "unknown";
  const timestamp = new Date();

  const entry: UserEntry = {
    ip,
    userAgent,
    timestamp,
  };

  const session = ravenStore.openSession();
  await session.store<UserEntry>(entry, "UserEntries/");
  await session.saveChanges();

  res.status(201).json({
    status: "success",
    data: entry,
  });
});

export { getSystemSettings, updateSystemSettings, saveSiteEntry };
