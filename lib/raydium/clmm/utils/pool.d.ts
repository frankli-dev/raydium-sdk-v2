import { PublicKey, Connection, EpochInfo } from '@solana/web3.js';
import BN__default from 'bn.js';
import { d as ComputeClmmPoolInfo, P as TickArray, T as TickArrayBitmapExtensionType, c as ClmmPoolInfo, o as ClmmPoolRewardLayoutInfo, b as ClmmPoolRewardInfo, z as ReturnTypeFetchExBitmaps, l as ReturnTypeFetchMultiplePoolTickArrays, S as SDKParsedConcentratedInfo, k as ReturnTypeComputeAmountOut, j as ReturnTypeComputeAmountOutFormat, h as ReturnTypeGetLiquidityAmountOut } from '../../../type-25785933.js';
import { k as ApiV3PoolInfoConcentratedItem, e as ApiV3Token } from '../../../type-7ae06f8f.js';
import { TokenAccountRaw } from '../../account/types.js';
import Decimal from 'decimal.js';
import '../../../common/txTool/txType.js';
import '../layout.js';
import '../../../marshmallow/index.js';
import '../../../marshmallow/buffer-layout.js';
import '@solana/spl-token';
import '../../../solana/type.js';
import '../../../common/owner.js';
import '../../../common/txTool/lookupTable.js';
import '../../../module/token.js';
import '../../../common/pubKey.js';
import '../../../common/logger.js';
import '../../../module/currency.js';
import '../../account/layout.js';

