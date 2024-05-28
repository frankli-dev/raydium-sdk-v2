import { PublicKey, TransactionInstruction, Signer, Transaction, VersionedTransaction, Connection } from '@solana/web3.js';
import BN__default from 'bn.js';
import { Mint, TransferFeeConfig } from '@solana/spl-token';
import { Cluster } from './solana/type.js';
import { TxVersion } from './common/txTool/txType.js';
import { Owner } from './common/owner.js';
import { CacheLTA } from './common/txTool/lookupTable.js';
import Decimal from 'decimal.js';
import { Token, TokenProps } from './module/token.js';
import { Structure, GetStructureFromLayoutSchema } from './marshmallow/index.js';
import { GetStructureSchema } from './marshmallow/buffer-layout.js';
import { Logger } from './common/logger.js';
import { Currency } from './module/currency.js';

interface ExecuteParams {
    skipPreflight?: boolean;
    recentBlockHash?: string;
}
interface TxBuilderInit {
    connection: Connection;
    feePayer: PublicKey;
    cluster: Cluster;
    owner?: Owner;
    signAllTransactions?: SignAllTransactions;
}
interface AddInstructionParam {
    addresses?: Record<string, PublicKey>;
    instructions?: TransactionInstruction[];
    endInstructions?: TransactionInstruction[];
    lookupTableAddress?: string[];
    signers?: Signer[];
    instructionTypes?: string[];
    endInstructionTypes?: string[];
}
interface TxBuildData<T = Record<string, any>> {
    builder: TxBuilder;
    transaction: Transaction;
    instructionTypes: string[];
    signers: Signer[];
    execute: (params?: ExecuteParams) => Promise<{
        txId: string;
        signedTx: Transaction;
    }>;
    extInfo: T;
}
interface TxV0BuildData<T = Record<string, any>> extends Omit<TxBuildData<T>, "transaction" | "execute"> {
    builder: TxBuilder;
    transaction: VersionedTransaction;
    buildProps?: {
        lookupTableCache?: CacheLTA;
        lookupTableAddress?: string[];
    };
    execute: (params?: ExecuteParams) => Promise<{
        txId: string;
        signedTx: VersionedTransaction;
    }>;
}
type TxUpdateParams = {
    txId: string;
    status: "success" | "error" | "sent";
    signedTx: Transaction | VersionedTransaction;
};
interface MultiTxExecuteParam extends ExecuteParams {
    sequentially: boolean;
    onTxUpdate?: (completeTxs: TxUpdateParams[]) => void;
}
interface MultiTxBuildData<T = Record<string, any>> {
    builder: TxBuilder;
    transactions: Transaction[];
    instructionTypes: string[];
    signers: Signer[][];
    execute: (executeParams?: MultiTxExecuteParam) => Promise<{
        txIds: string[];
        signedTxs: Transaction[];
    }>;
    extInfo: T;
}
interface MultiTxV0BuildData<T = Record<string, any>> extends Omit<MultiTxBuildData<T>, "transactions" | "execute"> {
    builder: TxBuilder;
    transactions: VersionedTransaction[];
    buildProps?: {
        lookupTableCache?: CacheLTA;
        lookupTableAddress?: string[];
    };
    execute: (executeParams?: MultiTxExecuteParam) => Promise<{
        txIds: string[];
        signedTxs: VersionedTransaction[];
    }>;
}
type MakeMultiTxData<T = TxVersion.LEGACY, O = Record<string, any>> = T extends TxVersion.LEGACY ? MultiTxBuildData<O> : MultiTxV0BuildData<O>;
type MakeTxData<T = TxVersion.LEGACY, O = Record<string, any>> = T extends TxVersion.LEGACY ? TxBuildData<O> : TxV0BuildData<O>;
declare class TxBuilder {
    private connection;
    private owner?;
    private instructions;
    private endInstructions;
    private lookupTableAddress;
    private signers;
    private instructionTypes;
    private endInstructionTypes;
    private feePayer;
    private cluster;
    private signAllTransactions?;
    constructor(params: TxBuilderInit);
    get AllTxData(): {
        instructions: TransactionInstruction[];
        endInstructions: TransactionInstruction[];
        signers: Signer[];
        instructionTypes: string[];
        endInstructionTypes: string[];
        lookupTableAddress: string[];
    };
    get allInstructions(): TransactionInstruction[];
    getComputeBudgetConfig(): Promise<ComputeBudgetConfig | undefined>;
    addCustomComputeBudget(config?: ComputeBudgetConfig): boolean;
    calComputeBudget({ config: propConfig, defaultIns, }: {
        config?: ComputeBudgetConfig;
        defaultIns?: TransactionInstruction[];
    }): Promise<void>;
    addInstruction({ instructions, endInstructions, signers, instructionTypes, endInstructionTypes, lookupTableAddress, }: AddInstructionParam): TxBuilder;
    versionBuild<O = Record<string, any>>({ txVersion, extInfo, }: {
        txVersion?: TxVersion;
        extInfo?: O;
    }): Promise<MakeTxData<TxVersion.LEGACY, O> | MakeTxData<TxVersion.V0, O>>;
    build<O = Record<string, any>>(extInfo?: O): MakeTxData<TxVersion.LEGACY, O>;
    buildMultiTx<T = Record<string, any>>(params: {
        extraPreBuildData?: MakeTxData<TxVersion.LEGACY>[];
        extInfo?: T;
    }): MultiTxBuildData;
    versionMultiBuild<T extends TxVersion, O = Record<string, any>>({ extraPreBuildData, txVersion, extInfo, }: {
        extraPreBuildData?: MakeTxData<TxVersion.V0>[] | MakeTxData<TxVersion.LEGACY>[];
        txVersion?: T;
        extInfo?: O;
    }): Promise<MakeMultiTxData<T, O>>;
    buildV0<O = Record<string, any>>(props?: O & {
        lookupTableCache?: CacheLTA;
        lookupTableAddress?: string[];
        forerunCreate?: boolean;
    }): Promise<MakeTxData<TxVersion.V0, O>>;
    buildV0MultiTx<T = Record<string, any>>(params: {
        extraPreBuildData?: MakeTxData<TxVersion.V0>[];
        buildProps?: T & {
            lookupTableCache?: CacheLTA;
            lookupTableAddress?: string[];
        };
    }): Promise<MultiTxV0BuildData>;
    sizeCheckBuild(props?: Record<string, any> & {
        computeBudgetConfig?: ComputeBudgetConfig;
    }): Promise<MultiTxBuildData>;
    sizeCheckBuildV0(props?: Record<string, any> & {
        computeBudgetConfig?: ComputeBudgetConfig;
        lookupTableCache?: CacheLTA;
        lookupTableAddress?: string[];
    }): Promise<MultiTxV0BuildData>;
}

