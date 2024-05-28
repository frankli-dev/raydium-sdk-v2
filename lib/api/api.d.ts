import { AxiosInstance } from 'axios';
import { Cluster } from '../solana/type.js';
import { b as ApiClmmConfigInfo, e as ApiV3Token, J as JupTokenType, p as FetchPoolParams, P as PoolsApiReturn, n as ApiV3PoolInfoItem, w as PoolKeys, U as FormatFarmInfoOut, I as FormatFarmKeyOut, V as AvailabilityCheckAPI3 } from '../type-7ae06f8f.js';
import { API_URL_CONFIG } from './url.js';
import { PublicKey } from '@solana/web3.js';
import 'bn.js';
import '@solana/spl-token';
import '../common/txTool/txType.js';
import '../common/owner.js';
import '../common/txTool/lookupTable.js';
import 'decimal.js';
import '../module/token.js';
import '../common/pubKey.js';
import '../marshmallow/index.js';
import '../marshmallow/buffer-layout.js';
import '../common/logger.js';
import '../module/currency.js';

declare function endlessRetry<T>(name: string, call: () => Promise<T>, interval?: number): Promise<T>;
interface ApiProps {
    cluster: Cluster;
    timeout: number;
    logRequests?: boolean;
    logCount?: number;
    urlConfigs?: API_URL_CONFIG;
}
declare class Api {
    cluster: Cluster;
    api: AxiosInstance;
    logCount: number;
    urlConfigs: API_URL_CONFIG;
    constructor({ cluster, timeout, logRequests, logCount, urlConfigs }: ApiProps);
    getClmmConfigs(): Promise<ApiClmmConfigInfo[]>;
    getClmmPoolLines(poolId: string): Promise<{
        price: string;
        liquidity: string;
    }[]>;
    getBlockSlotCountForSecond(endpointUrl?: string): Promise<number>;
    getChainTimeOffset(): Promise<{
        offset: number;
    }>;
    getRpcs(): Promise<{
        rpcs: {
            batch: boolean;
            name: string;
            url: string;
            weight: number;
        }[];
        strategy: string;
    }>;
    getTokenList(): Promise<{
        mintList: ApiV3Token[];
        blacklist: ApiV3Token[];
        whiteList: string[];
    }>;
    getJupTokenList(type?: JupTokenType): Promise<ApiV3Token[]>;
    getTokenInfo(mint: (string | PublicKey)[]): Promise<ApiV3Token[]>;
    getPoolList(props?: FetchPoolParams): Promise<PoolsApiReturn>;
    fetchPoolById(props: {
        ids: string;
    }): Promise<ApiV3PoolInfoItem[]>;
    fetchPoolKeysById(props: {
        idList: string[];
    }): Promise<PoolKeys[]>;
    fetchPoolByMints(props: {
        mint1: string | PublicKey;
        mint2?: string | PublicKey;
    } & Omit<FetchPoolParams, "pageSize">): Promise<ApiV3PoolInfoItem[]>;
    fetchFarmInfoById(props: {
        ids: string;
    }): Promise<FormatFarmInfoOut[]>;
    fetchFarmKeysById(props: {
        ids: string;
    }): Promise<FormatFarmKeyOut[]>;
    fetchAvailabilityStatus(): Promise<AvailabilityCheckAPI3>;
}

export { Api, ApiProps, endlessRetry };
