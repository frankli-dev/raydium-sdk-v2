import { PublicKey } from '@solana/web3.js';
import { e as ApiV3Token } from '../../type-7ae06f8f.js';
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

interface PurchaseInstructionKeys {
    idoId: PublicKey;
    authority: PublicKey;
    poolQuoteTokenAccount: PublicKey;
    userQuoteTokenAccount: PublicKey;
    userIdoInfo: PublicKey;
    userStakeInfo?: PublicKey;
    userIdoCheck: PublicKey;
    userOwner: PublicKey;
}
interface ClaimInstructionKeys {
    idoId: PublicKey;
    authority: PublicKey;
    poolQuoteTokenAccount: PublicKey;
    poolBaseTokenAccount: PublicKey;
    userQuoteTokenAccount: PublicKey;
    userBaseTokenAccount: PublicKey;
    userIdoInfo: PublicKey;
    userOwner: PublicKey;
}
interface ClaimInstructionKeysV3 {
    idoId: PublicKey;
    authority: PublicKey;
    poolTokenAccount: PublicKey;
    userTokenAccount: PublicKey;
    userIdoInfo: PublicKey;
    userOwner: PublicKey;
}
type IdoVersion = 3;
type SnapshotVersion = 1;
interface IdoPoolConfig {
    id: PublicKey;
    programId: PublicKey;
    authority: PublicKey;
    baseVault: PublicKey;
    quoteVault: PublicKey;
    baseToken: ApiV3Token;
    quoteToken: ApiV3Token;
}
interface IdoUserKeys {
    baseTokenAccount: PublicKey;
    quoteTokenAccount: PublicKey;
    ledgerAccount: PublicKey;
    owner: PublicKey;
}
interface IdoClaimInstructionParams {
    poolConfig: IdoPoolConfig;
    userKeys: IdoUserKeys;
    side: "base" | "quote";
}

export { ClaimInstructionKeys, ClaimInstructionKeysV3, IdoClaimInstructionParams, IdoPoolConfig, IdoUserKeys, IdoVersion, PurchaseInstructionKeys, SnapshotVersion };
