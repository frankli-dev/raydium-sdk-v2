import a from"bn.js";import l from"bn.js";var A=new l(1e6);function B(r,e){if(e.isZero())throw Error("divisor is zero");return r.mod(e)}function f(r,e){if(e.isZero())throw Error("rhs is zero");let t=r.div(e);if(t.isZero())throw Error("quotient is zero");let o=B(r,e);if(o.gt(u)){t=t.add(new a(1));let n=r.div(t);o=B(r,t),o.gt(u)&&(n=n.add(new a(1)))}return[t,e]}var u=new a(0),p=class{static swapWithoutFees(e,t,o){let n=t.mul(o),N=t.add(e),[i,s]=f(n,N),m=s.sub(t),d=o.sub(i);if(d.isZero())throw Error("destinationAmountSwapped is zero");return{sourceAmountSwapped:m,destinationAmountSwapped:d}}static lpTokensToTradingTokens(e,t,o,n,N){let i=e.mul(o).div(t),s=e.mul(n).div(t);if(N===0)return{tokenAmount0:i,tokenAmount1:s};if(N===1)return B(e.mul(o),t).gt(u)&&i.gt(u)&&(i=i.add(new a(1))),B(e.mul(n),t).gt(u)&&s.gt(u)&&(s=s.add(new a(1))),{tokenAmount0:i,tokenAmount1:s};throw Error("roundDirection value error")}};export{p as ConstantProductCurve};
//# sourceMappingURL=constantProduct.mjs.map