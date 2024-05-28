var q=Object.create;var b=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var G=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var z=(n,o)=>{for(var t in o)b(n,t,{get:o[t],enumerable:!0})},k=(n,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of F(o))!j.call(n,s)&&s!==t&&b(n,s,{get:()=>o[s],enumerable:!(r=R(o,s))||r.enumerable});return n};var M=(n,o,t)=>(t=n!=null?q(G(n)):{},k(o||!n||!n.__esModule?b(t,"default",{value:n,enumerable:!0}):t,n)),O=n=>k(b({},"__esModule",{value:!0}),n);var je={};z(je,{BNLayout:()=>i,BitStructure:()=>J,Blob:()=>_,Layout:()=>p,OptionLayout:()=>h,Structure:()=>T,UInt:()=>m,Union:()=>S,WideBits:()=>w,WrappedLayout:()=>a,array:()=>Re,bits:()=>g,blob:()=>x,bool:()=>Ae,cstr:()=>_e,decodeBool:()=>V,encodeBool:()=>v,f32:()=>ge,f32be:()=>Le,f64:()=>he,f64be:()=>Te,greedy:()=>Q,i128:()=>Ie,i64:()=>De,i8:()=>Ce,ns64:()=>Pe,ns64be:()=>le,nu64:()=>W,nu64be:()=>se,offset:()=>L,option:()=>Ee,publicKey:()=>Ne,rustEnum:()=>qe,s16:()=>ae,s16be:()=>de,s24:()=>ie,s24be:()=>xe,s32:()=>ye,s32be:()=>fe,s40:()=>ce,s40be:()=>be,s48:()=>pe,s48be:()=>me,s8:()=>ue,seq:()=>U,str:()=>Ke,struct:()=>f,tagged:()=>ve,u128:()=>ke,u16:()=>X,u16be:()=>ee,u24:()=>Y,u24be:()=>te,u32:()=>Ue,u32be:()=>ne,u40:()=>Z,u40be:()=>re,u48:()=>$,u48be:()=>oe,u64:()=>A,u8:()=>Be,union:()=>Fe,unionLayoutDiscriminator:()=>Se,utf8:()=>we,vec:()=>Ve,vecU8:()=>K,zeros:()=>Ge});module.exports=O(je);var E=require("@solana/web3.js"),P=M(require("bn.js"));var e=require("@solana/buffer-layout"),p=e.Layout,C=e.Structure,D=e.Union,J=e.BitStructure,m=e.UInt,_=e.Blob,Q=e.greedy,l=e.u8,X=e.u16,Y=e.u24,d=e.u32,Z=e.u40,$=e.u48,W=e.nu64,ee=e.u16be,te=e.u24be,ne=e.u32be,re=e.u40be,oe=e.u48be,se=e.nu64be,ue=e.s8,ae=e.s16,ie=e.s24,ye=e.s32,ce=e.s40,pe=e.s48,Pe=e.ns64,de=e.s16be,xe=e.s24be,fe=e.s32be,be=e.s40be,me=e.s48be,le=e.ns64be,ge=e.f32,Le=e.f32be,he=e.f64,Te=e.f64be;var I=e.seq,N=e.union,Se=e.unionLayoutDiscriminator,x=e.blob,_e=e.cstr,we=e.utf8,g=e.bits,L=e.offset;var i=class extends p{constructor(t,r,s){super(t,s);this.blob=x(t),this.signed=r}decode(t,r=0){let s=new P.default(this.blob.decode(t,r),10,"le");return this.signed?s.fromTwos(this.span*8).clone():s}encode(t,r,s=0){return typeof t=="number"&&(t=new P.default(t)),this.signed&&(t=t.toTwos(this.span*8)),this.blob.encode(t.toArrayLike(Buffer,"le",this.span),r,s)}},w=class extends p{constructor(t){super(8,t);this._lower=g(d(),!1),this._upper=g(d(),!1)}addBoolean(t){this._lower.fields.length<32?this._lower.addBoolean(t):this._upper.addBoolean(t)}decode(t,r=0){let s=this._lower.decode(t,r),u=this._upper.decode(t,r+this._lower.span);return{...s,...u}}encode(t,r,s=0){return this._lower.encode(t,r,s)+this._upper.encode(t,r,s+this._lower.span)}};function Be(n){return new m(1,n)}function Ue(n){return new m(4,n)}function A(n){return new i(8,!1,n)}function ke(n){return new i(16,!1,n)}function Ce(n){return new i(1,!0,n)}function De(n){return new i(8,!0,n)}function Ie(n){return new i(16,!0,n)}var a=class extends p{constructor(t,r,s,u){super(t.span,u);this.layout=t,this.decoder=r,this.encoder=s}decode(t,r){return this.decoder(this.layout.decode(t,r))}encode(t,r,s){return this.layout.encode(this.encoder(t),r,s)}getSpan(t,r){return this.layout.getSpan(t,r)}};function Ne(n){return new a(x(32),o=>new E.PublicKey(o),o=>o.toBuffer(),n)}var h=class extends p{constructor(t,r){super(-1,r);this.layout=t,this.discriminator=l()}encode(t,r,s=0){return t==null?this.discriminator.encode(0,r,s):(this.discriminator.encode(1,r,s),this.layout.encode(t,r,s+1)+1)}decode(t,r=0){let s=this.discriminator.decode(t,r);if(s===0)return null;if(s===1)return this.layout.decode(t,r+1);throw new Error("Invalid option "+this.property)}getSpan(t,r=0){let s=this.discriminator.decode(t,r);if(s===0)return 1;if(s===1)return this.layout.getSpan(t,r+1)+1;throw new Error("Invalid option "+this.property)}};function Ee(n,o){return new h(n,o)}function Ae(n){return new a(l(),V,v,n)}function V(n){if(n===0)return!1;if(n===1)return!0;throw new Error("Invalid bool: "+n)}function v(n){return n?1:0}function Ve(n,o){let t=d("length"),r=f([t,U(n,L(t,-t.span),"values")]);return new a(r,({values:s})=>s,s=>({values:s}),o)}function ve(n,o,t){let r=f([A("tag"),o.replicate("data")]);function s({tag:u,data:y}){if(!u.eq(n))throw new Error("Invalid tag, expected: "+n.toString("hex")+", got: "+u.toString("hex"));return y}return new a(r,s,u=>({tag:n,data:u}),t)}function K(n){let o=d("length"),t=f([o,x(L(o,-o.span),"data")]);return new a(t,({data:r})=>r,r=>({data:r}),n)}function Ke(n){return new a(K(),o=>o.toString("utf-8"),o=>Buffer.from(o,"utf-8"),n)}function qe(n,o){let t=N(l(),o);return n.forEach((r,s)=>t.addVariant(s,r,r.property)),t}function Re(n,o,t){let r=f([U(n,o,"values")]);return new a(r,({values:s})=>s,s=>({values:s}),t)}var T=class extends C{decode(o,t){return super.decode(o,t)}};function f(n,o,t){return new T(n,o,t)}var S=class extends D{encodeInstruction(o){let t=Math.max(...Object.values(this.registry).map(s=>s.span)),r=Buffer.alloc(t);return r.slice(0,this.encode(o,r))}decodeInstruction(o){return this.decode(o)}};function Fe(n,o,t){return new S(n,o,t)}var B=class extends _{decode(o,t){let r=super.decode(o,t);if(!r.every(s=>s===0))throw new Error("nonzero padding bytes");return r}};function Ge(n){return new B(n)}function U(n,o,t){let r,s=typeof o=="number"?o:(0,P.isBN)(o)?o.toNumber():new Proxy(o,{get(u,y){if(!r){let c=Reflect.get(u,"count");r=(0,P.isBN)(c)?c.toNumber():c,Reflect.set(u,"count",r)}return Reflect.get(u,y)},set(u,y,c){return y==="count"&&(r=c),Reflect.set(u,y,c)}});return I(n,s,t)}0&&(module.exports={BNLayout,BitStructure,Blob,Layout,OptionLayout,Structure,UInt,Union,WideBits,WrappedLayout,array,bits,blob,bool,cstr,decodeBool,encodeBool,f32,f32be,f64,f64be,greedy,i128,i64,i8,ns64,ns64be,nu64,nu64be,offset,option,publicKey,rustEnum,s16,s16be,s24,s24be,s32,s32be,s40,s40be,s48,s48be,s8,seq,str,struct,tagged,u128,u16,u16be,u24,u24be,u32,u32be,u40,u40be,u48,u48be,u64,u8,union,unionLayoutDiscriminator,utf8,vec,vecU8,zeros});
//# sourceMappingURL=index.js.map