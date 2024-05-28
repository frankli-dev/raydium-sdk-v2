import { PublicKey, Commitment, Connection, Transaction, Signer, TransactionInstruction, Keypair, EpochInfo } from '@solana/web3.js';
import { Api } from './api/api.js';
import { ax as TxBuilder, ap as AddInstructionParam, a9 as BigNumberish, bk as CreateFarm, aw as MakeTxData, bl as CreateFarmExtInfo, bm as UpdateFarmReward, bn as UpdateFarmRewards, bo as FarmDWParam, U as FormatFarmInfoOut, bI as ComputeBudgetConfig, av as MakeMultiTxData, l as ApiV3PoolInfoStandardItem, c5 as Percent, c1 as TokenAmount, s as AmmV4Keys, t as AmmV5Keys, k as ApiV3PoolInfoConcentratedItem, S as FormatFarmInfoOutV6, v as ClmmKeys, bE as MakeTransaction, C as CpmmKeys, bL as GetTransferAmountFee, X as OwnerIdoInfo, Y as IdoKeysData, bJ as LoadParams, J as JupTokenType, bz as TokenInfo, e as ApiV3Token, bD as SignAllTransactions, V as AvailabilityCheckAPI3, f as ApiV3TokenRes } from './type-7ae06f8f.js';
import { API_URL_CONFIG } from './api/url.js';
import { Owner } from './common/owner.js';
import { Cluster } from './solana/type.js';
import { TokenAccount, TokenAccountRaw, GetOrCreateTokenAccountParams, HandleTokenAccountParams } from './raydium/account/types.js';
import { Logger } from './common/logger.js';
import { TxVersion } from './common/txTool/txType.js';
import BN__default from 'bn.js';
import Decimal from 'decimal.js';
import { AddLiquidityParams, RemoveParams, CreatePoolParam, CreatePoolAddress, ComputeAmountOutParam, SwapParam } from './raydium/liquidity/type.js';
import { m as CreateConcentratedPool, O as OpenPositionFromBase, p as OpenPositionFromBaseExtInfo, q as OpenPositionFromLiquidity, r as OpenPositionFromLiquidityExtInfo, I as IncreasePositionFromLiquidity, M as ManipulateLiquidityExtInfo, n as IncreasePositionFromBase, D as DecreaseLiquidity, B as ClosePositionExtInfo, s as InitRewardParams, E as InitRewardExtInfo, t as InitRewardsParams, u as SetRewardParams, v as SetRewardsParams, w as CollectRewardParams, x as CollectRewardsParams, H as HarvestAllRewardsParams } from './type-25785933.js';
import { ClmmPositionLayout, PositionInfoLayout, PoolInfoLayout } from './raydium/clmm/layout.js';
import { CpmmConfigInfoInterface, CreateCpmmPoolParam, CreateCpmmPoolAddress, AddCpmmLiquidityParams, WithdrawCpmmLiquidityParams, CpmmSwapParams, ComputePairAmountParams } from './raydium/cpmm/type.js';
import { CpmmPoolInfoLayout } from './raydium/cpmm/layout.js';
import { PoolAccountInfoV4, ReturnTypeGetAddLiquidityDefaultPool } from './raydium/tradeV2/type.js';
import { Structure } from './marshmallow/index.js';

interface ModuleBaseProps {
    scope: Raydium;
    moduleName: string;
}
declare class ModuleBase {
    scope: Raydium;
    private disabled;
    protected logger: Logger;
    constructor({ scope, moduleName }: ModuleBaseProps);
    protected createTxBuilder(feePayer?: PublicKey): TxBuilder;
    logDebug(...args: (string | number | Record<string, any>)[]): void;
    logInfo(...args: (string | number | Record<string, any>)[]): void;
    logAndCreateError(...args: (string | number | Record<string, any>)[]): void;
    checkDisabled(): void;
}