declare class Fraction {
    readonly numerator: BN__default;
    readonly denominator: BN__default;
    constructor(numerator: BigNumberish, denominator?: BigNumberish);
    get quotient(): BN__default;
    invert(): Fraction;
    add(other: Fraction | BigNumberish): Fraction;
    sub(other: Fraction | BigNumberish): Fraction;
    mul(other: Fraction | BigNumberish): Fraction;
    div(other: Fraction | BigNumberish): Fraction;
    toSignificant(significantDigits: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces: number, format?: object, rounding?: Rounding): string;
    isZero(): boolean;
}

interface PriceProps {
    baseToken: Token;
    denominator: BigNumberish;
    quoteToken: Token;
    numerator: BigNumberish;
}
declare class Price extends Fraction {
    readonly baseToken: Token;
    readonly quoteToken: Token;
    readonly scalar: Fraction;
    constructor(params: PriceProps);
    get raw(): Fraction;
    get adjusted(): Fraction;
    invert(): Price;
    mul(other: Price): Price;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}

declare const _100_PERCENT: Fraction;
declare class Percent extends Fraction {
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}

type TokenInfo = ApiV3Token & {
    priority: number;
    userAdded?: boolean;
    type?: string;
};
interface TokenJson {
    symbol: string;
    name: string;
    mint: string;
    decimals: number;
    extensions: {
        coingeckoId?: string;
    };
    icon: string;
    hasFreeze?: boolean;
}
type SplToken = TokenProps & {
    icon: string;
    id: string;
    extensions: {
        [key in "coingeckoId" | "website" | "whitepaper"]?: string;
    };
    userAdded?: boolean;
};
type LpToken = Token & {
    isLp: true;
    base: SplToken;
    quote: SplToken;
    icon: string;
    /** mint. for `<TokenSelector>`*/
    id: string;
    extensions: {
        [key in "coingeckoId" | "website" | "whitepaper"]?: string;
    };
};

declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
declare const BN_ZERO: BN__default;
declare const BN_ONE: BN__default;
declare const BN_TWO: BN__default;
declare const BN_THREE: BN__default;
declare const BN_FIVE: BN__default;
declare const BN_TEN: BN__default;
declare const BN_100: BN__default;
declare const BN_1000: BN__default;
declare const BN_10000: BN__default;
type BigNumberish = BN__default | string | number | bigint;
type Numberish = number | string | bigint | Fraction | BN__default;
declare function parseBigNumberish(value: BigNumberish): BN__default;
declare function tenExponential(shift: BigNumberish): BN__default;
/**
 *
 * @example
 * getIntInfo(0.34) => { numerator: '34', denominator: '100'}
 * getIntInfo('0.34') //=> { numerator: '34', denominator: '100'}
 */
declare function parseNumberInfo(n: Numberish | undefined): {
    denominator: string;
    numerator: string;
    sign?: string;
    int?: string;
    dec?: string;
};
declare function divCeil(a: BN__default, b: BN__default): BN__default;
declare function shakeFractionDecimal(n: Fraction): string;
declare function toBN(n: Numberish, decimal?: BigNumberish): BN__default;
declare function toFraction(value: Numberish): Fraction;
/**
 * @example
 * toPercent(3.14) // => Percent { 314.00% }
 * toPercent(3.14, { alreadyDecimaled: true }) // => Percent {3.14%}
 */
declare function toPercent(n: Numberish, options?: {
    alreadyDecimaled?: boolean;
}): Percent;
declare function toTokenPrice(params: {
    token: TokenJson | Token | SplToken;
    numberPrice: Numberish;
    decimalDone?: boolean;
}): Price;
declare function toUsdCurrency(amount: Numberish): CurrencyAmount;
declare function toTotalPrice(amount: Numberish | undefined, price: Price | undefined): CurrencyAmount;
declare function decimalToFraction(n: Decimal | undefined): Fraction | undefined;
declare function isDecimal(val: unknown): boolean;
declare function recursivelyDecimalToFraction<T>(info: T): ReplaceType<T, Decimal, Fraction>;

declare function splitNumber(num: string, decimals: number): [string, string];
declare class TokenAmount extends Fraction {
    readonly token: Token;
    protected logger: Logger;
    constructor(token: Token, amount: BigNumberish, isRaw?: boolean, name?: string);
    get raw(): BN__default;
    isZero(): boolean;
    gt(other: TokenAmount): boolean;
    /**
     * a less than b
     */
    lt(other: TokenAmount): boolean;
    add(other: TokenAmount): TokenAmount;
    subtract(other: TokenAmount): TokenAmount;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    /**
     * To fixed
     *
     * @example
     * ```
     * 1 -> 1.000000000
     * 1.234 -> 1.234000000
     * 1.123456789876543 -> 1.123456789
     * ```
     */
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    /**
     * To exact
     *
     * @example
     * ```
     * 1 -> 1
     * 1.234 -> 1.234
     * 1.123456789876543 -> 1.123456789
     * ```
     */
    toExact(format?: object): string;
}
declare class CurrencyAmount extends Fraction {
    readonly currency: Currency;
    protected logger: Logger;
    constructor(currency: Currency, amount: BigNumberish, isRaw?: boolean, name?: string);
    get raw(): BN__default;
    isZero(): boolean;
    /**
     * a greater than b
     */
    gt(other: CurrencyAmount): boolean;
    /**
     * a less than b
     */
    lt(other: CurrencyAmount): boolean;
    add(other: CurrencyAmount): CurrencyAmount;
    sub(other: CurrencyAmount): CurrencyAmount;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    /**
     * To fixed
     *
     * @example
     * ```
     * 1 -> 1.000000000
     * 1.234 -> 1.234000000
     * 1.123456789876543 -> 1.123456789
     * ```
     */
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
    /**
     * To exact
     *
     * @example
     * ```
     * 1 -> 1
     * 1.234 -> 1.234
     * 1.123456789876543 -> 1.123456789
     * ```
     */
    toExact(format?: object): string;
}

