import { axios } from '../../config'
import { Request, Response } from 'express';
import { BuildModel } from '../../@types/BuildModel';
import { AxiosResponse } from 'axios';

//Получение информации о конкретной сборке
export async function getBuildsBuildId(req: Request, res: Response): Promise<any> {
  let data: AxiosResponse<BuildModel> | null = null;

  try {
    data = ((
      await axios.get<BuildModel>(`https://shri.yandex/hw/api/build/details`, {
        params: { buildid: req.params.buildId },
      })
    ));
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data.data.data);
};
