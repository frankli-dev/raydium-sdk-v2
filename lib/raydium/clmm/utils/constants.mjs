import e from"bn.js";var o=new e(0),t=new e(1),m=new e(-1),n=new e(1).shln(64),p=new e(1).shln(128),s=n.sub(t),_=64,l=p.subn(1),a=-443636,x=-a,w=new e("4295048016"),f=new e("79226673521066979257578248091"),I=16,v="59543866431248",M="184467440737095516",B="15793534762490258745",R=new e(10).pow(new e(6)),u=(r=>(r[r.rate_500=500]="rate_500",r[r.rate_3000=3e3]="rate_3000",r[r.rate_10000=1e4]="rate_10000",r))(u||{}),E={[500]:10,[3e3]:60,[1e4]:200},C={version:6,liquidity:o,tickCurrent:0,observationIndex:0,observationUpdateDuration:0,feeGrowthGlobalX64A:o,feeGrowthGlobalX64B:o,protocolFeesTokenA:o,protocolFeesTokenB:o,swapInAmountTokenA:o,swapOutAmountTokenB:o,swapInAmountTokenB:o,swapOutAmountTokenA:o,tickArrayBitmap:[],rewardInfos:[],day:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},week:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},month:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},tvl:0},N={tvl:0,volumeQuote:0,mintAmountA:0,mintAmountB:0,rewardDefaultInfos:[],farmUpcomingCount:0,farmOngoingCount:0,farmFinishedCount:0,day:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},week:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},month:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},pooltype:[]},T=new e("18446744073700000000");export{I as BIT_PRECISION,R as FEE_RATE_DENOMINATOR,u as Fee,v as LOG_B_2_X32,M as LOG_B_P_ERR_MARGIN_LOWER_X64,B as LOG_B_P_ERR_MARGIN_UPPER_X64,f as MAX_SQRT_PRICE_X64,x as MAX_TICK,w as MIN_SQRT_PRICE_X64,a as MIN_TICK,s as MaxU64,l as MaxUint128,m as NEGATIVE_ONE,t as ONE,p as Q128,n as Q64,E as TICK_SPACINGS,_ as U64Resolution,T as U64_IGNORE_RANGE,o as ZERO,C as mockCreatePoolInfo,N as mockV3CreatePoolInfo};
//# sourceMappingURL=constants.mjs.map