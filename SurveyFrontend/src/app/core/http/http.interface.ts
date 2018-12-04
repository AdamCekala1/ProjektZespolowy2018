export interface IHttpResponse<T> {
  body: T;
  headers: any;
  errors?: any;
  ok: boolean;
  status: number;
  type: number;
  url: string;
}
