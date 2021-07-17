export interface BuildModelForItem {
  item: {
    id: string,
    configurationId: string,
    buildNumber: number,
    commitMessage: string,
    commitHash: string,
    branchName: string,
    authorName: string,
    status: string,
    start: string,
    duration: number
  }
}