interface TokenAccountDataProp {
    tokenAccounts?: TokenAccount[];
    tokenAccountRawInfos?: TokenAccountRaw[];
}
declare class Account extends ModuleBase {
    private _tokenAccounts;
    private _tokenAccountRawInfos;
    private _accountChangeListenerId?;
    private _accountListener;
    private _clientOwnedToken;
    constructor(params: TokenAccountDataProp & ModuleBaseProps);
    get tokenAccounts(): TokenAccount[];
    get tokenAccountRawInfos(): TokenAccountRaw[];
    updateTokenAccount({ tokenAccounts, tokenAccountRawInfos, }: TokenAccountDataProp): Account;
    addAccountChangeListener(cbk: (data: TokenAccountDataProp) => void): Account;
    removeAccountChangeListener(cbk: (data: TokenAccountDataProp) => void): Account;
    getAssociatedTokenAccount(mint: PublicKey, programId?: PublicKey): PublicKey;
    fetchWalletTokenAccounts(config?: {
        forceUpdate?: boolean;
        commitment?: Commitment;
    }): Promise<{
        tokenAccounts: TokenAccount[];
        tokenAccountRawInfos: TokenAccountRaw[];
    }>;
    getCreatedTokenAccount({ mint, programId, associatedOnly, }: {
        mint: PublicKey;
        programId?: PublicKey;
        associatedOnly?: boolean;
    }): Promise<PublicKey | undefined>;
    getOrCreateTokenAccount(params: GetOrCreateTokenAccountParams): Promise<{
        account?: PublicKey;
        instructionParams?: AddInstructionParam;
    }>;
    checkOrCreateAta({ mint, programId, autoUnwrapWSOLToSOL, }: {
        mint: PublicKey;
        programId?: PublicKey;
        autoUnwrapWSOLToSOL?: boolean;
    }): Promise<{
        pubKey: PublicKey;
        newInstructions: AddInstructionParam;
    }>;
    handleTokenAccount(params: HandleTokenAccountParams): Promise<AddInstructionParam & {
        tokenAccount: PublicKey;
    }>;
    processTokenAccount(props: {
        mint: PublicKey;
        programId?: PublicKey;
        amount?: BigNumberish;
        useSOLBalance?: boolean;
        handleTokenAccount?: boolean;
    }): Promise<Promise<AddInstructionParam & {
        tokenAccount?: PublicKey;
    }>>;
}

declare class Farm extends ModuleBase {
    private _getUserRewardInfo;
    create<T extends TxVersion>({ poolInfo: propPoolInfo, rewardInfos, payer, programId, txVersion, }: CreateFarm<T>): Promise<MakeTxData<T, CreateFarmExtInfo>>;
    restartReward<T extends TxVersion>({ farmInfo, payer, newRewardInfo, txVersion, }: UpdateFarmReward): Promise<MakeTxData<T>>;
    restartRewards<T extends TxVersion>({ farmInfo, payer, newRewardInfos, txVersion, }: UpdateFarmRewards<T>): Promise<MakeTxData<T>>;
    addNewRewardToken<T extends TxVersion>(params: UpdateFarmReward): Promise<MakeTxData<T>>;
    addNewRewardsToken<T extends TxVersion>(params: UpdateFarmRewards<T>): Promise<MakeTxData<T>>;
    deposit<T extends TxVersion>(params: FarmDWParam<T>): Promise<MakeTxData<T>>;
    withdraw<T extends TxVersion>(params: FarmDWParam<T>): Promise<MakeTxData<T>>;
    withdrawFarmReward<T extends TxVersion>({ farmInfo, withdrawMint, txVersion, }: {
        farmInfo: FormatFarmInfoOut;
        withdrawMint: PublicKey;
        payer?: PublicKey;
        txVersion?: T;
    }): Promise<MakeTxData<T>>;
    harvestAllRewards<T extends TxVersion = TxVersion.LEGACY>(params: {
        farmInfoList: Record<string, FormatFarmInfoOut>;
        feePayer?: PublicKey;
        useSOLBalance?: boolean;
        associatedOnly?: boolean;
        checkCreateATAOwner?: boolean;
        userAuxiliaryLedgers?: string[];
        txVersion?: T;
        computeBudgetConfig?: ComputeBudgetConfig;
    }): Promise<MakeMultiTxData<T>>;
}

