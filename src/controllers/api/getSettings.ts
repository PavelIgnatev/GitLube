import { axios } from '../../config'
import { Request, Response } from 'express';
import { SettingsModel } from '../../@types/SettingsModel';


//Получение настроек
export async function getSettings(req: Request, res: Response) {
  let data: SettingsModel | null = null;

  try {
    data = ((await axios.get('https://shri.yandex/hw/api/conf')).data.data as SettingsModel);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
