
export interface KlineData {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface ReduxBodyType {
  data: KlineData[];
  loading: boolean;
  error: string | null;
}

