export interface SettingsModel {
  data: {
    id?: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
    changeSettings?: boolean;
  };
}