type SignAllTransactions = (<T extends Transaction | VersionedTransaction>(transaction: T[]) => Promise<T[]>) | undefined;
interface MakeTransaction<T = Record<string, any>> {
    builder: TxBuilder;
    signers: Signer[];
    transaction: Transaction;
    instructionTypes: string[];
    execute: () => Promise<{
        txId: string;
        signedTx: Transaction;
    }>;
    extInfo: T;
}
interface MakeV0Transaction<T = Record<string, any>> {
    builder: TxBuilder;
    signers: Signer[];
    transaction: VersionedTransaction;
    instructionTypes: string[];
    execute: () => Promise<string>;
    extInfo: T;
}
interface MakeMultiTransaction {
    builder: TxBuilder;
    signers: Signer[][];
    transactions: Transaction[];
    instructionTypes: string[];
    execute: (params?: MultiTxExecuteParam) => Promise<{
        txIds: string[];
        signedTxs: Transaction[];
    }>;
    extInfo: Record<string, any>;
}
interface InstructionReturn {
    instruction: TransactionInstruction;
    instructionType: string;
}
interface ComputeBudgetConfig {
    units?: number;
    microLamports?: number;
}
interface LoadParams {
    forceUpdate?: boolean;
}
interface TransferAmountFee {
    amount: TokenAmount;
    fee: TokenAmount | undefined;
    expirationTime: number | undefined;
}
interface GetTransferAmountFee {
    amount: BN__default;
    fee: BN__default | undefined;
    expirationTime: number | undefined;
}
type ReturnTypeFetchMultipleMintInfo = Mint & {
    feeConfig: TransferFeeConfig | undefined;
};
interface ReturnTypeFetchMultipleMintInfos {
    [mint: string]: ReturnTypeFetchMultipleMintInfo;
}
type Primitive = boolean | number | string | null | undefined | PublicKey;
/**
 *
 * @example
 * ```typescript
 * interface A {
 *   keyA: string;
 *   keyB: string;
 *   map: {
 *     hello: string;
 *     i: number;
 *   };
 *   list: (string | number)[];
 *   keyC: number;
 * }
 *
 * type WrappedA = ReplaceType<A, string, boolean> // {
 *   keyA: boolean;
 *   keyB: boolean;
 *   map: {
 *     hello: boolean;
 *     i: number;
 *   };
 *   list: (number | boolean)[];
 *   keyC: number;
 * }
 * ```
 */
type ReplaceType<Old, From, To> = {
    [T in keyof Old]: Old[T] extends From ? Exclude<Old[T], From> | To : Old[T] extends Primitive ? From extends Old[T] ? Exclude<Old[T], From> | To : Old[T] : ReplaceType<Old[T], From, To>;
};
type MayArray<T> = T | Array<T>;
type MayDeepArray<T> = T | Array<MayDeepArray<T>>;
type MayFunction<T, PS extends any[] = []> = T | ((...Params: PS) => T);
type ArrayItem<T extends ReadonlyArray<any>> = T extends Array<infer P> ? P : never;
type ExactPartial<T, U> = {
    [P in Extract<keyof T, U>]?: T[P];
} & {
    [P in Exclude<keyof T, U>]: T[P];
};
type ExactRequired<T, U> = {
    [P in Extract<keyof T, U>]-?: T[P];
} & {
    [P in Exclude<keyof T, U>]: T[P];
};
/**
 * extract only string and number
 */
type SKeyof<O> = Extract<keyof O, string>;
type GetValue<T, K> = K extends keyof T ? T[K] : undefined;
/**
 * @example
 * type A = { a: number; b: string; c?: string }
 * type B = { a: string; c: string; d?: boolean }
 *
 * type D = SOR<A, B> // { a: number | string; b: string | undefined; c: string | undefined; d: boolean | undefined } // ! if use SOR, you lost union type guard feature, try NOT to use this trick
 */
type SOR<T, U> = {
    [K in keyof T | keyof U]: GetValue<T, K> | GetValue<U, K>;
};
type Fallback<T, FallbackT> = T extends undefined ? FallbackT : T;
/**
 * @example
 * type A = { a: number; b: string; c?: string }
 * type B = { a: string; c: string; d?: boolean }
 *
 * type D = Cover<A, B> // { a: string; b: string; c: string; d?: boolean}
 */
type Cover<O, T> = {
    [K in SKeyof<O> | SKeyof<T>]: Fallback<GetValue<T, K>, GetValue<O, K>>;
};
type UnionCover<O, T> = T extends T ? Cover<O, T> : never;
type MergeArr<Arr> = (Arr extends (infer T)[] ? T : never)[];
/**
 * typescript type helper function
 * @example
 * type A = { hello: string; version: 3 }[]
 * type B = { hello: string; version: 5 }[]
 * type OK = MergeArr<A | B> // ({ hello: string; version: 3 } | { hello: string; version: 5 })[]
 * type Wrong = A | B // { hello: string; version: 3 }[] | { hello: string; version: 5 }[] // <= this type can't have auto type intelligense of array.map
 */
declare const unionArr: <T>(arr: T) => MergeArr<T>;

type FarmVersion = 3 | 4 | 5 | 6;
declare const FARM_LOCK_MINT: PublicKey;
declare const FARM_LOCK_VAULT: PublicKey;
declare const FARM_VERSION_TO_STATE_LAYOUT: {
    [version in FarmVersion]?: FarmStateLayout;
};
declare const FARM_VERSION_TO_LEDGER_LAYOUT: {
    [version in FarmVersion]?: FarmLedgerLayout;
};
declare const isValidFarmVersion: (version: number) => boolean;
declare const validateFarmRewards: (params: {
    version: number;
    rewardInfos: {
        mint: ApiV3Token;
    }[];
    rewardTokenAccountsPublicKeys: PublicKey[];
}) => (() => string | undefined);
declare const poolTypeV6: {
    "Standard SPL": number;
    "Option tokens": number;
};
declare const FARM_PROGRAM_TO_VERSION: Record<string, 3 | 5 | 6>;

