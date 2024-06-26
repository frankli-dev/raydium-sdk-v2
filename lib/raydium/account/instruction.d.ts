import { PublicKey, TransactionInstruction, Signer, Connection, Commitment } from '@solana/web3.js';
import { ap as AddInstructionParam, a9 as BigNumberish } from '../../type-7ae06f8f.js';
import 'bn.js';
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

declare function initTokenAccountInstruction(params: {
    mint: PublicKey;
    tokenAccount: PublicKey;
    owner: PublicKey;
    programId?: PublicKey;
}): TransactionInstruction;
declare function closeAccountInstruction(params: {
    tokenAccount: PublicKey;
    payer: PublicKey;
    multiSigners?: Signer[];
    owner: PublicKey;
    programId?: PublicKey;
}): TransactionInstruction;
interface CreateWSolTokenAccount {
    connection: Connection;
    payer: PublicKey;
    owner: PublicKey;
    amount: BigNumberish;
    commitment?: Commitment;
    skipCloseAccount?: boolean;
}
/**
 * WrappedNative account = wsol account
 */
declare function createWSolAccountInstructions(params: CreateWSolTokenAccount): Promise<AddInstructionParam & {
    addresses: {
        newAccount: PublicKey;
    };
}>;
declare function makeTransferInstruction({ source, destination, owner, amount, multiSigners, tokenProgram, }: {
    source: PublicKey;
    destination: PublicKey;
    owner: PublicKey;
    amount: BigNumberish;
    multiSigners?: Signer[];
    tokenProgram?: PublicKey;
}): TransactionInstruction;

export { closeAccountInstruction, createWSolAccountInstructions, initTokenAccountInstruction, makeTransferInstruction };
