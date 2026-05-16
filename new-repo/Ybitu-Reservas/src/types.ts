export type stateOp<T> = (c: T) => void;

export type ResumoData = {
  key: string,
  title: string,
  date_in: string,
  date_out: string,
  items: string[]
}
