import { PublicKey, Connection } from '@solana/web3.js';
import BN__default from 'bn.js';
import { T as TickArrayBitmapExtensionType, P as TickArray, N as Tick } from '../../../type-25785933.js';
import 'decimal.js';
import '../../../type-7ae06f8f.js';
import '@solana/spl-token';
import '../../../solana/type.js';
import '../../../common/txTool/txType.js';
import '../../../common/owner.js';
import '../../../common/txTool/lookupTable.js';
import '../../../module/token.js';
import '../../../common/pubKey.js';
import '../../../marshmallow/index.js';
import '../../../marshmallow/buffer-layout.js';
import '../../../common/logger.js';
import '../../../module/currency.js';
import '../layout.js';

declare const FETCH_TICKARRAY_COUNT = 15;
declare type PoolVars = {
    key: PublicKey;
    tokenA: PublicKey;
    tokenB: PublicKey;
    fee: number;
};
declare class TickQuery {
    static getTickArrays(connection: Connection, programId: PublicKey, poolId: PublicKey, tickCurrent: number, tickSpacing: number, tickArrayBitmapArray: BN__default[], exTickArrayBitmap: TickArrayBitmapExtensionType): Promise<{
        [key: string]: TickArray;
    }>;
    static nextInitializedTick(programId: PublicKey, poolId: PublicKey, tickArrayCache: {
        [key: string]: TickArray;
    }, tickIndex: number, tickSpacing: number, zeroForOne: boolean): {
        nextTick: Tick;
        tickArrayAddress: PublicKey | undefined;
        tickArrayStartTickIndex: number;
    };
    static nextInitializedTickArray(tickIndex: number, tickSpacing: number, zeroForOne: boolean, tickArrayBitmap: BN__default[], exBitmapInfo: TickArrayBitmapExtensionType): {
        isExist: boolean;
        nextStartIndex: number;
    };
    static firstInitializedTickInOneArray(programId: PublicKey, poolId: PublicKey, tickArray: TickArray, zeroForOne: boolean): {
        nextTick: Tick | undefined;
        tickArrayAddress: PublicKey;
        tickArrayStartTickIndex: number;
    };
    static nextInitializedTickInOneArray(programId: PublicKey, poolId: PublicKey, tickArrayCache: {
        [key: string]: TickArray;
    }, tickIndex: number, tickSpacing: number, zeroForOne: boolean): {
        initializedTick: Tick | undefined;
        tickArrayAddress: PublicKey | undefined;
        tickArrayStartTickIndex: number;
    };
    static getArrayStartIndex(tickIndex: number, tickSpacing: number): number;
    static checkIsValidStartIndex(tickIndex: number, tickSpacing: number): boolean;
    static tickCount(tickSpacing: number): number;
}

export { FETCH_TICKARRAY_COUNT, PoolVars, TickQuery };
