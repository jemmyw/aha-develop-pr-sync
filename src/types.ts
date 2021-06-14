export type LinkedRecord = Aha.Requirement | Aha.Feature | Aha.Epic;

export interface PrLink {
  id: number;
  name: string;
  url: string;
  state: string;
}
