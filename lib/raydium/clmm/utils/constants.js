var l=Object.create;var u=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var v=(e,o)=>{for(var p in o)u(e,p,{get:o[p],enumerable:!0})},c=(e,o,p,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of w(o))!I.call(e,a)&&a!==p&&u(e,a,{get:()=>o[a],enumerable:!(n=x(o,a))||n.enumerable});return e};var M=(e,o,p)=>(p=e!=null?l(f(e)):{},c(o||!e||!e.__esModule?u(p,"default",{value:e,enumerable:!0}):p,e)),B=e=>c(u({},"__esModule",{value:!0}),e);var y={};v(y,{BIT_PRECISION:()=>G,FEE_RATE_DENOMINATOR:()=>F,Fee:()=>_,LOG_B_2_X32:()=>k,LOG_B_P_ERR_MARGIN_LOWER_X64:()=>P,LOG_B_P_ERR_MARGIN_UPPER_X64:()=>X,MAX_SQRT_PRICE_X64:()=>O,MAX_TICK:()=>T,MIN_SQRT_PRICE_X64:()=>d,MIN_TICK:()=>s,MaxU64:()=>E,MaxUint128:()=>N,NEGATIVE_ONE:()=>R,ONE:()=>A,Q128:()=>m,Q64:()=>i,TICK_SPACINGS:()=>Q,U64Resolution:()=>C,U64_IGNORE_RANGE:()=>U,ZERO:()=>t,mockCreatePoolInfo:()=>b,mockV3CreatePoolInfo:()=>h});module.exports=B(y);var r=M(require("bn.js")),t=new r.default(0),A=new r.default(1),R=new r.default(-1),i=new r.default(1).shln(64),m=new r.default(1).shln(128),E=i.sub(A),C=64,N=m.subn(1),s=-443636,T=-s,d=new r.default("4295048016"),O=new r.default("79226673521066979257578248091"),G=16,k="59543866431248",P="184467440737095516",X="15793534762490258745",F=new r.default(10).pow(new r.default(6)),_=(n=>(n[n.rate_500=500]="rate_500",n[n.rate_3000=3e3]="rate_3000",n[n.rate_10000=1e4]="rate_10000",n))(_||{}),Q={[500]:10,[3e3]:60,[1e4]:200},b={version:6,liquidity:t,tickCurrent:0,observationIndex:0,observationUpdateDuration:0,feeGrowthGlobalX64A:t,feeGrowthGlobalX64B:t,protocolFeesTokenA:t,protocolFeesTokenB:t,swapInAmountTokenA:t,swapOutAmountTokenB:t,swapInAmountTokenB:t,swapOutAmountTokenA:t,tickArrayBitmap:[],rewardInfos:[],day:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},week:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},month:{volume:0,volumeFee:0,feeA:0,feeB:0,feeApr:0,rewardApr:{A:0,B:0,C:0},apr:0,priceMax:0,priceMin:0},tvl:0},h={tvl:0,volumeQuote:0,mintAmountA:0,mintAmountB:0,rewardDefaultInfos:[],farmUpcomingCount:0,farmOngoingCount:0,farmFinishedCount:0,day:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},week:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},month:{volume:0,volumeQuote:0,volumeFee:0,apr:0,feeApr:0,priceMin:0,priceMax:0,rewardApr:[0]},pooltype:[]},U=new r.default("18446744073700000000");0&&(module.exports={BIT_PRECISION,FEE_RATE_DENOMINATOR,Fee,LOG_B_2_X32,LOG_B_P_ERR_MARGIN_LOWER_X64,LOG_B_P_ERR_MARGIN_UPPER_X64,MAX_SQRT_PRICE_X64,MAX_TICK,MIN_SQRT_PRICE_X64,MIN_TICK,MaxU64,MaxUint128,NEGATIVE_ONE,ONE,Q128,Q64,TICK_SPACINGS,U64Resolution,U64_IGNORE_RANGE,ZERO,mockCreatePoolInfo,mockV3CreatePoolInfo});
//# sourceMappingURL=constants.js.map