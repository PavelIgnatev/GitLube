import { axios } from '../../config'
import { Request, Response } from 'express';

//Получение логов сборки
export async function getBuildsBuildIdLogs(req: Request, res: Response): Promise<any> {
  let data: string | null = null;

  try {
    data = ((
      await axios.get(`https://shri.yandex/hw/api/build/log`, {
        params: { buildid: req.params.buildId },
      })
    ).data as string);
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
