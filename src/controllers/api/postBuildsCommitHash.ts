import { getAuthor } from '../../utils/getAuthor'
import { getCommitMessage } from '../../utils/getCommitMessage'
import { getBranch } from '../../utils/getBranch'
import { axios } from '../../config';
import { Request, Response } from 'express';
import { SettingsModel } from '../../@types/SettingsModel';
import { QueueBuildInput } from '../../@types/QueueBuildInput';
import { isString } from '../../@types/checkValueInObject';
import { cloneMainRepo } from '../../utils/cloneMainRepo'


//Добавление сборки в очередь
export async function postBuildsCommitHash(req: Request, res: Response) {
  let buildId: string | null = null;
  try {
    // Получаем repoName и mainBranch
    const { repoName, mainBranch } = ((
      await axios.get('https://shri.yandex/hw/api/conf')
    ).data.data as SettingsModel);

    //Обновляем репозиторий, чтобы далее делать поиск message, author, branch по свежим данным
    await cloneMainRepo(repoName, mainBranch);

    const message: string = await getCommitMessage(req.params.commitHash);
    const author: string = await getAuthor(req.params.commitHash);
    const branch: string | undefined = await getBranch(req.params.commitHash);

    //Получаем buildId
    buildId = (
      await axios.post('https://shri.yandex/hw/api/build/request', {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      } as QueueBuildInput)
    ).data.data.id;

    res.json({ buildId } as isString);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
