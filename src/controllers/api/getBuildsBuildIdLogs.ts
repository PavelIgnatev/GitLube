import { axios } from '../../config'
import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { InterfaceIsData } from '../../@types/InterfaceIsValue';

//Получение логов сборки
export async function getBuildsBuildIdLogs(req: Request, res: Response): Promise<any> {
  let data: AxiosResponse<InterfaceIsData> | null = null;

  try {
    data = ((
      await axios.get<InterfaceIsData>(`https://shri.yandex/hw/api/build/log`, {
        params: { buildid: req.params.buildId },
      })
    ));
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data.data);
};