declare class LiquidityModule extends ModuleBase {
    private stableLayout;
    constructor(params: ModuleBaseProps);
    initLayout(): Promise<void>;
    load(): Promise<void>;
    computePairAmount({ poolInfo, amount, slippage, baseIn, }: {
        poolInfo: ApiV3PoolInfoStandardItem;
        amount: string | Decimal;
        slippage: Percent;
        baseIn?: boolean;
    }): {
        anotherAmount: TokenAmount;
        maxAnotherAmount: TokenAmount;
        liquidity: BN__default;
    };
    getAmmPoolKeys(poolId: string): Promise<AmmV4Keys | AmmV5Keys>;
    addLiquidity<T extends TxVersion>(params: AddLiquidityParams<T>): Promise<MakeTxData<T>>;
    removeLiquidity<T extends TxVersion>(params: RemoveParams<T>): Promise<Promise<MakeTxData<T>>>;
    removeAllLpAndCreateClmmPosition<T extends TxVersion>({ poolInfo, clmmPoolInfo, removeLpAmount, createPositionInfo, farmInfo, userFarmLpAmount, base, computeBudgetConfig, payer, tokenProgram, checkCreateATAOwner, getEphemeralSigners, txVersion, }: {
        poolInfo: ApiV3PoolInfoStandardItem;
        clmmPoolInfo: ApiV3PoolInfoConcentratedItem;
        removeLpAmount: BN__default;
        createPositionInfo: {
            tickLower: number;
            tickUpper: number;
            baseAmount: BN__default;
            otherAmountMax: BN__default;
        };
        farmInfo?: FormatFarmInfoOutV6;
        userFarmLpAmount?: BN__default;
        base: "MintA" | "MintB";
        payer?: PublicKey;
        computeBudgetConfig?: ComputeBudgetConfig;
        tokenProgram?: PublicKey;
        checkCreateATAOwner?: boolean;
        txVersion?: T;
        getEphemeralSigners?: (k: number) => any;
    }): Promise<MakeMultiTxData<T>>;
    createPoolV4<T extends TxVersion>({ programId, marketInfo, baseMintInfo, quoteMintInfo, baseAmount, quoteAmount, startTime, ownerInfo, associatedOnly, checkCreateATAOwner, tokenProgram, txVersion, feeDestinationId, computeBudgetConfig, }: CreatePoolParam<T>): Promise<MakeTxData<T, {
        address: CreatePoolAddress;
    }>>;
    getCreatePoolFee({ programId }: {
        programId: PublicKey;
    }): Promise<BN__default>;
    computeAmountOut({ poolInfo, amountIn, mintIn, mintOut, slippage }: ComputeAmountOutParam): {
        amountOut: BN__default;
        minAmountOut: BN__default;
        currentPrice: Decimal;
        executionPrice: Decimal;
        priceImpact: Decimal;
        fee: BN__default;
    };
    swap<T extends TxVersion>({ poolInfo, amountIn, amountOut, inputMint, fixedSide, txVersion, computeBudgetConfig, }: SwapParam<T>): Promise<MakeTxData<T>>;
}

