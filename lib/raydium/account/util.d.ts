import { PublicKey, AccountInfo, RpcResponseAndContext, GetProgramAccountsResponse } from '@solana/web3.js';
import { TokenAccount, TokenAccountRaw } from './types.js';
import 'bn.js';
import '../../type-7ae06f8f.js';
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
import './layout.js';

interface ParseTokenAccount {
    owner: PublicKey;
    solAccountResp?: AccountInfo<Buffer> | null;
    tokenAccountResp: RpcResponseAndContext<GetProgramAccountsResponse>;
}
declare function parseTokenAccountResp({ owner, solAccountResp, tokenAccountResp }: ParseTokenAccount): {
    tokenAccounts: TokenAccount[];
    tokenAccountRawInfos: TokenAccountRaw[];
};
declare function generatePubKey({ fromPublicKey, programId, }: {
    fromPublicKey: PublicKey;
    programId: PublicKey;
}): {
    publicKey: PublicKey;
    seed: string;
};

export { ParseTokenAccount, generatePubKey, parseTokenAccountResp };
