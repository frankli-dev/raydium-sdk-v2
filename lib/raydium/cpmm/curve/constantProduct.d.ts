import BN__default from 'bn.js';
import { SwapWithoutFeesResult, RoundDirection, TradingTokenResult } from './calculator.js';

declare class ConstantProductCurve {
    static swapWithoutFees(sourceAmount: BN__default, swapSourceAmount: BN__default, swapDestinationAmount: BN__default): SwapWithoutFeesResult;
    static lpTokensToTradingTokens(lpTokenAmount: BN__default, lpTokenSupply: BN__default, swapTokenAmount0: BN__default, swapTokenAmount1: BN__default, roundDirection: RoundDirection): TradingTokenResult;
}

export { ConstantProductCurve };
