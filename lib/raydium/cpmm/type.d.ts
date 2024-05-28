import { PublicKey, EpochInfo } from '@solana/web3.js';
import { e as ApiV3Token, bI as ComputeBudgetConfig, m as ApiV3PoolInfoStandardItemCpmm, c5 as Percent, bL as GetTransferAmountFee } from '../../type-7ae06f8f.js';
import { TxVersion } from '../../common/txTool/txType.js';
import BN__default from 'bn.js';
import { SwapResult } from './curve/calculator.js';
import Decimal from 'decimal.js';
import '@solana/spl-token';
import '../../solana/type.js';
import '../../common/owner.js';
import '../../common/txTool/lookupTable.js';
import '../../module/token.js';
import '../../common/pubKey.js';
import '../../marshmallow/index.js';
import '../../marshmallow/buffer-layout.js';
import '../../common/logger.js';
import '../../module/currency.js';

interface CpmmConfigInfoInterface {
    bump: number;
    disableCreatePool: boolean;
    index: number;
    tradeFeeRate: BN__default;
    protocolFeeRate: BN__default;
    fundFeeRate: BN__default;
    createPoolFee: BN__default;
    protocolOwner: PublicKey;
    fundOwner: PublicKey;
}
interface CpmmPoolInfoInterface {
    configId: PublicKey;
    poolCreator: PublicKey;
    vaultA: PublicKey;
    vaultB: PublicKey;
    mintLp: PublicKey;
    mintA: PublicKey;
    mintB: PublicKey;
    mintProgramA: PublicKey;
    mintProgramB: PublicKey;
    observationId: PublicKey;
    bump: number;
    status: number;
    lpDecimals: number;
    mintDecimalA: number;
    mintDecimalB: number;
    lpAmount: BN__default;
    protocolFeesMintA: BN__default;
    protocolFeesMintB: BN__default;
    fundFeesMintA: BN__default;
    fundFeesMintB: BN__default;
    openTime: BN__default;
}
interface CreateCpmmPoolParam<T> {
    programId: PublicKey;
    poolFeeAccount: PublicKey;
    mintA: Pick<ApiV3Token, "address" | "decimals" | "programId">;
    mintB: Pick<ApiV3Token, "address" | "decimals" | "programId">;
    mintAAmount: BN__default;
    mintBAmount: BN__default;
    startTime: BN__default;
    associatedOnly: boolean;
    checkCreateATAOwner?: boolean;
    ownerInfo: {
        feePayer?: PublicKey;
        useSOLBalance?: boolean;
    };
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
}
interface CreateCpmmPoolAddress {
    poolId: PublicKey;
    configId: PublicKey;
    authority: PublicKey;
    lpMint: PublicKey;
    vaultA: PublicKey;
    vaultB: PublicKey;
    observationId: PublicKey;
    mintA: ApiV3Token;
    mintB: ApiV3Token;
    programId: PublicKey;
    poolFeeAccount: PublicKey;
}
interface AddCpmmLiquidityParams<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItemCpmm;
    payer?: PublicKey;
    inputAmount: BN__default;
    baseIn: boolean;
    slippage: Percent;
    config?: {
        bypassAssociatedCheck?: boolean;
        checkCreateATAOwner?: boolean;
    };
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
    computeResult?: {
        inputAmountFee: GetTransferAmountFee;
        anotherAmount: GetTransferAmountFee;
        maxAnotherAmount: GetTransferAmountFee;
        liquidity: BN__default;
    };
}
interface WithdrawCpmmLiquidityParams<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItemCpmm;
    payer?: PublicKey;
    lpAmount: BN__default;
    slippage: Percent;
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
}
interface CpmmSwapParams<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItemCpmm;
    payer?: PublicKey;
    baseIn: boolean;
    swapResult: SwapResult;
    config?: {
        bypassAssociatedCheck?: boolean;
        checkCreateATAOwner?: boolean;
    };
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
}
interface ComputePairAmountParams {
    poolInfo: ApiV3PoolInfoStandardItemCpmm;
    amount: string | Decimal;
    slippage: Percent;
    epochInfo: EpochInfo;
    baseIn?: boolean;
}

export { AddCpmmLiquidityParams, ComputePairAmountParams, CpmmConfigInfoInterface, CpmmPoolInfoInterface, CpmmSwapParams, CreateCpmmPoolAddress, CreateCpmmPoolParam, WithdrawCpmmLiquidityParams };
