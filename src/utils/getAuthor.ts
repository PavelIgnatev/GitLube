import { execFile } from './promisify'
import path from 'path'

//Получаем автора по commitHash
export async function getAuthor(commitHash: string, repoLink: string = '../../repo'): Promise<string> {
  try {
    return (
      await execFile('git', ['show', '-s', '--format=%an', commitHash], {
        cwd: path.resolve(__dirname, repoLink),
      })
    ).stdout.toString().trim();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit hash is invalid' };
  }
};
