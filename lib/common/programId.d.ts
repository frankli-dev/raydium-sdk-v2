import { PublicKey } from '@solana/web3.js';

declare const FARM_PROGRAM_ID_V3: PublicKey;
declare const FARM_PROGRAM_ID_V5: PublicKey;
declare const FARM_PROGRAM_ID_V6: PublicKey;
declare const UTIL1216: PublicKey;
declare const OPEN_BOOK_PROGRAM: PublicKey;
declare const SERUM_PROGRAM_ID_V3: PublicKey;
declare const AMM_V4: PublicKey;
declare const AMM_STABLE: PublicKey;
declare const CLMM_PROGRAM_ID: PublicKey;
declare const Router: PublicKey;
declare const IDO_PROGRAM_ID_V1: PublicKey;
declare const IDO_PROGRAM_ID_V2: PublicKey;
declare const IDO_PROGRAM_ID_V3: PublicKey;
declare const IDO_PROGRAM_ID_V4: PublicKey;
declare const CREATE_CPMM_POOL_PROGRAM: PublicKey;
declare const CREATE_CPMM_POOL_AUTH: PublicKey;
declare const CREATE_CPMM_POOL_FEE_ACC: PublicKey;
declare const DEV_CREATE_CPMM_POOL_PROGRAM: PublicKey;
declare const DEV_CREATE_CPMM_POOL_AUTH: PublicKey;
declare const DEV_CREATE_CPMM_POOL_FEE_ACC: PublicKey;
declare const IDO_ALL_PROGRAM: {
    IDO_PROGRAM_ID_V1: PublicKey;
    IDO_PROGRAM_ID_V2: PublicKey;
    IDO_PROGRAM_ID_V3: PublicKey;
    IDO_PROGRAM_ID_V4: PublicKey;
};
declare const ALL_PROGRAM_ID: {
    AMM_V4: PublicKey;
    AMM_STABLE: PublicKey;
    CLMM_PROGRAM_ID: PublicKey;
    FARM_PROGRAM_ID_V3: PublicKey;
    FARM_PROGRAM_ID_V5: PublicKey;
    FARM_PROGRAM_ID_V6: PublicKey;
    OPEN_BOOK_PROGRAM: PublicKey;
    SERUM_PROGRAM_ID_V3: PublicKey;
    UTIL1216: PublicKey;
    Router: PublicKey;
    CREATE_CPMM_POOL_PROGRAM: PublicKey;
    CREATE_CPMM_POOL_AUTH: PublicKey;
    CREATE_CPMM_POOL_FEE_ACC: PublicKey;
};
type ProgramIdConfig = Partial<typeof ALL_PROGRAM_ID>;

export { ALL_PROGRAM_ID, AMM_STABLE, AMM_V4, CLMM_PROGRAM_ID, CREATE_CPMM_POOL_AUTH, CREATE_CPMM_POOL_FEE_ACC, CREATE_CPMM_POOL_PROGRAM, DEV_CREATE_CPMM_POOL_AUTH, DEV_CREATE_CPMM_POOL_FEE_ACC, DEV_CREATE_CPMM_POOL_PROGRAM, FARM_PROGRAM_ID_V3, FARM_PROGRAM_ID_V5, FARM_PROGRAM_ID_V6, IDO_ALL_PROGRAM, IDO_PROGRAM_ID_V1, IDO_PROGRAM_ID_V2, IDO_PROGRAM_ID_V3, IDO_PROGRAM_ID_V4, OPEN_BOOK_PROGRAM, ProgramIdConfig, Router, SERUM_PROGRAM_ID_V3, UTIL1216 };
