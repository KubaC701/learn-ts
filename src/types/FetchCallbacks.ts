export default interface FetchCallbacks<I> {
  resolve: (json: I) => void;
  reject?: (errorMessage: string) => void;
  atLast?: () => void;
}