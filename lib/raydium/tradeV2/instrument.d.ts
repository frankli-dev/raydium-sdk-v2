import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import BN__default from 'bn.js';
import { n as ApiV3PoolInfoItem, w as PoolKeys } from '../../type-7ae06f8f.js';
import { ReturnTypeMakeSwapInstruction, ComputeAmountOutLayout } from './type.js';
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
import '../../type-25785933.js';
import '../clmm/layout.js';

declare function route1Instruction(programId: PublicKey, poolInfoA: ApiV3PoolInfoItem, poolKeyA: PoolKeys, poolKeyB: PoolKeys, userSourceToken: PublicKey, userRouteToken: PublicKey, userPdaAccount: PublicKey, ownerWallet: PublicKey, inputMint: PublicKey, amountIn: BN__default, amountOut: BN__default, tickArrayA?: PublicKey[]): TransactionInstruction;
declare function route2Instruction(programId: PublicKey, poolInfoB: ApiV3PoolInfoItem, poolKeyA: PoolKeys, poolKeyB: PoolKeys, userRouteToken: PublicKey, userDestinationToken: PublicKey, userPdaAccount: PublicKey, ownerWallet: PublicKey, routeMint: PublicKey, tickArrayB?: PublicKey[]): TransactionInstruction;
declare function routeInstruction(programId: PublicKey, wallet: PublicKey, userSourceToken: PublicKey, userRouteToken: PublicKey, userDestinationToken: PublicKey, inputMint: string, routeMint: string, poolInfoA: ApiV3PoolInfoItem, poolInfoB: ApiV3PoolInfoItem, poolKeyA: PoolKeys, poolKeyB: PoolKeys, amountIn: BN__default, amountOut: BN__default, remainingAccounts: (PublicKey[] | undefined)[]): TransactionInstruction;
type MakeSwapInstructionParam = {
    ownerInfo: {
        wallet: PublicKey;
        sourceToken: PublicKey;
        routeToken?: PublicKey;
        destinationToken: PublicKey;
    };
    inputMint: PublicKey;
    routeProgram: PublicKey;
    swapInfo: ComputeAmountOutLayout;
};
declare function makeSwapInstruction({ routeProgram, ownerInfo, inputMint, swapInfo, }: MakeSwapInstructionParam): Promise<ReturnTypeMakeSwapInstruction>;

export { makeSwapInstruction, route1Instruction, route2Instruction, routeInstruction };