declare class Clmm extends ModuleBase {
    constructor(params: ModuleBaseProps);
    getClmmPoolKeys(poolId: string): Promise<ClmmKeys>;
    createPool<T extends TxVersion>(props: CreateConcentratedPool<T>): Promise<MakeTxData<T, {
        mockPoolInfo: ApiV3PoolInfoConcentratedItem;
        address: ClmmKeys;
    }>>;
    openPositionFromBase<T extends TxVersion>({ poolInfo, poolKeys: propPoolKeys, ownerInfo, tickLower, tickUpper, base, baseAmount, otherAmountMax, associatedOnly, checkCreateATAOwner, withMetadata, getEphemeralSigners, computeBudgetConfig, txVersion, }: OpenPositionFromBase<T>): Promise<MakeTxData<T, OpenPositionFromBaseExtInfo>>;
    openPositionFromLiquidity<T extends TxVersion>({ poolInfo, poolKeys: propPoolKeys, ownerInfo, amountMaxA, amountMaxB, tickLower, tickUpper, liquidity, associatedOnly, checkCreateATAOwner, withMetadata, txVersion, getEphemeralSigners, }: OpenPositionFromLiquidity<T>): Promise<MakeTxData<T, OpenPositionFromLiquidityExtInfo>>;
    increasePositionFromLiquidity<T extends TxVersion>(props: IncreasePositionFromLiquidity<T>): Promise<MakeTxData<T, ManipulateLiquidityExtInfo>>;
    increasePositionFromBase<T extends TxVersion>(props: IncreasePositionFromBase<T>): Promise<MakeTxData<T, ManipulateLiquidityExtInfo>>;
    decreaseLiquidity<T extends TxVersion>(props: DecreaseLiquidity<T>): Promise<MakeTxData<T, ManipulateLiquidityExtInfo & Partial<ClosePositionExtInfo>>>;
    closePosition<T extends TxVersion>({ poolInfo, ownerPosition, txVersion, }: {
        poolInfo: ApiV3PoolInfoConcentratedItem;
        ownerPosition: ClmmPositionLayout;
        txVersion: T;
    }): Promise<MakeTxData<T, ClosePositionExtInfo>>;
    initReward<T extends TxVersion>({ poolInfo, ownerInfo, rewardInfo, associatedOnly, checkCreateATAOwner, computeBudgetConfig, txVersion, }: InitRewardParams<T>): Promise<MakeTxData<T, InitRewardExtInfo>>;
    initRewards<T extends TxVersion>({ poolInfo, ownerInfo, rewardInfos, associatedOnly, checkCreateATAOwner, computeBudgetConfig, txVersion, }: InitRewardsParams<T>): Promise<MakeTxData<T, {
        address: Record<string, PublicKey>;
    }>>;
    setReward<T extends TxVersion>({ poolInfo, ownerInfo, rewardInfo, associatedOnly, checkCreateATAOwner, computeBudgetConfig, txVersion, }: SetRewardParams<T>): Promise<MakeTxData<T, {
        address: Record<string, PublicKey>;
    }>>;
    setRewards<T extends TxVersion>({ poolInfo, ownerInfo, rewardInfos, associatedOnly, checkCreateATAOwner, computeBudgetConfig, txVersion, }: SetRewardsParams<T>): Promise<MakeTxData<T, {
        address: Record<string, PublicKey>;
    }>>;
    collectReward({ poolInfo, ownerInfo, rewardMint, associatedOnly, checkCreateATAOwner, }: CollectRewardParams): Promise<MakeTransaction>;
    collectRewards({ poolInfo, ownerInfo, rewardMints, associatedOnly, checkCreateATAOwner, }: CollectRewardsParams): Promise<MakeTransaction>;
    swap<T extends TxVersion>({ poolInfo, inputMint, amountIn, amountOutMin, priceLimit, ownerInfo, remainingAccounts, associatedOnly, checkCreateATAOwner, txVersion, }: {
        poolInfo: ApiV3PoolInfoConcentratedItem;
        inputMint: string | PublicKey;
        amountIn: BN__default;
        amountOutMin: BN__default;
        priceLimit?: Decimal;
        ownerInfo: {
            useSOLBalance?: boolean;
            feePayer?: PublicKey;
        };
        remainingAccounts: PublicKey[];
        associatedOnly?: boolean;
        checkCreateATAOwner?: boolean;
        txVersion?: T;
    }): Promise<MakeTxData<T>>;
    harvestAllRewards<T extends TxVersion = TxVersion.LEGACY>({ allPoolInfo, allPositions, ownerInfo, associatedOnly, checkCreateATAOwner, programId, txVersion, computeBudgetConfig, }: HarvestAllRewardsParams<T>): Promise<MakeMultiTxData<T>>;
    getWhiteListMint({ programId }: {
        programId: PublicKey;
    }): Promise<PublicKey[]>;
    getOwnerPositionInfo({ programId, }: {
        programId: string | PublicKey;
    }): Promise<ReturnType<typeof PositionInfoLayout.decode>[]>;
    getRpcClmmPoolInfo({ poolId, }: {
        poolId: string | PublicKey;
    }): Promise<ReturnType<typeof PoolInfoLayout.decode> & {
        currentPrice: number;
    }>;
}

