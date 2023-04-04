#  js-xdr-perf-test

> Performance comparison for the refactored `js-xdr` module vs the previous version

```
git clone https://github.com/orbitlens/js-xdr-perf-test.git

cd js-xdr-perf-test

npm i

cd node_modules/js-xdr-new
yarn install
yarn build

cd ../../
npm run perf
```

Output example:

```
Performance benchmark
10 samples 10000 iterations each
------------------------------------------------
LedgerHeader.fromXDR - new: 0.0435s (min 0.038s - max 0.068s)
LedgerHeader.fromXDR - old: 0.272s (min 0.264s - max 0.302s)
difference: 6.3X

LedgerHeader.toXDR - new: 0.0698s (min 0.06s - max 0.101s)
LedgerHeader.toXDR - old: 0.348s (min 0.263s - max 0.558s)
difference: 5.0X

TransactionEnvelope.fromXDR - new: 0.423s (min 0.412s - max 0.477s)
TransactionEnvelope.fromXDR - old: 1.77s (min 1.701s - max 1.918s)
difference: 4.2X

TransactionEnvelope.toXDR - new: 0.436s (min 0.342s - max 0.715s)
TransactionEnvelope.toXDR - old: 0.646s (min 0.613s - max 0.695s)
difference: 1.5X

TransactionMeta.fromXDR - new: 3.20s (min 2.694s - max 4.016s)
TransactionMeta.fromXDR - old: 9.76s (min 9.543s - max 10.194s)
difference: 3.1X

TransactionMeta.toXDR - new: 2.35s (min 2.149s - max 2.549s)
TransactionMeta.toXDR - old: 3.19s (min 2.934s - max 3.46s)
difference: 1.4X

TransactionResult.fromXDR - new: 0.0370s (min 0.034s - max 0.056s)
TransactionResult.fromXDR - old: 0.0627s (min 0.059s - max 0.074s)
difference: 1.7X

TransactionResult.toXDR - new: 0.0626s (min 0.057s - max 0.07s)
TransactionResult.toXDR - old: 0.218s (min 0.184s - max 0.272s)
difference: 3.5X
```