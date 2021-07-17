import { execFile } from './promisify'
import path from 'path'
//Получаем branch по commitHash
export async function getBranch(commitHash: string, repoLink: string = '../../repo'): Promise<string | undefined> {
  try {
    return (
      await execFile('git', ['branch', '-a', '--contains', commitHash], {
        cwd: path.resolve(__dirname, repoLink),
      })
    ).stdout
      .toString()
      .replace('* ', '')
      .trim()
      .split('/')
      .pop()
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit hash is invalid' };
  }
};