declare class CpmmModule extends ModuleBase {
    constructor(params: ModuleBaseProps);
    load(): Promise<void>;
    getCpmmPoolKeys(poolId: string): Promise<CpmmKeys>;
    getRpcPoolInfo(poolId: string, fetchConfigInfo?: boolean): Promise<ReturnType<typeof CpmmPoolInfoLayout.decode> & {
        baseReserve: BN__default;
        quoteReserve: BN__default;
        configInfo?: CpmmConfigInfoInterface;
    }>;
    createPool<T extends TxVersion>({ programId, poolFeeAccount, startTime, ownerInfo, associatedOnly, checkCreateATAOwner, txVersion, computeBudgetConfig, ...params }: CreateCpmmPoolParam<T>): Promise<MakeTxData<T, {
        address: CreateCpmmPoolAddress;
    }>>;
    addLiquidity<T extends TxVersion>(params: AddCpmmLiquidityParams<T>): Promise<MakeTxData<T>>;
    withdrawLiquidity<T extends TxVersion>(params: WithdrawCpmmLiquidityParams<T>): Promise<MakeTxData<T>>;
    swap<T extends TxVersion>(params: CpmmSwapParams): Promise<MakeTxData<T>>;
    computePairAmount({ poolInfo, amount, slippage, epochInfo, baseIn, }: ComputePairAmountParams): {
        inputAmountFee: GetTransferAmountFee;
        anotherAmount: GetTransferAmountFee;
        maxAnotherAmount: GetTransferAmountFee;
        liquidity: BN__default;
    };
}

type LiquidityPoolJsonInfo = any;
declare class TradeV2 extends ModuleBase {
    constructor(params: ModuleBaseProps);
    static getAddLiquidityDefaultPool({ addLiquidityPools, poolInfosCache, }: {
        addLiquidityPools: LiquidityPoolJsonInfo[];
        poolInfosCache: {
            [ammId: string]: PoolAccountInfoV4;
        };
    }): ReturnTypeGetAddLiquidityDefaultPool;
    private static comparePoolSize;
    private getWSolAccounts;
    unWrapWSol(props: {
        amount: BigNumberish;
        computeBudgetConfig?: ComputeBudgetConfig;
        tokenProgram?: PublicKey;
    }): Promise<MakeTransaction>;
    wrapWSol(amount: BigNumberish, tokenProgram?: PublicKey): Promise<MakeTransaction>;
}

