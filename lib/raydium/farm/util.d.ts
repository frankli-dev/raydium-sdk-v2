import { PublicKey, Connection } from '@solana/web3.js';
import BN__default from 'bn.js';
import { GetMultipleAccountsInfoConfig } from '../../common/accountInfo.js';
import { ProgramAddress } from '../../common/txTool/txUtils.js';
import { DateParam } from '../../common/date.js';
import { bg as FarmRewardInfo, bh as FarmRewardInfoConfig, M as RewardInfoV6, b0 as FarmLedgerLayout, aR as FarmStateLayout, aQ as FarmState, b6 as FarmLedger } from '../../type-7ae06f8f.js';
import { SplAccount } from '../account/types.js';
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
import '../account/layout.js';

interface AssociatedLedgerPoolAccount {
    programId: PublicKey;
    poolId: PublicKey;
    mint: PublicKey;
    type: "lpVault" | "rewardVault";
}
declare function getAssociatedLedgerPoolAccount({ programId, poolId, mint, type, }: AssociatedLedgerPoolAccount): PublicKey;
declare function getAssociatedLedgerAccount({ programId, poolId, owner, version, }: {
    programId: PublicKey;
    poolId: PublicKey;
    owner: PublicKey;
    version: 6 | 5 | 3;
}): PublicKey;
declare const getAssociatedAuthority: ({ programId, poolId, }: {
    programId: PublicKey;
    poolId: PublicKey;
}) => ProgramAddress;
declare function farmRewardInfoToConfig(data: FarmRewardInfo): FarmRewardInfoConfig;
declare function calFarmRewardAmount(data: Pick<RewardInfoV6, "openTime" | "endTime"> & {
    perSecond: string;
}): BN__default;
declare function getFarmLedgerLayout(version: number): FarmLedgerLayout | undefined;
declare function getFarmStateLayout(version: number): FarmStateLayout | undefined;
declare function updateFarmPoolInfo(poolInfo: FarmState, lpVault: SplAccount, slot: number, chainTime: number): FarmState;
interface FarmPoolsInfo {
    [id: string]: {
        state: FarmState;
        lpVault: SplAccount;
        ledger?: FarmLedger;
        wrapped?: {
            pendingRewards: BN__default[];
        };
    };
}
interface FarmFetchMultipleInfoParams {
    connection: Connection;
    farmPools: any[];
    owner?: PublicKey;
    config?: GetMultipleAccountsInfoConfig;
    chainTime: number;
}
declare function fetchMultipleFarmInfoAndUpdate({ connection, farmPools, owner, config, chainTime, }: FarmFetchMultipleInfoParams): Promise<FarmPoolsInfo>;
/** deprecated */
declare function judgeFarmType(info: any, currentTime?: DateParam): "closed pool" | "normal fusion pool" | "dual fusion pool" | undefined | "upcoming pool";
declare function getDepositEntryIndex(connection: Connection, registrar: PublicKey, voter: PublicKey, voterMint: PublicKey): Promise<{
    index: number;
    isInit: boolean;
}>;

export { FarmFetchMultipleInfoParams, calFarmRewardAmount, farmRewardInfoToConfig, fetchMultipleFarmInfoAndUpdate, getAssociatedAuthority, getAssociatedLedgerAccount, getAssociatedLedgerPoolAccount, getDepositEntryIndex, getFarmLedgerLayout, getFarmStateLayout, judgeFarmType, updateFarmPoolInfo };