type RewardType = keyof typeof poolTypeV6;
interface APIRewardInfo {
    rewardMint: string;
    rewardVault: string;
    rewardOpenTime: number;
    rewardEndTime: number;
    rewardPerSecond: string | number;
    rewardSender?: string;
    rewardType: string;
}
interface RewardInfoWithKey {
    rewardMint: PublicKey;
    rewardVault: PublicKey;
    rewardOpenTime: number;
    rewardEndTime: number;
    rewardType: RewardType;
    rewardPerSecond: string | number;
    rewardSender?: PublicKey;
}
interface FarmRewardInfo {
    mint: PublicKey;
    perSecond: string;
    openTime: number;
    endTime: number;
    rewardType: RewardType;
}
interface FarmRewardInfoConfig {
    isSet: BN__default;
    rewardPerSecond: BN__default;
    rewardOpenTime: BN__default;
    rewardEndTime: BN__default;
    rewardType: BN__default;
}
interface RewardInfoKey {
    rewardMint: PublicKey;
    rewardVault: PublicKey;
    userRewardToken: PublicKey;
}
interface FarmPoolInfoV6 {
    version: number;
    programId: PublicKey;
    lpMint: PublicKey;
    rewardInfos: FarmRewardInfo[];
    lockInfo: {
        lockMint: PublicKey;
        lockVault: PublicKey;
    };
}
interface CreateFarm<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItem;
    rewardInfos: FarmRewardInfo[];
    payer?: PublicKey;
    programId?: PublicKey;
    txVersion?: T;
}
interface CreateFarmExtInfo {
    farmId: PublicKey;
    farmAuthority: PublicKey;
    lpVault: PublicKey;
    lockUserAccount: PublicKey;
    nonce: number;
}
interface UpdateFarmReward<T = TxVersion.LEGACY> {
    farmInfo: FormatFarmInfoOut;
    newRewardInfo: FarmRewardInfo;
    payer?: PublicKey;
    txVersion?: T;
}
interface UpdateFarmRewards<T = TxVersion.LEGACY> {
    farmInfo: FormatFarmInfoOut;
    newRewardInfos: FarmRewardInfo[];
    payer?: PublicKey;
    txVersion?: T;
}
interface FarmDWParam<T = TxVersion.LEGACY> {
    farmInfo: {
        id: string;
        programId: string;
        lpMint: ApiV3Token;
        rewardInfos: {
            mint: ApiV3Token;
        }[];
    };
    amount: BigNumberish;
    feePayer?: PublicKey;
    useSOLBalance?: boolean;
    associatedOnly?: boolean;
    checkCreateATAOwner?: boolean;
    deposited?: BN__default;
    txVersion?: T;
    userAuxiliaryLedgers?: string[];
    computeBudgetConfig?: ComputeBudgetConfig;
}
type FarmPoolKeys = {
    readonly id: PublicKey;
    readonly lpMint: PublicKey;
    readonly version: number;
    readonly programId: PublicKey;
    readonly authority: PublicKey;
    readonly lpVault: PublicKey;
    readonly upcoming: boolean;
    readonly rewardInfos: ({
        readonly rewardMint: PublicKey;
        readonly rewardVault: PublicKey;
    } | {
        readonly rewardMint: PublicKey;
        readonly rewardVault: PublicKey;
        readonly rewardOpenTime: number;
        readonly rewardEndTime: number;
        readonly rewardPerSecond: number;
        readonly rewardType: RewardType;
    })[];
};

