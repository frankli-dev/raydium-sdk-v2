import { EpochInfo } from '@solana/web3.js';
import { TransferFeeConfig } from '@solana/spl-token';
import BN__default from 'bn.js';
import { bL as GetTransferAmountFee, T as TransferFeeDataBaseType } from '../type-7ae06f8f.js';
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

declare function getTransferAmountFee(amount: BN__default, feeConfig: TransferFeeConfig | undefined, epochInfo: EpochInfo, addFee: boolean): GetTransferAmountFee;
declare function getTransferAmountFeeV2(amount: BN__default, _feeConfig: TransferFeeDataBaseType | undefined, epochInfo: EpochInfo, addFee: boolean): GetTransferAmountFee;
declare function minExpirationTime(expirationTime1: number | undefined, expirationTime2: number | undefined): number | undefined;
declare function BNDivCeil(bn1: BN__default, bn2: BN__default): BN__default;

export { BNDivCeil, getTransferAmountFee, getTransferAmountFeeV2, minExpirationTime };
