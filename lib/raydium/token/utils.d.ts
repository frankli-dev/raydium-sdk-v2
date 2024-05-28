import { Connection, PublicKey } from '@solana/web3.js';
import { RawMint } from '@solana/spl-token';
import { bz as TokenInfo, a9 as BigNumberish, c1 as TokenAmount, e as ApiV3Token } from '../../type-7ae06f8f.js';
import { Token } from '../../module/token.js';
import 'bn.js';
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

declare const parseTokenInfo: ({ connection, mint, }: {
    connection: Connection;
    mint: PublicKey | string;
}) => Promise<RawMint | undefined>;
declare const toTokenInfo: ({ mint, decimals, programId, logoURI, priority, }: {
    mint: PublicKey;
    decimals: number;
    programId?: PublicKey | string;
    priority?: number;
    logoURI?: string;
}) => TokenInfo;
declare const toToken: (props: Omit<TokenInfo, "priority">) => Token;
declare const toTokenAmount: ({ amount, isRaw, name, ...props }: Omit<TokenInfo, "priority"> & {
    amount: BigNumberish;
    isRaw?: boolean;
    name?: string;
}) => TokenAmount;
declare function solToWSolToken<T extends ApiV3Token | TokenInfo>(token: T): T;
declare function wSolToSolToken<T extends ApiV3Token | TokenInfo>(token: T): T;

export { parseTokenInfo, solToWSolToken, toToken, toTokenAmount, toTokenInfo, wSolToSolToken };
