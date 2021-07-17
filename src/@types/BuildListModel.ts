export type BuildListModel = Array<{
  id: string,
  configurationId: string,
  buildNumber: number,
  commitMessage: string,
  commitHash: string,
  branchName: string,
  authorName: string,
  status: string,
  start: string,
  duration: number,
  length?: number
}> | Array<undefined>
