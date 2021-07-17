import { axios } from '../../config';
import { Request, Response } from 'express';
import { SettingsModel } from '../../@types/SettingsModel'
import { cloneMainRepo } from '../../utils/cloneMainRepo'

//Cохранение настроек
export async function postSettings(req: Request, res: Response) {
  let result: any;
  let changeSettings: boolean = false;

  try {
    let data: SettingsModel = (await axios.get('https://shri.yandex/hw/api/conf')).data
      .data ?? ({
        id: 'undefined',
        repoName: 'undefined',
        buildCommand: 'undefined',
        mainBranch: 'undefined',
        period: 1,
      });

    let body: SettingsModel = req.body;

    delete data.id;
    delete body.id;

    if (JSON.stringify(data) === JSON.stringify(body)) {
      return res.json('');
    }

    if (data.repoName !== body.repoName) {
      await cloneMainRepo(body.repoName, body.mainBranch);

      //Очищаем настройки
      await axios.delete('https://shri.yandex/hw/api/conf');

      changeSettings = true;
    }

    result = await axios.post('https://shri.yandex/hw/api/conf', body as SettingsModel);

    try {
      await axios.post('http://localhost:8080/update-settings', {
        ...body,
        changeSettings,
      } as SettingsModel);
    } catch (error) {
      console.error('не смог отправить настройки на сервер');
    }

    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.send({ message: error.message });
  }
};
