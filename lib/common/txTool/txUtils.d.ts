import { TransactionInstruction, Connection, PublicKey, Transaction, EpochInfo, VersionedTransaction } from '@solana/web3.js';
import { CacheLTA } from './lookupTable.js';
import { bI as ComputeBudgetConfig } from '../../type-7ae06f8f.js';
import 'bn.js';
import '@solana/spl-token';
import '../../solana/type.js';
import './txType.js';
import '../owner.js';
import 'decimal.js';
import '../../module/token.js';
import '../pubKey.js';
import '../../marshmallow/index.js';
import '../../marshmallow/buffer-layout.js';
import '../logger.js';
import '../../module/currency.js';

declare const MAX_BASE64_SIZE = 1644;
declare function addComputeBudget(config: ComputeBudgetConfig): {
    instructions: TransactionInstruction[];
    instructionTypes: string[];
};
declare function getRecentBlockHash(connection: Connection): Promise<string>;
/**
 * Forecast transaction size
 */
declare function forecastTransactionSize(instructions: TransactionInstruction[], signers: PublicKey[]): boolean;
/**
 * Simulates multiple instruction
 */
/**
 * Simulates multiple instruction
 */
declare function simulateMultipleInstruction(connection: Connection, instructions: TransactionInstruction[], keyword: string, batchRequest?: boolean): Promise<string[]>;
declare function parseSimulateLogToJson(log: string, keyword: string): any;
declare function parseSimulateValue(log: string, key: string): any;
interface ProgramAddress {
    publicKey: PublicKey;
    nonce: number;
}
declare function findProgramAddress(seeds: Array<Buffer | Uint8Array>, programId: PublicKey): {
    publicKey: PublicKey;
    nonce: number;
};
declare function simulateTransaction(connection: Connection, transactions: Transaction[], batchRequest?: boolean): Promise<any[]>;
declare function checkLegacyTxSize({ instructions, payer, signers, }: {
    instructions: TransactionInstruction[];
    payer: PublicKey;
    signers: PublicKey[];
}): boolean;
declare function checkV0TxSize({ instructions, payer, lookupTableAddressAccount, recentBlockhash, }: {
    instructions: TransactionInstruction[];
    payer: PublicKey;
    lookupTableAddressAccount?: CacheLTA;
    recentBlockhash?: string;
}): boolean;
declare function getEpochInfo(connection: Connection): Promise<EpochInfo>;
declare const toBuffer: (arr: Buffer | Uint8Array | Array<number>) => Buffer;
declare function printSimulate(transactions: Transaction[] | VersionedTransaction[]): string[];

export { MAX_BASE64_SIZE, ProgramAddress, addComputeBudget, checkLegacyTxSize, checkV0TxSize, findProgramAddress, forecastTransactionSize, getEpochInfo, getRecentBlockHash, parseSimulateLogToJson, parseSimulateValue, printSimulate, simulateMultipleInstruction, simulateTransaction, toBuffer };
