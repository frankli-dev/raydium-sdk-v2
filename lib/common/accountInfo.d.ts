import { Commitment, Connection, PublicKey, AccountInfo } from '@solana/web3.js';
import { bN as ReturnTypeFetchMultipleMintInfos } from '../type-7ae06f8f.js';
import 'bn.js';
import '@solana/spl-token';
import '../solana/type.js';
import './txTool/txType.js';
import './owner.js';
import './txTool/lookupTable.js';
import 'decimal.js';
import '../module/token.js';
import './pubKey.js';
import '../marshmallow/index.js';
import '../marshmallow/buffer-layout.js';
import './logger.js';
import '../module/currency.js';

interface GetMultipleAccountsInfoConfig {
    batchRequest?: boolean;
    commitment?: Commitment;
}
declare function getMultipleAccountsInfo(connection: Connection, publicKeys: PublicKey[], config?: GetMultipleAccountsInfoConfig): Promise<(AccountInfo<Buffer> | null)[]>;
declare function getMultipleAccountsInfoWithCustomFlags<T extends {
    pubkey: PublicKey;
}>(connection: Connection, publicKeysWithCustomFlag: T[], config?: GetMultipleAccountsInfoConfig): Promise<({
    accountInfo: AccountInfo<Buffer> | null;
} & T)[]>;
declare enum AccountType {
    Uninitialized = 0,
    Mint = 1,
    Account = 2
}
declare const ACCOUNT_TYPE_SIZE = 1;
declare function fetchMultipleMintInfos({ connection, mints, }: {
    connection: Connection;
    mints: PublicKey[];
}): Promise<ReturnTypeFetchMultipleMintInfos>;

export { ACCOUNT_TYPE_SIZE, AccountType, GetMultipleAccountsInfoConfig, fetchMultipleMintInfos, getMultipleAccountsInfo, getMultipleAccountsInfoWithCustomFlags };
