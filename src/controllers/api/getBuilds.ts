import { axios } from '../../config'
import { Request, Response } from 'express';
import { BuildListModel } from '../../@types/BuildListModel';

//Получение списка сборок
export async function getBuilds(req: Request, res: Response) {
  let data: BuildListModel | null = null;

  try {
    data = ((await axios.get('https://shri.yandex/hw/api/build/list?limit=2000'))
      .data.data as BuildListModel);
    
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