declare const associatedLedgerAccountLayout: Structure<number, "", {
    instruction: number;
}>;
declare const withdrawRewardLayout: Structure<number, "", {
    instruction: number;
}>;
declare const realFarmStateV3Layout: Structure<PublicKey | BN__default, "", {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    rewardVault: PublicKey;
    totalReward: BN__default;
    perShareReward: BN__default;
    lastSlot: BN__default;
    perSlotReward: BN__default;
}>;
declare const realFarmStateV5Layout: Structure<number | PublicKey | Buffer | BN__default, "", {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    lastSlot: BN__default;
    rewardVaultA: PublicKey;
    totalRewardA: BN__default;
    perShareRewardA: BN__default;
    perSlotRewardA: BN__default;
    option: number;
    rewardVaultB: PublicKey;
    totalRewardB: BN__default;
    perShareRewardB: BN__default;
    perSlotRewardB: BN__default;
}>;
declare const realFarmV6Layout: Structure<PublicKey | BN__default | BN__default[] | {
    rewardVault: PublicKey;
    totalReward: BN__default;
    rewardState: BN__default;
    rewardOpenTime: BN__default;
    rewardEndTime: BN__default;
    rewardLastUpdateTime: BN__default;
    totalRewardEmissioned: BN__default;
    rewardClaimed: BN__default;
    rewardPerSecond: BN__default;
    accRewardPerShare: BN__default;
    rewardMint: PublicKey;
    rewardSender: PublicKey;
    rewardType: BN__default;
    padding: BN__default[];
}[], "", {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    validRewardTokenNum: BN__default;
    rewardMultiplier: BN__default;
    rewardPeriodMax: BN__default;
    rewardPeriodMin: BN__default;
    rewardPeriodExtend: BN__default;
    lpMint: PublicKey;
    padding: BN__default[];
    rewardInfos: {
        rewardVault: PublicKey;
        totalReward: BN__default;
        rewardState: BN__default;
        rewardOpenTime: BN__default;
        rewardEndTime: BN__default;
        rewardLastUpdateTime: BN__default;
        totalRewardEmissioned: BN__default;
        rewardClaimed: BN__default;
        rewardPerSecond: BN__default;
        accRewardPerShare: BN__default;
        rewardMint: PublicKey;
        rewardSender: PublicKey;
        rewardType: BN__default;
        padding: BN__default[];
    }[];
    creator: PublicKey;
}>;
declare const farmStateV3Layout: GetStructureFromLayoutSchema<{
    version: 3;
    rewardInfos: {
        rewardVault: PublicKey;
        totalReward: BN__default;
        perSlotReward: BN__default;
        perShareReward: BN__default;
    }[];
} & {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    rewardVault: PublicKey;
    totalReward: BN__default;
    perShareReward: BN__default;
    lastSlot: BN__default;
    perSlotReward: BN__default;
}>;
declare const farmStateV5Layout: GetStructureFromLayoutSchema<{
    version: 5;
    rewardInfos: {
        rewardVault: PublicKey;
        totalReward: BN__default;
        perSlotReward: BN__default;
        perShareReward: BN__default;
    }[];
} & {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    lastSlot: BN__default;
    rewardVaultA: PublicKey;
    totalRewardA: BN__default;
    perShareRewardA: BN__default;
    perSlotRewardA: BN__default;
    option: number;
    rewardVaultB: PublicKey;
    totalRewardB: BN__default;
    perShareRewardB: BN__default;
    perSlotRewardB: BN__default;
}>;
declare const farmStateV6Layout: GetStructureFromLayoutSchema<{
    version: 6;
    rewardInfos: {
        rewardState: BN__default;
        rewardOpenTime: BN__default;
        rewardEndTime: BN__default;
        rewardLastUpdateTime: BN__default;
        totalReward: BN__default;
        totalRewardEmissioned: BN__default;
        rewardClaimed: BN__default;
        rewardPerSecond: BN__default;
        accRewardPerShare: BN__default;
        rewardVault: PublicKey;
        rewardMint: PublicKey;
        rewardSender: PublicKey;
        rewardType: RewardType;
    }[];
} & {
    state: BN__default;
    nonce: BN__default;
    lpVault: PublicKey;
    validRewardTokenNum: BN__default;
    rewardMultiplier: BN__default;
    rewardPeriodMax: BN__default;
    rewardPeriodMin: BN__default;
    rewardPeriodExtend: BN__default;
    lpMint: PublicKey;
    padding: BN__default[];
    rewardInfos: {
        rewardVault: PublicKey;
        totalReward: BN__default;
        rewardState: BN__default;
        rewardOpenTime: BN__default;
        rewardEndTime: BN__default;
        rewardLastUpdateTime: BN__default;
        totalRewardEmissioned: BN__default;
        rewardClaimed: BN__default;
        rewardPerSecond: BN__default;
        accRewardPerShare: BN__default;
        rewardMint: PublicKey;
        rewardSender: PublicKey;
        rewardType: BN__default;
        padding: BN__default[];
    }[];
    creator: PublicKey;
}>;
declare const farmRewardTimeInfoLayout: Structure<BN__default, "", {
    rewardOpenTime: BN__default;
    rewardEndTime: BN__default;
    rewardPerSecond: BN__default;
    rewardType: BN__default;
    isSet: BN__default;
}>;
declare const farmRewardLayout: Structure<number | BN__default | {
    rewardOpenTime: BN__default;
    rewardEndTime: BN__default;
    rewardPerSecond: BN__default;
    rewardType: BN__default;
    isSet: BN__default;
}[], "", {
    nonce: BN__default;
    instruction: number;
    rewardTimeInfo: {
        rewardOpenTime: BN__default;
        rewardEndTime: BN__default;
        rewardPerSecond: BN__default;
        rewardType: BN__default;
        isSet: BN__default;
    }[];
}>;
declare const farmRewardRestartLayout: Structure<number | BN__default, "", {
    rewardEndTime: BN__default;
    rewardPerSecond: BN__default;
    instruction: number;
    rewardReopenTime: BN__default;
}>;
declare const farmAddRewardLayout: Structure<number | BN__default, "", {
    rewardOpenTime: BN__default;
    rewardEndTime: BN__default;
    rewardPerSecond: BN__default;
    rewardType: BN__default;
    instruction: number;
    isSet: BN__default;
}>;
type FarmStateLayoutV3 = typeof farmStateV3Layout;
type FarmStateLayoutV5 = typeof farmStateV5Layout;
type FarmStateLayoutV6 = typeof farmStateV6Layout;
type FarmStateV3 = GetStructureSchema<FarmStateLayoutV3>;
type FarmStateV5 = GetStructureSchema<FarmStateLayoutV5>;
type FarmStateV6 = GetStructureSchema<FarmStateLayoutV6>;
type FarmState = FarmStateV3 | FarmStateV5 | FarmStateV6;
type FarmStateLayout = FarmStateLayoutV3 | FarmStateLayoutV5 | FarmStateLayoutV6;
declare const farmLedgerLayoutV3_1: Structure<PublicKey | BN__default | BN__default[], "", {
    state: BN__default;
    id: PublicKey;
    owner: PublicKey;
    deposited: BN__default;
    rewardDebts: BN__default[];
}>;
declare const farmLedgerLayoutV3_2: Structure<PublicKey | BN__default | BN__default[], "", {
    state: BN__default;
    id: PublicKey;
    owner: PublicKey;
    deposited: BN__default;
    rewardDebts: BN__default[];
    voteLockedBalance: BN__default;
}>;
declare const farmLedgerLayoutV5_1: Structure<PublicKey | BN__default | BN__default[], "", {
    state: BN__default;
    id: PublicKey;
    owner: PublicKey;
    deposited: BN__default;
    rewardDebts: BN__default[];
}>;
declare const farmLedgerLayoutV5_2: Structure<PublicKey | BN__default | BN__default[], "", {
    state: BN__default;
    id: PublicKey;
    owner: PublicKey;
    deposited: BN__default;
    rewardDebts: BN__default[];
}>;
declare const farmLedgerLayoutV6_1: Structure<PublicKey | BN__default | BN__default[], "", {
    state: BN__default;
    id: PublicKey;
    owner: PublicKey;
    deposited: BN__default;
    rewardDebts: BN__default[];
}>;
type FarmLedgerLayoutV3_1 = typeof farmLedgerLayoutV3_1;
type FarmLedgerLayoutV3_2 = typeof farmLedgerLayoutV3_2;
type FarmLedgerLayoutV5_1 = typeof farmLedgerLayoutV5_1;
type FarmLedgerLayoutV5_2 = typeof farmLedgerLayoutV5_2;
type FarmLedgerLayoutV6_1 = typeof farmLedgerLayoutV6_1;
type FarmLedgerLayout = FarmLedgerLayoutV3_1 | FarmLedgerLayoutV3_2 | FarmLedgerLayoutV5_1 | FarmLedgerLayoutV5_2 | FarmLedgerLayoutV6_1;
type FarmLedgerV3_1 = GetStructureSchema<FarmLedgerLayoutV3_1>;
type FarmLedgerV3_2 = GetStructureSchema<FarmLedgerLayoutV3_2>;
type FarmLedgerV5_1 = GetStructureSchema<FarmLedgerLayoutV5_1>;
type FarmLedgerV5_2 = GetStructureSchema<FarmLedgerLayoutV5_2>;
type FarmLedgerV6_1 = GetStructureSchema<FarmLedgerLayoutV6_1>;
type FarmLedger = FarmLedgerV3_1 | FarmLedgerV3_2 | FarmLedgerV5_1 | FarmLedgerV5_2 | FarmLedgerV6_1;
declare const dwLayout: Structure<number | BN__default, "", {
    instruction: number;
    amount: BN__default;
}>;
declare const VoterVotingMintConfig: Structure<PublicKey | number[] | BN__default | BN__default[], "", {
    mint: PublicKey;
    grantAuthority: PublicKey;
    baselineVoteWeightScaledFactor: BN__default;
    maxExtraLockupVoteWeightScaledFactor: BN__default;
    lockupSaturationSecs: BN__default;
    digitShift: BN__default;
    reserved1: number[];
    reserved2: BN__default[];
}>;
declare const VoterRegistrar: Structure<number | PublicKey | number[] | Buffer | BN__default | BN__default[] | {
    mint: PublicKey;
    grantAuthority: PublicKey;
    baselineVoteWeightScaledFactor: BN__default;
    maxExtraLockupVoteWeightScaledFactor: BN__default;
    lockupSaturationSecs: BN__default;
    digitShift: BN__default;
    reserved1: number[];
    reserved2: BN__default[];
}[], "", {
    reserved1: number[];
    reserved2: number[];
    governanceProgramId: PublicKey;
    realm: PublicKey;
    realmGoverningTokenMint: PublicKey;
    realmAuthority: PublicKey;
    votingMints: {
        mint: PublicKey;
        grantAuthority: PublicKey;
        baselineVoteWeightScaledFactor: BN__default;
        maxExtraLockupVoteWeightScaledFactor: BN__default;
        lockupSaturationSecs: BN__default;
        digitShift: BN__default;
        reserved1: number[];
        reserved2: BN__default[];
    }[];
    timeOffset: BN__default;
    bump: number;
    reserved3: BN__default[];
}>;
declare const VoterLockup: Structure<number | number[] | BN__default, "", {
    startTime: BN__default;
    endTime: BN__default;
    kind: number;
    reserved: number[];
}>;
declare const VoterDepositEntry: Structure<number | boolean | number[] | BN__default | {
    startTime: BN__default;
    endTime: BN__default;
    kind: number;
    reserved: number[];
}[], "", {
    reserved: number[];
    lockup: {
        startTime: BN__default;
        endTime: BN__default;
        kind: number;
        reserved: number[];
    }[];
    amountDeposited_native: BN__default;
    amountInitiallyLockedNative: BN__default;
    isUsed: boolean;
    allowClawback: boolean;
    votingMintConfigIdx: number;
}>;
declare const Voter: Structure<number | PublicKey | number[] | Buffer | {
    reserved: number[];
    lockup: {
        startTime: BN__default;
        endTime: BN__default;
        kind: number;
        reserved: number[];
    }[];
    amountDeposited_native: BN__default;
    amountInitiallyLockedNative: BN__default;
    isUsed: boolean;
    allowClawback: boolean;
    votingMintConfigIdx: number;
}[], "", {
    reserved: number[];
    voterAuthority: PublicKey;
    registrar: PublicKey;
    deposits: {
        reserved: number[];
        lockup: {
            startTime: BN__default;
            endTime: BN__default;
            kind: number;
            reserved: number[];
        }[];
        amountDeposited_native: BN__default;
        amountInitiallyLockedNative: BN__default;
        isUsed: boolean;
        allowClawback: boolean;
        votingMintConfigIdx: number;
    }[];
    voterBump: number;
    voterWweightRecordBump: number;
}>;

