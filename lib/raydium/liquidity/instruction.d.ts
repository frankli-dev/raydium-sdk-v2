import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import { bH as InstructionReturn, s as AmmV4Keys, t as AmmV5Keys } from '../../type-7ae06f8f.js';
import { LiquidityAddInstructionParams, RemoveLiquidityInstruction, SwapFixedInInstructionParamsV4, SwapFixedOutInstructionParamsV4, SwapInstructionParams, InitPoolInstructionParamsV4 } from './type.js';
import BN__default from 'bn.js';
import '@solana/spl-token';
import '../../solana/type.js';
import '../../common/txTool/txType.js';
import '../../common/owner.js';
import '../../common/txTool/lookupTable.js';
import 'decimal.js';
import '../../module/token.js';
import '../../common/pubKey.js';
import '../../marshmallow/index.js';
import '../../marshmallow/buffer-layout.js';
import '../../common/logger.js';
import '../../module/currency.js';

declare function makeAddLiquidityInstruction(params: LiquidityAddInstructionParams): TransactionInstruction;
declare function removeLiquidityInstruction(params: RemoveLiquidityInstruction): TransactionInstruction;
declare function createPoolV4InstructionV2({ programId, ammId, ammAuthority, ammOpenOrders, lpMint, coinMint, pcMint, coinVault, pcVault, withdrawQueue, ammTargetOrders, poolTempLp, marketProgramId, marketId, userWallet, userCoinVault, userPcVault, userLpVault, nonce, openTime, coinAmount, pcAmount, ammConfigId, feeDestinationId, }: {
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
    userWallet: PublicKey;
    userCoinVault: PublicKey;
    userPcVault: PublicKey;
    userLpVault: PublicKey;
    ammConfigId: PublicKey;
    feeDestinationId: PublicKey;
    nonce: number;
    openTime: BN__default;
    coinAmount: BN__default;
    pcAmount: BN__default;
}): InstructionReturn;
declare function simulatePoolInfoInstruction(poolKeys: AmmV4Keys | AmmV5Keys): TransactionInstruction;
declare function makeSwapFixedInInstruction({ poolKeys: propPoolKeys, userKeys, amountIn, minAmountOut }: SwapFixedInInstructionParamsV4, version: number): TransactionInstruction;
declare function makeSwapFixedOutInstruction({ poolKeys: propPoolKeys, userKeys, maxAmountIn, amountOut }: SwapFixedOutInstructionParamsV4, version: number): TransactionInstruction;
declare function makeAMMSwapInstruction(params: SwapInstructionParams): TransactionInstruction;
declare function makeInitPoolInstructionV4({ poolKeys: propPoolKeys, userKeys, startTime, }: InitPoolInstructionParamsV4): TransactionInstruction;
declare function makeSimulatePoolInfoInstruction({ poolKeys }: {
    poolKeys: AmmV4Keys | AmmV5Keys;
}): {
    instruction: TransactionInstruction;
};

export { createPoolV4InstructionV2, makeAMMSwapInstruction, makeAddLiquidityInstruction, makeInitPoolInstructionV4, makeSimulatePoolInfoInstruction, makeSwapFixedInInstruction, makeSwapFixedOutInstruction, removeLiquidityInstruction, simulatePoolInfoInstruction };
