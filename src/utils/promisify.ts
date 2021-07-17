import { isString } from '../@types/checkValueInObject'
import { execFile as execFileChildProcess } from 'child_process'

import util from 'util'
import fs from 'fs'

const execFileAsync = util.promisify(execFileChildProcess);
const FSrmdir = util.promisify(fs.rmdir);

const execFile = async (command: string, array: Array<string>, cwd: isString) => {
  return await execFileAsync(command, array, cwd);
}
const rmdir = async (repoPath: string, recursive: boolean) => {
  return await FSrmdir(repoPath, { recursive: recursive });
}
export {
  execFile,
  rmdir
};
