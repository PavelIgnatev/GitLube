import { axios } from '../../config'
import { Request, Response } from 'express';
import { SettingsModel } from '../../@types/SettingsModel';
import { AxiosResponse } from 'axios';


//Получение настроек
export async function getSettings(req: Request, res: Response): Promise<any> {
  let data: AxiosResponse<SettingsModel> | null = null;

  try {
    data = ((await axios.get<SettingsModel>('https://shri.yandex/hw/api/conf')));
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data.data.data);
};