type LiquidityVersion = 4 | 5;
interface ApiPoolInfoV4 {
    id: string;
    baseMint: string;
    quoteMint: string;
    lpMint: string;
    baseDecimals: number;
    quoteDecimals: number;
    lpDecimals: number;
    version: 4;
    programId: string;
    authority: string;
    openOrders: string;
    targetOrders: string;
    baseVault: string;
    quoteVault: string;
    withdrawQueue: string;
    lpVault: string;
    marketVersion: 3;
    marketProgramId: string;
    marketId: string;
    marketAuthority: string;
    marketBaseVault: string;
    marketQuoteVault: string;
    marketBids: string;
    marketAsks: string;
    marketEventQueue: string;
    lookupTableAccount: string;
}
interface FarmRewardInfoV6 {
    rewardMint: string;
    rewardVault: string;
    rewardOpenTime: number;
    rewardEndTime: number;
    rewardPerSecond: number;
    rewardSender: string;
}
interface ApiStakePoolInfo {
    id: string;
    symbol: string;
    lpMint: string;
    version: FarmVersion;
    programId: string;
    authority: string;
    lpVault: string;
    rewardInfos: FarmRewardInfo[] | FarmRewardInfoV6[];
    upcoming: boolean;
}
interface ApiClmmConfigInfo {
    id: string;
    index: number;
    protocolFeeRate: number;
    tradeFeeRate: number;
    tickSpacing: number;
    fundFeeRate: number;
    description: string;
    defaultRange: number;
    defaultRangePoint: number[];
}
interface ApiClmmPoolsItemStatistics {
    volume: number;
    volumeFee: number;
    feeA: number;
    feeB: number;
    feeApr: number;
    rewardApr: {
        A: number;
        B: number;
        C: number;
    };
    apr: number;
    priceMin: number;
    priceMax: number;
}
/** ====== v3 api types ======= */
interface ApiV3PageIns<T> {
    count: number;
    hasNextPage: boolean;
    data: T[];
}
declare enum JupTokenType {
    ALL = "all",
    Strict = "strict"
}
type PoolsApiReturn = ApiV3PageIns<ApiV3PoolInfoItem>;
interface TransferFeeDataBaseType {
    transferFeeConfigAuthority: string;
    withdrawWithheldAuthority: string;
    withheldAmount: string;
    olderTransferFee: {
        epoch: string;
        maximumFee: string;
        transferFeeBasisPoints: number;
    };
    newerTransferFee: {
        epoch: string;
        maximumFee: string;
        transferFeeBasisPoints: number;
    };
}
type ExtensionsItem = {
    coingeckoId?: string;
    feeConfig?: TransferFeeDataBaseType;
};
type ApiV3Token = {
    chainId: number;
    address: string;
    programId: string;
    logoURI: string;
    symbol: string;
    name: string;
    decimals: number;
    tags: string[];
    extensions: ExtensionsItem;
};
type ApiV3TokenRes = {
    mintList: ApiV3Token[];
    blacklist: ApiV3Token[];
    whiteList: string[];
};
interface ApiV3PoolInfoCountItem {
    volume: number;
    volumeQuote: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
    priceMin: number;
    priceMax: number;
    rewardApr: number[];
}
type PoolTypeItem = "StablePool" | "OpenBookMarket";
type FarmRewardInfoOld = {
    mint: ApiV3Token;
    perSecond: number;
};
type PoolFarmRewardInfo = FarmRewardInfoOld & {
    startTime?: number;
    endTime?: number;
};
interface PoolRewardInfoItem {
    mint: ApiV3Token;
    perSecond?: number;
    startTime?: number;
    endTime?: number;
}
interface ApiV3PoolInfoBaseItem {
    programId: string;
    id: string;
    mintA: ApiV3Token;
    mintB: ApiV3Token;
    rewardDefaultInfos: PoolFarmRewardInfo[];
    rewardDefaultPoolInfos: "Ecosystem" | "Fusion" | "Raydium" | "Clmm";
    price: number;
    mintAmountA: number;
    mintAmountB: number;
    feeRate: number;
    openTime: string;
    tvl: number;
    day: ApiV3PoolInfoCountItem;
    week: ApiV3PoolInfoCountItem;
    month: ApiV3PoolInfoCountItem;
    pooltype: PoolTypeItem[];
    farmUpcomingCount: number;
    farmOngoingCount: number;
    farmFinishedCount: number;
}
type ApiV3PoolInfoConcentratedItem = ApiV3PoolInfoBaseItem & {
    type: "Concentrated";
    config: ApiClmmConfigV3;
};
type ApiV3PoolInfoStandardItem = ApiV3PoolInfoBaseItem & {
    type: "Standard";
    marketId: string;
    configId: string;
    lpPrice: number;
    lpAmount: number;
    lpMint: ApiV3Token;
};
type ApiV3PoolInfoStandardItemCpmm = ApiV3PoolInfoBaseItem & {
    type: "Standard";
    lpMint: ApiV3Token;
    lpPrice: number;
    lpAmount: number;
    config: ApiCpmmConfigV3;
};
type ApiV3PoolInfoItem = ApiV3PoolInfoConcentratedItem | ApiV3PoolInfoStandardItem | ApiV3PoolInfoStandardItemCpmm;
declare enum PoolFetchType {
    All = "all",
    Standard = "standard",
    Concentrated = "concentrated",
    AllFarm = "allFarm",
    StandardFarm = "standardFarm",
    ConcentratedFarm = "concentratedFarm"
}
interface FetchPoolParams {
    type?: PoolFetchType;
    sort?: "liquidity" | "volume24h" | "volume7d" | "volume30d" | "fee24h" | "fee7d" | "fee30d" | "apr24h" | "apr7d" | "apr30d";
    order?: "desc" | "asc";
    pageSize?: number;
    page?: number;
}
interface Point {
    time: number;
    liquidity: number;
}
interface LiquidityLineApi {
    count: number;
    line: Point[];
}
interface Base {
    programId: string;
    id: string;
    mintA: ApiV3Token;
    mintB: ApiV3Token;
    lookupTableAccount?: string;
    openTime: string;
    vault: {
        A: string;
        B: string;
    };
}
interface _Amm {
    authority: string;
    openOrders: string;
    targetOrders: string;
    mintLp: ApiV3Token;
}
interface ApiCpmmConfigV3 {
    id: string;
    index: number;
    protocolFeeRate: number;
    tradeFeeRate: number;
    fundFeeRate: number;
    createPoolFee: string;
}
interface _Cpmm {
    authority: string;
    mintLp: ApiV3Token;
    config: ApiCpmmConfigV3;
}
interface _Market {
    marketProgramId: string;
    marketId: string;
    marketAuthority: string;
    marketBaseVault: string;
    marketQuoteVault: string;
    marketBids: string;
    marketAsks: string;
    marketEventQueue: string;
}
type AmmV4Keys = Base & _Amm & _Market;
type AmmV5Keys = Base & _Amm & _Market & {
    modelDataAccount: string;
};
type CpmmKeys = Base & _Cpmm;
interface ClmmRewardType {
    mint: ApiV3Token;
    vault: string;
}
type ClmmKeys = Base & {
    config: ApiClmmConfigV3;
    rewardInfos: ClmmRewardType[];
};
type PoolKeys = AmmV4Keys | AmmV5Keys | ClmmKeys | CpmmKeys;
interface ApiClmmConfigV3 {
    id: string;
    index: number;
    protocolFeeRate: number;
    tradeFeeRate: number;
    tickSpacing: number;
    fundFeeRate: number;
    description: string;
    defaultRange: number;
    defaultRangePoint: number[];
}
interface RpcItemA {
    url: string;
    weight: number;
    batch: boolean;
    name: string;
}
interface RpcItemB {
    url: string;
    batch: boolean;
    name: string;
}
type RpcStrategy = "speed" | "first";
type RpcTypeWeight = {
    strategy: "weight";
    rpcs: RpcItemA[];
};
type RpcTypeOther = {
    strategy: RpcStrategy;
    rpcs: RpcItemB[];
};
type RpcType = RpcTypeWeight | RpcTypeOther;
type FarmRewardTypeV6Key = "Standard SPL" | "Option tokens";
interface RewardKeyInfoV345 {
    mint: ApiV3Token;
    vault: string;
    type: FarmRewardTypeV6Key;
    perSecond: number;
    perBlock: number;
}
interface RewardKeyInfoV6 {
    mint: ApiV3Token;
    vault: string;
    type: FarmRewardTypeV6Key;
    perSecond: number;
    openTime: string;
    endTime: string;
    sender: string;
}
interface FormatFarmKeyOutBase {
    programId: string;
    id: string;
    symbolMints: ApiV3Token[];
    lpMint: ApiV3Token;
    authority: string;
    lpVault: string;
}
type FormatFarmKeyOutV345 = FormatFarmKeyOutBase & {
    rewardInfos: RewardKeyInfoV345[];
};
type FormatFarmKeyOutV6 = FormatFarmKeyOutBase & {
    config: {
        periodMax: number;
        periodMin: number;
        periodExtend: number;
    };
    rewardInfos: RewardKeyInfoV6[];
};
type FormatFarmKeyOut = FormatFarmKeyOutV345 | FormatFarmKeyOutV6;
interface RewardInfoV345 {
    mint: ApiV3Token;
    type: FarmRewardTypeV6Key;
    apr: number;
    perSecond: string;
}
interface RewardInfoV6 {
    mint: ApiV3Token;
    type: FarmRewardTypeV6Key;
    apr: number;
    perSecond: string;
    openTime: string;
    endTime: string;
}
type FarmTagsItem = "Ecosystem" | "Farm" | "Fusion" | "Stake";
interface FormatFarmInfoOutBase {
    programId: string;
    id: string;
    symbolMints: ApiV3Token[];
    lpMint: ApiV3Token;
    tvl: number;
    lpPrice: number;
    apr: number;
    tags: FarmTagsItem[];
}
type FormatFarmInfoOutV345 = FormatFarmInfoOutBase & {
    rewardInfos: RewardInfoV345[];
};
type FormatFarmInfoOutV6 = FormatFarmInfoOutBase & {
    rewardInfos: RewardInfoV6[];
};
type FormatFarmInfoOut = FormatFarmInfoOutV345 | FormatFarmInfoOutV6;
interface AvailabilityCheckAPI3 {
    all: boolean;
    swap: boolean;
    createConcentratedPosition: boolean;
    addConcentratedPosition: boolean;
    addStandardPosition: boolean;
    removeConcentratedPosition: boolean;
    removeStandardPosition: boolean;
    addFarm: boolean;
    removeFarm: boolean;
}
type OwnerCreatedFarmInfo = {
    farm: {
        id: string;
        programId: string;
    }[];
    clmm: {
        id: string;
        programId: string;
    }[];
};
type OwnerIdoInfo = Record<string, {
    programId: string;
    poolId: string;
    coin: string;
    pc: string;
}>;
type IdoKeysData = {
    programId: string;
    id: string;
    authority: string;
    projectInfo: {
        mint: ApiV3Token;
        vault: string;
    };
    buyInfo: {
        mint: ApiV3Token;
        vault: string;
    };
};
interface ApiStakePool {
    programId: string;
    id: string;
    apr: number;
    lpMint: ApiV3Token;
    lpPrice: number;
    symbolMints: ApiV3Token[];
    tvl: number;
    tags: FarmTagsItem[];
    rewardInfos: RewardInfoV345[];
}
type FarmPositionData = Record<string, Record<string, Record<string, {
    programId: string;
    lpAmount: string;
    version: "V1" | "V2";
}>>>;

