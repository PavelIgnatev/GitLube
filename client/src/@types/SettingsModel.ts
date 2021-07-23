export interface SettingsModel {
  id?: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
  changeSettings?: boolean;
}
