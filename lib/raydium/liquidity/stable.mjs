import{PublicKey as K}from"@solana/web3.js";import{PublicKey as Qe}from"@solana/web3.js";import I,{isBN as M}from"bn.js";import{bits as $,BitStructure as ee,blob as k,Blob as te,cstr as ne,f32 as re,f32be as oe,f64 as se,f64be as ue,greedy as ae,Layout as v,ns64 as ie,ns64be as ce,nu64 as pe,nu64be as ye,offset as me,s16 as de,s16be as le,s24 as be,s24be as fe,s32 as xe,s32be as Pe,s40 as ge,s40be as Le,s48 as he,s48be as Te,s8 as Se,seq as A,struct as Be,Structure as V,u16 as _e,u16be as we,u24 as Ee,u24be as Ue,u32 as Ie,u32be as Me,u40 as Ne,u40be as Ce,u48 as De,u48be as Re,u8 as ke,UInt as ve,union as Ae,Union as Ve,unionLayoutDiscriminator as Ke,utf8 as qe}from"@solana/buffer-layout";var _=v,w=V;var E=A;var U=k;var g=class extends _{constructor(o,u,s){super(o,s);this.blob=U(o),this.signed=u}decode(o,u=0){let s=new I(this.blob.decode(o,u),10,"le");return this.signed?s.fromTwos(this.span*8).clone():s}encode(o,u,s=0){return typeof o=="number"&&(o=new I(o)),this.signed&&(o=o.toTwos(this.span*8)),this.blob.encode(o.toArrayLike(Buffer,"le",this.span),u,s)}};function b(e){return new g(8,!1,e)}var L=class extends w{decode(r,o){return super.decode(r,o)}};function h(e,r,o){return new L(e,r,o)}function N(e,r,o){let u,s=typeof r=="number"?r:M(r)?r.toNumber():new Proxy(r,{get(a,t){if(!u){let n=Reflect.get(a,"count");u=M(n)?n.toNumber():n,Reflect.set(a,"count",u)}return Reflect.get(a,t)},set(a,t,n){return t==="count"&&(u=n),Reflect.set(a,t,n)}});return E(e,s,o)}var q=new K("CDSr3ssLcRB6XYPJwAfFt18MZvEZp4LjHcvzBVZ45duo"),P=5e4,X=h([b("x"),b("y"),b("price")]),Y=h([b("accountType"),b("status"),b("multiplier"),b("validDataCount"),N(X,P,"DataElement")]);function F(e,r){return[0,P-2]}function Z(e){return[0,P-2]}function j(e){return[0,P-2]}function z(e,r,o){let[u,s]=F(r,o),a=u,t=s,n=0,i=r*e.multiplier/o;for(;a<=t;){if(n=Math.floor((t+a)/2),n===0||n>=P-2)return[n,n,!1];let p=e.DataElement[n].x*e.multiplier/e.DataElement[n].y,c=e.DataElement[n-1].x*e.multiplier/e.DataElement[n-1].y,y=e.DataElement[n+1].x*e.multiplier/e.DataElement[n+1].y;if(i===p)return[n,n,!0];if(i===c)return[n-1,n-1,!0];if(i===y)return[n+1,n+1,!0];if(i<c)t=n-1;else{if(i>c&&i<p)return[n-1,n,!0];if(i>p&&i<y)return[n,n+1,!0];a=n+1}}return[n,n,!1]}function T(e,r,o){let[u,s,a]=z(e,r,o);if(!a)return 0;if(u===s){let t=e.DataElement[u].x;return r*e.multiplier/t}else{let t=e.DataElement[u].x,n=e.DataElement[u].y,i=e.DataElement[s].x,p=e.DataElement[s].y,c=o*(i*n-t*p),y=t*c,m=(i-t)*(r*n-t*o)*p,d=y+m;return r*e.multiplier*c/d}}function x(e,r,o){return r*e.multiplier/o}function D(e,r,o){return r*o/e.multiplier}function G(e,r){let[o,u]=Z(r),s=o,a=u,t=0,n=r;for(;s<a;){if(t=Math.floor((a+s)/2),t<=0||t>P-2)return[t,t,!1];let i=e.DataElement[t].x,p=e.DataElement[t-1].x,c=e.DataElement[t+1].x;if(n===i)return[t,t,!0];if(n===p)return[t-1,t-1,!0];if(n===c)return[t+1,t+1,!0];if(n<p)a=t-1;else{if(n>p&&n<i)return[t-1,t,!0];if(n>i&&n<c)return[t,t+1,!0];s=t+1}}return[t,t,!1]}function O(e,r){let[o,u]=j(r),s=o,a=u,t=0,n=r;for(;s<=a;){if(t=Math.floor((a+s)/2),t<=0||t>=P-2)return[t,t,!1];let i=e.DataElement[t].y,p=e.DataElement[t-1].y,c=e.DataElement[t+1].y;if(n===i)return[t,t,!0];if(n===p)return[t-1,t-1,!0];if(n===c)return[t+1,t+1,!0];if(n<c)s=t+1;else{if(n<p&&n>i)return[t-1,t,!0];if(n<i&&n>c)return[t,t+1,!0];a=t-1}}return[t,t,!1]}function R(e,r,o,u){let s=u?r+o:r-o,[a,t,n]=G(e,s);if(!n)return[0,0,!1,n];if(a===t)return[e.DataElement[t].price,e.DataElement[t].y,!1,n];{let i=e.DataElement[a].x,p=e.DataElement[t].x,c=e.DataElement[a].price,y=e.DataElement[t].price,m=e.DataElement[a].y,d=e.DataElement[t].y;if(r>=i&&r<=p)return u?[y,d,!0,n]:[c,m,!0,n];{let l,f;return u?(l=c+(y-c)*(r-i)/(p-i),f=m-(s-i)*e.multiplier/y):(l=c+(y-c)*(r-i)/(p-i),f=d+(p-s)*e.multiplier/c),[l,f,!1,n]}}}function H(e,r,o,u){let s=u?r-o:r+o,[a,t,n]=O(e,s);if(!n)return[0,0,!1,n];if(a===t)return[e.DataElement[t].price,e.DataElement[t].x,!1,n];{let i=e.DataElement[a].x,p=e.DataElement[t].x,c=e.DataElement[a].price,y=e.DataElement[t].price,m=e.DataElement[a].y,d=e.DataElement[t].y;if(r>=d&&r<=m)return u?[y,p,!0,n]:[c,i,!0,n];{let l,f;return u?(l=c+(y-c)*(m-r)/(m-d),f=i+y*(m-s)/e.multiplier):(l=c+(y-c)*(m-r)/(m-d),f=p-c*(s-d)/e.multiplier),[l,f,!1,n]}}}function J(e,r){let o=R(e,r,0,!1);return o[3]?o[0]:0}function st(e,r,o,u){let s=T(e,r,o),a=x(e,r,s),t=x(e,o,s),n=x(e,u,s),i=!0,[p,c,y,m]=R(e,a,n,i);if(!m)return 0;if(y)return u*e.multiplier/p;{let d=t-c;return D(e,d,s)}}function ut(e,r,o,u){let s=T(e,r,o),a=x(e,r,s),t=x(e,o,s),n=x(e,u,s),i=!1,[p,c,y,m]=H(e,t,n,i);if(!m)return 0;if(y)return u*p/e.multiplier;{let d=a-c;return D(e,d,s)}}function Q(e){let r=Y.decode(e);return{accountType:r.accountType.toNumber(),status:r.status.toNumber(),multiplier:r.multiplier.toNumber(),validDataCount:r.validDataCount.toNumber(),DataElement:r.DataElement.map(o=>({x:o.x.toNumber(),y:o.y.toNumber(),price:o.price.toNumber()}))}}function at(e,r,o,u){let s=J(e,x(e,r,T(e,r,o)))/e.multiplier;return u?s:1/s}var C=class{constructor({connection:r}){this._layoutData={accountType:0,status:0,multiplier:0,validDataCount:0,DataElement:[]};this.connection=r}get stableModelData(){return this._layoutData}async initStableModelLayout(){if(this._layoutData.validDataCount===0&&this.connection){let r=await this.connection.getAccountInfo(q);r&&(this._layoutData=Q(r==null?void 0:r.data))}}};export{X as DataElement,q as MODEL_DATA_PUBKEY,C as StableLayout,Q as formatLayout,ut as getDxByDyBaseIn,st as getDyByDxBaseIn,at as getStablePrice,Y as modelDataInfoLayout};
//# sourceMappingURL=stable.mjs.map