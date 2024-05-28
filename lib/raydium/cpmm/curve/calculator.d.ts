import BN__default from 'bn.js';

declare enum RoundDirection {
    Floor = 0,
    Ceiling = 1
}
type SwapWithoutFeesResult = {
    sourceAmountSwapped: BN__default;
    destinationAmountSwapped: BN__default;
};
type TradingTokenResult = {
    tokenAmount0: BN__default;
    tokenAmount1: BN__default;
};
type SwapResult = {
    newSwapSourceAmount: BN__default;
    newSwapDestinationAmount: BN__default;
    sourceAmountSwapped: BN__default;
    destinationAmountSwapped: BN__default;
    tradeFee: BN__default;
};
declare class CurveCalculator {
    static validate_supply(tokenAmount0: BN__default, tokenAmount1: BN__default): void;
    static swap(sourceAmount: BN__default, swapSourceAmount: BN__default, swapDestinationAmount: BN__default, tradeFeeRate: BN__default): SwapResult;
}

export { CurveCalculator, RoundDirection, SwapResult, SwapWithoutFeesResult, TradingTokenResult };
