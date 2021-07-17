import { axios } from '../../config'
import { Request, Response } from 'express';
import { BuildModel } from '../../@types/BuildModel';

//Получение информации о конкретной сборке
export async function getBuildsBuildId(req: Request, res: Response) {
  let data: BuildModel | null = null;

  try {
    data = ((
      await axios.get(`https://shri.yandex/hw/api/build/details`, {
        params: { buildid: req.params.buildId },
      })
    ).data.data as BuildModel);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
