import { getBuilds } from './getBuilds'
import { getSettings } from './getSettings'
import { postSettings } from './postSettings'
import { getBuildsBuildId } from './getBuildsBuildId'
import { getBuildsBuildIdLogs } from './getBuildsBuildIdLogs'
import { postBuildsCommitHash } from './postBuildsCommitHash'

const api = {
  getBuilds,
  getSettings,
  postSettings,
  getBuildsBuildId,
  getBuildsBuildIdLogs,
  postBuildsCommitHash
}
export {
  api
};
