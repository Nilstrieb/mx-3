import axiosInstance from "./AxiosInstance";
import { Band } from "./Types";

export class ApiClient {
    private readonly _cache: { [route: string]: any };

    constructor() {
        this._cache = {};
    }

    public async get<T>(route: string, force = false): Promise<T> {
        if (!force && this._cache[route]) {
            return this._cache[route];
        }
        const res = await axiosInstance.get(route);
        const data = res.data.response;
        if (res.status === 200) {
            this._cache[route] = data;
        }
        return data;
    }

    public async searchBand(name: string): Promise<Band[]> {
        const res = await this.get<any>(`/bands?query=${encodeURIComponent(name)}`);
        return res.bands;
    }
}

const client = new ApiClient();
export default client;
