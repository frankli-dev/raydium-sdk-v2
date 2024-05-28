import{PublicKey as I,TransactionInstruction as x,SYSVAR_CLOCK_PUBKEY as M}from"@solana/web3.js";import{TOKEN_PROGRAM_ID as m}from"@solana/spl-token";import{TOKEN_PROGRAM_ID as _}from"@solana/spl-token";import{PublicKey as e,SystemProgram as g,SYSVAR_RENT_PUBKEY as B}from"@solana/web3.js";function p({pubkey:r,isSigner:t=!1,isWritable:n=!0}){return{pubkey:r,isWritable:n,isSigner:t}}var D=[p({pubkey:_,isWritable:!1}),p({pubkey:g.programId,isWritable:!1}),p({pubkey:B,isWritable:!1})];var N=new e("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),E=new e("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),L=new e("SysvarRent111111111111111111111111111111111"),P=new e("SysvarC1ock11111111111111111111111111111111"),W=new e("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),O=new e("Sysvar1nstructions1111111111111111111111111"),q=g.programId,v=new e("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),V=new e("Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"),G=new e("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"),Y=new e("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),j=new e("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),X=new e("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),z=new e("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"),H=new e("USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX"),F=new e("NRVwhjBQiUPYtfDT5zRBVJajzFQHaBUNtC7SNVvqRFa"),J=new e("ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo"),Q=new e("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"),Z=new e("So11111111111111111111111111111111111111112"),$=e.default;import{PublicKey as rt}from"@solana/web3.js";import st,{isBN as ut}from"bn.js";import{bits as ne,BitStructure as re,blob as oe,Blob as se,cstr as ue,f32 as ae,f32be as ie,f64 as ce,f64be as ye,greedy as pe,Layout as Pe,ns64 as de,ns64be as be,nu64 as k,nu64be as fe,offset as le,s16 as xe,s16be as me,s24 as ge,s24be as Le,s32 as Se,s32be as Te,s40 as we,s40be as he,s48 as _e,s48be as Be,s8 as ke,seq as Ue,struct as Ae,Structure as U,u16 as Ie,u16be as Me,u24 as Ke,u24be as Re,u32 as Ce,u32be as De,u40 as Ne,u40be as Ee,u48 as We,u48be as Oe,u8 as qe,UInt as A,union as ve,Union as Ve,unionLayoutDiscriminator as Ge,utf8 as Ye}from"@solana/buffer-layout";var S=U;var T=A;var w=k;function b(r){return new T(1,r)}var d=class extends S{decode(t,n){return super.decode(t,n)}};function f(r,t,n){return new d(r,t,n)}var l=f([b("instruction"),w("amount")]),a=f([b("instruction")]);function lt({programId:r,amount:t,instructionKeys:n}){let o=[{pubkey:new I("11111111111111111111111111111111"),isSigner:!1,isWritable:!1},{pubkey:m,isSigner:!1,isWritable:!1},{pubkey:L,isSigner:!1,isWritable:!1},{pubkey:P,isSigner:!1,isWritable:!1},...Object.entries(n).map(([u,i])=>({pubkey:i,isSigner:u==="userOwner",isWritable:!["authority","userOwner","userIdoCheck","userStakeInfo"].includes(u)}))],s=Buffer.alloc(l.span);return l.encode({instruction:1,amount:Number(t)},s),new x({keys:o,programId:r,data:s})}function xt({programId:r},t){let n=[{pubkey:m,isSigner:!1,isWritable:!1},{pubkey:P,isSigner:!1,isWritable:!1},...Object.entries(t).map(([s,u])=>({pubkey:u,isSigner:s==="userOwner",isWritable:!["authority","userOwner"].includes(s)}))],o=Buffer.alloc(a.span);return a.encode({instruction:2},o),new x({keys:n,programId:r,data:o})}function mt(r){let{poolConfig:t,userKeys:n,side:o}=r,s=o==="base"?n.baseTokenAccount:n.quoteTokenAccount,u=o==="base"?t.baseVault:t.quoteVault,i=Buffer.alloc(a.span);a.encode({instruction:2},i);let h=[{pubkey:m,isWritable:!1,isSigner:!1},{pubkey:M,isWritable:!1,isSigner:!1},{pubkey:t.id,isWritable:!0,isSigner:!1},{pubkey:t.authority,isWritable:!1,isSigner:!1},{pubkey:u,isWritable:!0,isSigner:!1},{pubkey:s,isWritable:!0,isSigner:!1},{pubkey:n.ledgerAccount,isWritable:!0,isSigner:!1},{pubkey:n.owner,isWritable:!1,isSigner:!0}];return new x({programId:t.programId,keys:h,data:i})}export{xt as makeClaimInstruction,mt as makeClaimInstructionV4,lt as makePurchaseInstruction};
//# sourceMappingURL=instruction.mjs.map