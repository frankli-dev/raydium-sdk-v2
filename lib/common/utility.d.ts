import { PublicKey } from '@solana/web3.js';
import { bO as ReplaceType } from '../type-7ae06f8f.js';
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

declare function sleep(ms: number): Promise<void>;
declare function getTimestamp(): number;
declare function notInnerObject(v: unknown): v is Record<string, any>;
declare function jsonInfo2PoolKeys<T>(jsonInfo: T): ReplaceType<T, string, PublicKey>;

export { getTimestamp, jsonInfo2PoolKeys, notInnerObject, sleep };
