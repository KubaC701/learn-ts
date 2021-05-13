export interface FetchObject<Data> {
  data?: Data;
  error: string;
  isLoading: boolean;
}
