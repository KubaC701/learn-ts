import Hero from '../../types/Hero';

export default interface ApiResponse {
  total_count: number;
  data: Hero[];
}
