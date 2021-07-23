import { axios } from '../../config';
import { Request, Response } from 'express';
import { SettingsModel } from '../../@types/SettingsModel';
import { cloneMainRepo } from '../../utils/cloneMainRepo';

//Cохранение настроек
export async function postSettings(req: Request, res: Response): Promise<any> {
  let result: any;
  let changeSettings: boolean = false;

  try {
    let data = (
      await axios.get<SettingsModel>('https://shri.yandex/hw/api/conf')
    ).data.data ?? {
      id: 'undefined',
      repoName: 'undefined',
      buildCommand: 'undefined',
      mainBranch: 'undefined',
      period: 1,
    };

    let body: SettingsModel = { data: req.body };

    delete data.id;
    delete body.data.id;

    if (JSON.stringify(data) === JSON.stringify(body)) {
      return res.json('');
    }

    if (data.repoName !== body.data.repoName) {
      await cloneMainRepo(body.data.repoName, body.data.mainBranch);

      //Очищаем настройки
      await axios.delete('https://shri.yandex/hw/api/conf');

      changeSettings = true;
    }

    result = await axios.post('https://shri.yandex/hw/api/conf', body);

    try {
      await axios.post('http://localhost:8080/update-settings', {
        ...body,
        changeSettings,
      });
    } catch (error) {
      console.error('не смог отправить настройки на сервер');
    }

    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.send({ message: error.message });
  }
}
