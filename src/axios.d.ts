// axios.d.ts
import 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    postUrlEncode(url: string, data?: any, config?: any): Promise<any>
  }
}