interface SHOW_INFO {
    programId: PublicKey;
    poolId: PublicKey;
    ammId: PublicKey;
    ownerAccountId: PublicKey;
    snapshotLpAmount: BN__default;
    openTime: number;
    endTime: number;
    project: typeof Utils1216.VERSION_PROJECT[number];
    canClaim: boolean;
    canClaimErrorType: canClaimErrorType;
    tokenInfo: {
        mintAddress: PublicKey;
        mintVault: PublicKey;
        mintDecimals: number;
        perLpLoss: BN__default;
        debtAmount: BN__default;
    }[];
}
type canClaimErrorType = "outOfOperationalTime" | "alreadyClaimIt" | undefined;
declare class Utils1216 extends ModuleBase {
    static CLAIMED_NUM: number;
    static POOL_LAYOUT: Structure<number | PublicKey | Buffer | BN__default | BN__default[] | {
        mintDecimals: number;
        mintAddress: PublicKey;
        mintVault: PublicKey;
        perLpLoss: BN__default;
        totalClaimedAmount: BN__default;
    }[], "", {
        padding: BN__default[];
        bump: number;
        endTime: BN__default;
        openTime: BN__default;
        status: number;
        ammId: PublicKey;
        tokenInfo: {
            mintDecimals: number;
            mintAddress: PublicKey;
            mintVault: PublicKey;
            perLpLoss: BN__default;
            totalClaimedAmount: BN__default;
        }[];
    }>;
    static OWNER_LAYOUT: Structure<number | PublicKey | Buffer | BN__default | BN__default[] | {
        mintAddress: PublicKey;
        debtAmount: BN__default;
        claimedAmount: BN__default;
    }[], "", {
        padding: BN__default[];
        owner: PublicKey;
        version: number;
        bump: number;
        poolId: PublicKey;
        lpAmount: BN__default;
        tokenInfo: {
            mintAddress: PublicKey;
            debtAmount: BN__default;
            claimedAmount: BN__default;
        }[];
    }>;
    static DEFAULT_POOL_ID: PublicKey[];
    static SEED_CONFIG: {
        pool: {
            id: Buffer;
        };
        owner: {
            id: Buffer;
        };
    };
    static VERSION_PROJECT: readonly [any, "Francium", "Tulip", "Larix"];
    static getPdaPoolId(programId: PublicKey, ammId: PublicKey): {
        publicKey: PublicKey;
        nonce: number;
    };
    static getPdaOwnerId(programId: PublicKey, poolId: PublicKey, owner: PublicKey, version: number): {
        publicKey: PublicKey;
        nonce: number;
    };
    static getAllInfo({ connection, programId, poolIds, wallet, chainTime, }: {
        connection: Connection;
        programId: PublicKey;
        poolIds: PublicKey[];
        wallet: PublicKey;
        chainTime: number;
    }): Promise<SHOW_INFO[]>;
    makeClaimTransaction({ poolInfo, ownerInfo, }: {
        connection: Connection;
        poolInfo: SHOW_INFO;
        ownerInfo: {
            wallet?: PublicKey;
            associatedOnly: boolean;
        };
    }): Promise<{
        transaction: Transaction;
        signer: Signer[];
    }[]>;
    makeClaimAllTransaction({ poolInfos, ownerInfo, }: {
        poolInfos: SHOW_INFO[];
        ownerInfo: {
            wallet?: PublicKey;
            associatedOnly: boolean;
        };
    }): Promise<{
        transaction: Transaction;
        signer: Signer[];
    }[]>;
    static makeClaimInstruction({ programId, poolInfo, ownerInfo, }: {
        programId: PublicKey;
        poolInfo: SHOW_INFO;
        ownerInfo: {
            wallet: PublicKey;
            ownerPda: PublicKey;
            claimAddress: PublicKey[];
        };
    }): TransactionInstruction;
}

interface ExtInfo {
    address: {
        marketId: PublicKey;
        requestQueue: PublicKey;
        eventQueue: PublicKey;
        bids: PublicKey;
        asks: PublicKey;
        baseVault: PublicKey;
        quoteVault: PublicKey;
        baseMint: PublicKey;
        quoteMin: PublicKey;
    };
}
declare class MarketV2$1 extends ModuleBase {
    create<T extends TxVersion>({ baseInfo, quoteInfo, lotSize, // 1
    tickSize, // 0.01
    dexProgramId, txVersion, computeBudgetConfig, }: {
        baseInfo: {
            mint: PublicKey;
            decimals: number;
        };
        quoteInfo: {
            mint: PublicKey;
            decimals: number;
        };
        lotSize: number;
        tickSize: number;
        dexProgramId: PublicKey;
        eventQueue?: PublicKey;
        requestQueue?: PublicKey;
        txVersion?: T;
        computeBudgetConfig?: ComputeBudgetConfig;
    }): Promise<MakeMultiTxData<T, ExtInfo>>;
}

declare class MarketV2 extends ModuleBase {
    claim<T extends TxVersion>({ ownerInfo, idoKeys, associatedOnly, checkCreateATAOwner, txVersion, }: {
        ownerInfo: OwnerIdoInfo[keyof OwnerIdoInfo] & {
            userIdoInfo: string;
        };
        idoKeys: IdoKeysData;
        associatedOnly?: boolean;
        checkCreateATAOwner?: boolean;
        txVersion?: T;
    }): Promise<MakeTxData>;
}