export { Rounding as $, ApiPoolInfoV4 as A, FarmRewardTypeV6Key as B, CpmmKeys as C, RewardKeyInfoV345 as D, RewardKeyInfoV6 as E, FarmRewardInfoV6 as F, FormatFarmKeyOutV345 as G, FormatFarmKeyOutV6 as H, FormatFarmKeyOut as I, JupTokenType as J, RewardInfoV345 as K, LiquidityVersion as L, RewardInfoV6 as M, FarmTagsItem as N, FormatFarmInfoOutBase as O, PoolsApiReturn as P, FormatFarmInfoOutV345 as Q, RpcItemA as R, FormatFarmInfoOutV6 as S, TransferFeeDataBaseType as T, FormatFarmInfoOut as U, AvailabilityCheckAPI3 as V, OwnerCreatedFarmInfo as W, OwnerIdoInfo as X, IdoKeysData as Y, ApiStakePool as Z, FarmPositionData as _, ApiStakePoolInfo as a, FarmLedgerLayoutV6_1 as a$, BN_ZERO as a0, BN_ONE as a1, BN_TWO as a2, BN_THREE as a3, BN_FIVE as a4, BN_TEN as a5, BN_100 as a6, BN_1000 as a7, BN_10000 as a8, BigNumberish as a9, realFarmStateV3Layout as aA, realFarmStateV5Layout as aB, realFarmV6Layout as aC, farmStateV3Layout as aD, farmStateV5Layout as aE, farmStateV6Layout as aF, farmRewardTimeInfoLayout as aG, farmRewardLayout as aH, farmRewardRestartLayout as aI, farmAddRewardLayout as aJ, FarmStateLayoutV3 as aK, FarmStateLayoutV5 as aL, FarmStateLayoutV6 as aM, FarmStateV3 as aN, FarmStateV5 as aO, FarmStateV6 as aP, FarmState as aQ, FarmStateLayout as aR, farmLedgerLayoutV3_1 as aS, farmLedgerLayoutV3_2 as aT, farmLedgerLayoutV5_1 as aU, farmLedgerLayoutV5_2 as aV, farmLedgerLayoutV6_1 as aW, FarmLedgerLayoutV3_1 as aX, FarmLedgerLayoutV3_2 as aY, FarmLedgerLayoutV5_1 as aZ, FarmLedgerLayoutV5_2 as a_, Numberish as aa, parseBigNumberish as ab, tenExponential as ac, parseNumberInfo as ad, divCeil as ae, shakeFractionDecimal as af, toBN as ag, toFraction as ah, toPercent as ai, toTokenPrice as aj, toUsdCurrency as ak, toTotalPrice as al, decimalToFraction as am, isDecimal as an, recursivelyDecimalToFraction as ao, AddInstructionParam as ap, TxBuildData as aq, TxV0BuildData as ar, MultiTxExecuteParam as as, MultiTxBuildData as at, MultiTxV0BuildData as au, MakeMultiTxData as av, MakeTxData as aw, TxBuilder as ax, associatedLedgerAccountLayout as ay, withdrawRewardLayout as az, ApiClmmConfigInfo as b, unionArr as b$, FarmLedgerLayout as b0, FarmLedgerV3_1 as b1, FarmLedgerV3_2 as b2, FarmLedgerV5_1 as b3, FarmLedgerV5_2 as b4, FarmLedgerV6_1 as b5, FarmLedger as b6, dwLayout as b7, VoterVotingMintConfig as b8, VoterRegistrar as b9, TokenJson as bA, SplToken as bB, LpToken as bC, SignAllTransactions as bD, MakeTransaction as bE, MakeV0Transaction as bF, MakeMultiTransaction as bG, InstructionReturn as bH, ComputeBudgetConfig as bI, LoadParams as bJ, TransferAmountFee as bK, GetTransferAmountFee as bL, ReturnTypeFetchMultipleMintInfo as bM, ReturnTypeFetchMultipleMintInfos as bN, ReplaceType as bO, MayArray as bP, MayDeepArray as bQ, MayFunction as bR, ArrayItem as bS, ExactPartial as bT, ExactRequired as bU, SKeyof as bV, GetValue as bW, SOR as bX, Fallback as bY, Cover as bZ, UnionCover as b_, VoterLockup as ba, VoterDepositEntry as bb, Voter as bc, RewardType as bd, APIRewardInfo as be, RewardInfoWithKey as bf, FarmRewardInfo as bg, FarmRewardInfoConfig as bh, RewardInfoKey as bi, FarmPoolInfoV6 as bj, CreateFarm as bk, CreateFarmExtInfo as bl, UpdateFarmReward as bm, UpdateFarmRewards as bn, FarmDWParam as bo, FarmPoolKeys as bp, FarmVersion as bq, FARM_LOCK_MINT as br, FARM_LOCK_VAULT as bs, FARM_VERSION_TO_STATE_LAYOUT as bt, FARM_VERSION_TO_LEDGER_LAYOUT as bu, isValidFarmVersion as bv, validateFarmRewards as bw, poolTypeV6 as bx, FARM_PROGRAM_TO_VERSION as by, TokenInfo as bz, ApiClmmPoolsItemStatistics as c, splitNumber as c0, TokenAmount as c1, CurrencyAmount as c2, Fraction as c3, _100_PERCENT as c4, Percent as c5, Price as c6, ApiV3PageIns as d, ApiV3Token as e, ApiV3TokenRes as f, ApiV3PoolInfoCountItem as g, PoolFarmRewardInfo as h, PoolRewardInfoItem as i, ApiV3PoolInfoBaseItem as j, ApiV3PoolInfoConcentratedItem as k, ApiV3PoolInfoStandardItem as l, ApiV3PoolInfoStandardItemCpmm as m, ApiV3PoolInfoItem as n, PoolFetchType as o, FetchPoolParams as p, Point as q, LiquidityLineApi as r, AmmV4Keys as s, AmmV5Keys as t, ClmmRewardType as u, ClmmKeys as v, PoolKeys as w, ApiClmmConfigV3 as x, RpcItemB as y, RpcType as z };