declare class PoolUtils {
    static getOutputAmountAndRemainAccounts(poolInfo: ComputeClmmPoolInfo, tickArrayCache: {
        [key: string]: TickArray;
    }, inputTokenMint: PublicKey, inputAmount: BN__default, sqrtPriceLimitX64?: BN__default): {
        expectedAmountOut: BN__default;
        remainingAccounts: PublicKey[];
        executionPrice: BN__default;
        feeAmount: BN__default;
    };
    static getInputAmountAndRemainAccounts(poolInfo: ComputeClmmPoolInfo, tickArrayCache: {
        [key: string]: TickArray;
    }, outputTokenMint: PublicKey, outputAmount: BN__default, sqrtPriceLimitX64?: BN__default): {
        expectedAmountIn: BN__default;
        remainingAccounts: PublicKey[];
        executionPrice: BN__default;
        feeAmount: BN__default;
    };
    static getFirstInitializedTickArray(poolInfo: ComputeClmmPoolInfo, zeroForOne: boolean): {
        isExist: true;
        startIndex: number;
        nextAccountMeta: PublicKey;
    } | {
        isExist: false;
        startIndex: undefined;
        nextAccountMeta: undefined;
    };
    static preInitializedTickArrayStartIndex(poolInfo: ComputeClmmPoolInfo, zeroForOne: boolean): {
        isExist: boolean;
        nextStartIndex: number;
    };
    static nextInitializedTickArrayStartIndex(poolInfo: {
        tickCurrent: number;
        tickSpacing: number;
        tickArrayBitmap: BN__default[];
        exBitmapInfo: TickArrayBitmapExtensionType;
    } | ClmmPoolInfo, lastTickArrayStartIndex: number, zeroForOne: boolean): {
        isExist: boolean;
        nextStartIndex: number;
    };
    static updatePoolRewardInfos({ connection, apiPoolInfo, chainTime, poolLiquidity, rewardInfos, }: {
        connection: Connection;
        apiPoolInfo: ApiV3PoolInfoConcentratedItem;
        chainTime: number;
        poolLiquidity: BN__default;
        rewardInfos: ClmmPoolRewardLayoutInfo[];
    }): Promise<ClmmPoolRewardInfo[]>;
    static isOverflowDefaultTickarrayBitmap(tickSpacing: number, tickarrayStartIndexs: number[]): boolean;
    static tickRange(tickSpacing: number): {
        maxTickBoundary: number;
        minTickBoundary: number;
    };
    static get_tick_array_offset(tickarrayStartIndex: number, tickSpacing: number): number;
    static fetchExBitmaps({ connection, exBitmapAddress, batchRequest, }: {
        connection: Connection;
        exBitmapAddress: PublicKey[];
        batchRequest: boolean;
    }): Promise<ReturnTypeFetchExBitmaps>;
    static fetchMultiplePoolTickArrays({ connection, poolKeys, batchRequest, }: {
        connection: Connection;
        poolKeys: ComputeClmmPoolInfo[];
        batchRequest?: boolean;
    }): Promise<ReturnTypeFetchMultiplePoolTickArrays>;
    static fetchPoolsAccountPosition({ pools, connection, ownerInfo, batchRequest, updateOwnerRewardAndFee, }: {
        pools: SDKParsedConcentratedInfo[];
        connection: Connection;
        ownerInfo: {
            wallet: PublicKey;
            tokenAccounts: TokenAccountRaw[];
        };
        batchRequest?: boolean;
        updateOwnerRewardAndFee?: boolean;
    }): Promise<SDKParsedConcentratedInfo[]>;
    static computeAmountOut({ poolInfo, tickArrayCache, baseMint, epochInfo, amountIn, slippage, priceLimit, }: {
        poolInfo: ComputeClmmPoolInfo;
        tickArrayCache: {
            [key: string]: TickArray;
        };
        baseMint: PublicKey;
        epochInfo: EpochInfo;
        amountIn: BN__default;
        slippage: number;
        priceLimit?: Decimal;
    }): ReturnTypeComputeAmountOut;
    static computeAmountOutFormat({ poolInfo, tickArrayCache, amountIn, tokenOut: _tokenOut, slippage, epochInfo, }: {
        poolInfo: ComputeClmmPoolInfo;
        tickArrayCache: {
            [key: string]: TickArray;
        };
        amountIn: BN__default;
        tokenOut: ApiV3Token;
        slippage: number;
        epochInfo: EpochInfo;
    }): Promise<ReturnTypeComputeAmountOutFormat>;
    static estimateAprsForPriceRangeMultiplier({ poolInfo, aprType, positionTickLowerIndex, positionTickUpperIndex, }: {
        poolInfo: ApiV3PoolInfoConcentratedItem;
        aprType: "day" | "week" | "month";
        positionTickLowerIndex: number;
        positionTickUpperIndex: number;
    }): {
        feeApr: number;
        rewardsApr: number[];
        apr: number;
    };
    static estimateAprsForPriceRangeDelta({ poolInfo, poolLiquidity, aprType, mintPrice, liquidity, positionTickLowerIndex, positionTickUpperIndex, chainTime, }: {
        poolInfo: ApiV3PoolInfoConcentratedItem;
        poolLiquidity: BN__default;
        aprType: "day" | "week" | "month";
        mintPrice: {
            [mint: string]: {
                value: number;
            };
        };
        liquidity: BN__default;
        positionTickLowerIndex: number;
        positionTickUpperIndex: number;
        chainTime: number;
    }): {
        feeApr: number;
        rewardsApr: number[];
        apr: number;
    };
    static getLiquidityAmountOutFromAmountIn({ poolInfo, inputA, tickLower, tickUpper, amount, slippage, add, epochInfo, amountHasFee, }: {
        poolInfo: ApiV3PoolInfoConcentratedItem;
        inputA: boolean;
        tickLower: number;
        tickUpper: number;
        amount: BN__default;
        slippage: number;
        add: boolean;
        epochInfo: EpochInfo;
        amountHasFee: boolean;
    }): Promise<ReturnTypeGetLiquidityAmountOut>;
    static getAmountsFromLiquidity({ epochInfo, poolInfo, tickLower, tickUpper, liquidity, slippage, add, }: {
        epochInfo: EpochInfo;
        poolInfo: ApiV3PoolInfoConcentratedItem;
        tickLower: number;
        tickUpper: number;
        liquidity: BN__default;
        slippage: number;
        add: boolean;
    }): Promise<ReturnTypeGetLiquidityAmountOut>;
    static fetchComputeClmmInfo({ owner, connection, poolInfo, }: {
        owner: PublicKey;
        connection: Connection;
        poolInfo: ApiV3PoolInfoConcentratedItem;
    }): Promise<ComputeClmmPoolInfo>;
}
declare function getLiquidityFromAmounts({ poolInfo, tickLower, tickUpper, amountA, amountB, slippage, add, epochInfo, amountHasFee, }: {
    poolInfo: ApiV3PoolInfoConcentratedItem;
    tickLower: number;
    tickUpper: number;
    amountA: BN__default;
    amountB: BN__default;
    slippage: number;
    add: boolean;
    epochInfo: EpochInfo;
    amountHasFee: boolean;
}): ReturnTypeGetLiquidityAmountOut;

export { PoolUtils, getLiquidityFromAmounts };