declare class TokenModule extends ModuleBase {
    private _tokenList;
    private _tokenMap;
    private _blackTokenMap;
    private _mintGroup;
    private _whiteMap;
    private _extraTokenList;
    constructor(params: ModuleBaseProps);
    load(params?: LoadParams & {
        type?: JupTokenType;
    }): Promise<void>;
    get tokenList(): TokenInfo[];
    get tokenMap(): Map<string, TokenInfo>;
    get blackTokenMap(): Map<string, TokenInfo>;
    get mintGroup(): {
        official: Set<string>;
        jup: Set<string>;
    };
    get whiteListMap(): Set<string>;
    /** === util functions === */
    getTokenInfo(mint: string | PublicKey): Promise<ApiV3Token>;
}

interface RaydiumLoadParams extends TokenAccountDataProp, Omit<RaydiumApiBatchRequestParams, "api"> {
    connection: Connection;
    cluster?: Cluster;
    owner?: PublicKey | Keypair;
    apiRequestInterval?: number;
    apiRequestTimeout?: number;
    apiCacheTime?: number;
    signAllTransactions?: SignAllTransactions;
    urlConfigs?: API_URL_CONFIG;
    logRequests?: boolean;
    logCount?: number;
    jupTokenType?: JupTokenType;
    disableFeatureCheck?: boolean;
    disableLoadToken?: boolean;
}
interface RaydiumApiBatchRequestParams {
    api: Api;
    defaultChainTimeOffset?: number;
    defaultChainTime?: number;
}
type RaydiumConstructorParams = Required<RaydiumLoadParams> & RaydiumApiBatchRequestParams;
interface DataBase<T> {
    fetched: number;
    data: T;
    extInfo?: Record<string, any>;
}
interface ApiData {
    tokens?: DataBase<ApiV3Token[]>;
    tokenList?: DataBase<ApiV3TokenRes>;
    jupTokenList?: {
        [JupTokenType.ALL]?: DataBase<ApiV3Token[]>;
        [JupTokenType.Strict]?: DataBase<ApiV3Token[]>;
    };
}
declare class Raydium {
    cluster: Cluster;
    farm: Farm;
    account: Account;
    liquidity: LiquidityModule;
    clmm: Clmm;
    cpmm: CpmmModule;
    tradeV2: TradeV2;
    utils1216: Utils1216;
    marketV2: MarketV2$1;
    ido: MarketV2;
    token: TokenModule;
    rawBalances: Map<string, string>;
    apiData: ApiData;
    availability: Partial<AvailabilityCheckAPI3>;
    private _connection;
    private _owner;
    api: Api;
    private _apiCacheTime;
    private _signAllTransactions?;
    private logger;
    private _chainTime?;
    private _epochInfo?;
    constructor(config: RaydiumConstructorParams);
    static load(config: RaydiumLoadParams): Promise<Raydium>;
    get owner(): Owner | undefined;
    get ownerPubKey(): PublicKey;
    setOwner(owner?: PublicKey | Keypair): Raydium;
    get connection(): Connection;
    setConnection(connection: Connection): Raydium;
    get signAllTransactions(): SignAllTransactions | undefined;
    setSignAllTransactions(signAllTransactions?: SignAllTransactions): Raydium;
    checkOwner(): void;
    private isCacheInvalidate;
    fetchChainTime(): Promise<void>;
    fetchV3TokenList(forceUpdate?: boolean): Promise<ApiV3TokenRes>;
    fetchJupTokenList(type: JupTokenType, forceUpdate?: boolean): Promise<ApiV3Token[]>;
    get chainTimeData(): {
        offset: number;
        chainTime: number;
    } | undefined;
    chainTimeOffset(): Promise<number>;
    currentBlockChainTime(): Promise<number>;
    fetchEpochInfo(): Promise<EpochInfo>;
    fetchAvailabilityStatus(skipCheck?: boolean): Promise<Partial<AvailabilityCheckAPI3>>;
}

export { Account as A, Clmm as C, Farm as F, LiquidityModule as L, MarketV2 as M, RaydiumLoadParams as R, SHOW_INFO as S, TokenAccountDataProp as T, Utils1216 as U, RaydiumApiBatchRequestParams as a, RaydiumConstructorParams as b, Raydium as c, canClaimErrorType as d, MarketV2$1 as e, ModuleBase as f, ModuleBaseProps as g, CpmmModule as h, TradeV2 as i, TokenModule as j };
