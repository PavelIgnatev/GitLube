import { axios } from '../../config'
import { Request, Response } from 'express';
import { BuildListModel } from '../../@types/BuildListModel';
import { AxiosResponse } from 'axios';

//Получение списка сборок
export async function getBuilds(req: Request, res: Response): Promise<any> {
  let data: AxiosResponse<BuildListModel> | null = null;

  try {
    data = (await axios.get<BuildListModel>('https://shri.yandex/hw/api/build/list?limit=2000'));

  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data.data.data);
};
