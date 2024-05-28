import { PublicKey, Keypair, Signer, TransactionInstruction, Transaction } from '@solana/web3.js';
import BN__default from 'bn.js';
import { bK as TransferAmountFee, c6 as Price, c5 as Percent, c1 as TokenAmount, n as ApiV3PoolInfoItem, w as PoolKeys } from '../../type-7ae06f8f.js';
import { Token } from '../../module/token.js';
import { c as ClmmPoolInfo } from '../../type-25785933.js';
import '@solana/spl-token';
import '../../solana/type.js';
import '../../common/txTool/txType.js';
import '../../common/owner.js';
import '../../common/txTool/lookupTable.js';
import 'decimal.js';
import '../../marshmallow/index.js';
import '../../marshmallow/buffer-layout.js';
import '../../common/logger.js';
import '../../module/currency.js';
import '../../common/pubKey.js';
import '../clmm/layout.js';

interface ComputeAmountOutAmmLayout {
    amountIn: TransferAmountFee;
    amountOut: TransferAmountFee;
    minAmountOut: TransferAmountFee;
    currentPrice: Price | undefined;
    executionPrice: Price | null;
    priceImpact: Percent;
    fee: TokenAmount[];
    routeType: "amm";
    poolInfo: ApiV3PoolInfoItem[];
    poolKey: PoolKeys[];
    remainingAccounts: PublicKey[][];
    poolReady: boolean;
    poolType: "CLMM" | "STABLE" | undefined;
    feeConfig?: {
        feeAmount: BN__default;
        feeAccount: PublicKey;
    };
    expirationTime: number | undefined;
}
interface ComputeAmountOutRouteLayout {
    amountIn: TransferAmountFee;
    amountOut: TransferAmountFee;
    minAmountOut: TransferAmountFee;
    currentPrice: Price | undefined;
    executionPrice: Price | null;
    priceImpact: Percent;
    fee: TokenAmount[];
    routeType: "route";
    poolInfo: ApiV3PoolInfoItem[];
    poolKey: PoolKeys[];
    remainingAccounts: (PublicKey[] | undefined)[];
    minMiddleAmountFee: TokenAmount | undefined;
    middleToken: Token;
    poolReady: boolean;
    poolType: (string | undefined)[];
    feeConfig?: {
        feeAmount: BN__default;
        feeAccount: PublicKey;
    };
    expirationTime: number | undefined;
}
type ComputeAmountOutLayout = ComputeAmountOutAmmLayout | ComputeAmountOutRouteLayout;
type MakeSwapInstructionParam = {
    ownerInfo: {
        wallet: PublicKey;
        sourceToken: PublicKey;
        routeToken?: PublicKey;
        destinationToken: PublicKey;
        userPdaAccount?: PublicKey;
    };
    inputMint: PublicKey;
    routeProgram: PublicKey;
    swapInfo: ComputeAmountOutLayout;
};
interface PoolAccountInfoV4 {
    ammId: string;
    status: BN__default;
    baseDecimals: number;
    quoteDecimals: number;
    lpDecimals: number;
    baseReserve: BN__default;
    quoteReserve: BN__default;
    lpSupply: BN__default;
    startTime: BN__default;
}
interface ReturnTypeFetchMultipleInfo {
    [ammId: string]: PoolAccountInfoV4;
}
type ReturnTypeGetAddLiquidityDefaultPool = ApiV3PoolInfoItem | undefined;
interface ReturnTypeMakeSwapInstruction {
    signers: (Keypair | Signer)[];
    instructions: TransactionInstruction[];
    instructionTypes: string[];
    address: {
        [key: string]: PublicKey;
    };
    lookupTableAddress: string[];
}
interface ReturnTypeMakeSwapTransaction {
    transactions: {
        transaction: Transaction;
        signer: (Keypair | Signer)[];
    }[];
    address: {
        [key: string]: PublicKey;
    };
}
type RoutePathType = {
    [routeMint: string]: {
        mintProgram: PublicKey;
        in: PoolKeys[];
        out: PoolKeys[];
        mDecimals: number;
    };
};
interface ReturnTypeGetAllRoute {
    directPath: PoolKeys[];
    addLiquidityPools: ApiV3PoolInfoItem[];
    routePathDict: RoutePathType;
    needSimulate: ApiV3PoolInfoItem[];
    needTickArray: ClmmPoolInfo[];
    needCheckToken: string[];
}

export { ComputeAmountOutAmmLayout, ComputeAmountOutLayout, ComputeAmountOutRouteLayout, MakeSwapInstructionParam, PoolAccountInfoV4, ReturnTypeFetchMultipleInfo, ReturnTypeGetAddLiquidityDefaultPool, ReturnTypeGetAllRoute, ReturnTypeMakeSwapInstruction, ReturnTypeMakeSwapTransaction, RoutePathType };
