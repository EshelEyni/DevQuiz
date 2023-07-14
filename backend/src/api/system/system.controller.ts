import factory from "../../services/factory.service";
import { SystemSettingModel } from "./system.model";

const getSystemSettings = factory.getAll(SystemSettingModel);
const addSystemSettings = factory.createOne(SystemSettingModel);
const updateSystemSettings = factory.updateOne(SystemSettingModel, []);

export { getSystemSettings, addSystemSettings, updateSystemSettings };
