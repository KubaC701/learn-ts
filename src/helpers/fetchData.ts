import FetchCallbacks from '../types/FetchCallbacks';

export default async <Data>(
  url: string,
  { resolve, reject, atLast }: FetchCallbacks<Data>,
  options?: RequestInit
): Promise<void> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    if (resolve) resolve(json);
  } catch (err) {
    if (reject) reject(err.message);
  } finally {
    if (atLast) atLast();
  }
};
