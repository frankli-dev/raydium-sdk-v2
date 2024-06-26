import { PublicKey } from '@solana/web3.js';
import { l as ApiV3PoolInfoStandardItem, c1 as TokenAmount, bI as ComputeBudgetConfig, s as AmmV4Keys, t as AmmV5Keys, a9 as BigNumberish } from '../../type-7ae06f8f.js';
import { TxVersion } from '../../common/txTool/txType.js';
import BN__default from 'bn.js';
import '@solana/spl-token';
import '../../solana/type.js';
import '../../common/owner.js';
import '../../common/txTool/lookupTable.js';
import 'decimal.js';
import '../../module/token.js';
import '../../common/pubKey.js';
import '../../marshmallow/index.js';
import '../../marshmallow/buffer-layout.js';
import '../../common/logger.js';
import '../../module/currency.js';

type LiquiditySide = "a" | "b";
type AmountSide = "base" | "quote";
interface AddLiquidityParams<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItem;
    payer?: PublicKey;
    amountInA: TokenAmount;
    amountInB: TokenAmount;
    fixedSide: LiquiditySide;
    config?: {
        bypassAssociatedCheck?: boolean;
        checkCreateATAOwner?: boolean;
    };
    txVersion?: T;
    computeBudgetConfig?: ComputeBudgetConfig;
}
interface RemoveParams<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItem;
    payer?: PublicKey;
    amountIn: BN__default;
    config?: {
        bypassAssociatedCheck?: boolean;
        checkCreateATAOwner?: boolean;
    };
    txVersion?: T;
    computeBudgetConfig?: ComputeBudgetConfig;
}
interface LiquidityUserKeys {
    baseTokenAccount: PublicKey;
    quoteTokenAccount: PublicKey;
    lpTokenAccount: PublicKey;
    owner: PublicKey;
}
interface LiquidityAddInstructionParams {
    poolInfo: ApiV3PoolInfoStandardItem;
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: LiquidityUserKeys;
    baseAmountIn: BigNumberish;
    quoteAmountIn: BigNumberish;
    fixedSide: AmountSide;
}
interface RemoveLiquidityInstruction {
    poolInfo: ApiV3PoolInfoStandardItem;
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: LiquidityUserKeys;
    amountIn: BigNumberish;
}
interface LiquidityPoolKeys {
    id: PublicKey;
    baseMint: PublicKey;
    quoteMint: PublicKey;
    lpMint: PublicKey;
    baseDecimals: number;
    quoteDecimals: number;
    lpDecimals: number;
    version: 4 | 5;
    programId: PublicKey;
    authority: PublicKey;
    nonce: number;
    baseVault: PublicKey;
    quoteVault: PublicKey;
    lpVault: PublicKey;
    openOrders: PublicKey;
    targetOrders: PublicKey;
    withdrawQueue: PublicKey;
    marketVersion: 3;
    marketProgramId: PublicKey;
    marketId: PublicKey;
    marketAuthority: PublicKey;
    lookupTableAccount: PublicKey;
    configId: PublicKey;
}
interface CreatePoolParam<T> {
    programId: PublicKey;
    marketInfo: {
        marketId: PublicKey;
        programId: PublicKey;
    };
    baseMintInfo: {
        mint: PublicKey;
        decimals: number;
    };
    quoteMintInfo: {
        mint: PublicKey;
        decimals: number;
    };
    baseAmount: BN__default;
    quoteAmount: BN__default;
    startTime: BN__default;
    ownerInfo: {
        feePayer?: PublicKey;
        useSOLBalance?: boolean;
    };
    associatedOnly: boolean;
    checkCreateATAOwner?: boolean;
    tokenProgram?: PublicKey;
    feeDestinationId: PublicKey;
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
}
interface CreatePoolAddress {
    programId: PublicKey;
    ammId: PublicKey;
    ammAuthority: PublicKey;
    ammOpenOrders: PublicKey;
    lpMint: PublicKey;
    coinMint: PublicKey;
    pcMint: PublicKey;
    coinVault: PublicKey;
    pcVault: PublicKey;
    withdrawQueue: PublicKey;
    ammTargetOrders: PublicKey;
    poolTempLp: PublicKey;
    marketProgramId: PublicKey;
    marketId: PublicKey;
    ammConfigId: PublicKey;
    feeDestinationId: PublicKey;
}
interface SwapFixedInInstructionParamsV4 {
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: {
        tokenAccountIn: PublicKey;
        tokenAccountOut: PublicKey;
        owner: PublicKey;
    };
    amountIn: BigNumberish;
    minAmountOut: BigNumberish;
}
interface SwapFixedOutInstructionParamsV4 {
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: {
        tokenAccountIn: PublicKey;
        tokenAccountOut: PublicKey;
        owner: PublicKey;
    };
    maxAmountIn: BigNumberish;
    amountOut: BigNumberish;
}
type SwapSide = "in" | "out";
interface SwapInstructionParams {
    version: number;
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: {
        tokenAccountIn: PublicKey;
        tokenAccountOut: PublicKey;
        owner: PublicKey;
    };
    amountIn: BigNumberish;
    amountOut: BigNumberish;
    fixedSide: SwapSide;
}
interface InitPoolInstructionParamsV4 {
    poolKeys: AmmV4Keys | AmmV5Keys;
    userKeys: {
        lpTokenAccount: PublicKey;
        payer: PublicKey;
    };
    startTime: BigNumberish;
}
interface ComputeAmountOutParam {
    poolInfo: ApiV3PoolInfoStandardItem & {
        baseReserve: BN__default;
        quoteReserve: BN__default;
    };
    mintIn: string | PublicKey;
    mintOut: string | PublicKey;
    amountIn: BN__default;
    slippage: number;
}
interface SwapParam<T = TxVersion.LEGACY> {
    poolInfo: ApiV3PoolInfoStandardItem;
    associatedOnly: boolean;
    amountIn: BN__default;
    amountOut: BN__default;
    inputMint: string;
    fixedSide: SwapSide;
    computeBudgetConfig?: ComputeBudgetConfig;
    txVersion?: T;
}

export { AddLiquidityParams, AmountSide, ComputeAmountOutParam, CreatePoolAddress, CreatePoolParam, InitPoolInstructionParamsV4, LiquidityAddInstructionParams, LiquidityPoolKeys, LiquiditySide, LiquidityUserKeys, RemoveLiquidityInstruction, RemoveParams, SwapFixedInInstructionParamsV4, SwapFixedOutInstructionParamsV4, SwapInstructionParams, SwapParam, SwapSide };
