import { bz as TokenInfo } from '../../type-7ae06f8f.js';
import '@solana/web3.js';
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

declare const SOL_INFO: TokenInfo;
declare const TOKEN_WSOL: TokenInfo;

export { SOL_INFO, TOKEN_WSOL };
