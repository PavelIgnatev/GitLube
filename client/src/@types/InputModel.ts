export interface InputModel {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  required?: boolean;
  autoFocus: boolean;
  error: boolean;
  onChange: any;
  onClear?: any;
}
