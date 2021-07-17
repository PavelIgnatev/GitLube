import { execFile, rmdir } from './promisify'
import { InterfaceIsName, InterfaceIsMessage } from "../@types/InterfaceIsValue";
import { isString } from '../@types/checkValueInObject'

import path from 'path'
const repoPath: string = path.resolve(__dirname, '../../repo');

export async function cloneMainRepo(url: string, branchName: string): Promise<void> {
  try {
    const postGithub = async (url: string): Promise<any> => {
      return JSON.parse(
        (
          await execFile('curl', [
            '-H',
            `Authorization: token ${process.env.GITHUB_ACCESS_KEY}`,
            url,
          ], {})
        ).stdout.toString()
      );
    }

    const isReposotory: InterfaceIsMessage = await postGithub(
      `https://api.github.com/repos/${url}`
    );

    const isBranch: Array<object> = await postGithub(
      `https://api.github.com/repos/${url}/branches`
    );

    //Cначала проверяем, есть ли такой реп, чтобы не удалять папку с предыдущим сохраненным репом зря
    //Это может вызвать ошибки в будущем, когда мы будем менять настройки на клиенте,
    //не сохранятся настройки из-за ошибки, но реп на нашем api удалится

    if (isReposotory.message !== 'Not Found') {
      //Проверка на то, существует ли такой branch
      if (isBranch.find((item: InterfaceIsName) => item.name === branchName)) {

        //Удаляем папочку рекурсивно если такой репозиторий существет
        await rmdir(repoPath, true);

        //Клонируем репозиторий
        await execFile('git', [
          'clone',
          `https://${process.env.GITHUB_ACCESS_KEY}@github.com/${url}.git`,
          repoPath,
        ], {});
      } else {
        console.error(isBranch);
        throw {
          message: 'Your master branch was not found, default branch: main',
        };
      }
    } else {

      //Кидаем ошибку, что репозиторий не существует, не удаляя предыдущую папку с репом
      console.error(isReposotory);
      throw { message: 'This repository was not found, it may be private' };
    }
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
