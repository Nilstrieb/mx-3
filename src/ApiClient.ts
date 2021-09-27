import axiosInstance from "./AxiosInstance";
import { Band, Response } from "./Types";

export class ApiClient {
    private readonly _cache: { [route: string]: any };

    constructor() {
        this._cache = {};
    }

    public async get<T, Name extends string>(route: string, force = false): Promise<Response<T, Name>> {
        if (!force && this._cache[route]) {
            return this._cache[route];
        }
        const res = await axiosInstance.get(route);
        const data: Response<T, Name> = res.data.response;
        if (res.status === 200) {
            this._cache[route] = data;
        }
        return data;
    }

    public async searchBand(name: string): Promise<Band[]> {
        const res = await this.get<Band[], "bands">(`/bands?query=${encodeURIComponent(name)}`);
        return res.bands;
    }
}

const client = new ApiClient();
export default client;
