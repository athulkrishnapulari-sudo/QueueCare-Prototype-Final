import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { walletService } from '../services/walletService';
import { WalletTransaction } from '../types';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, X } from 'lucide-react';

export const Wallet: React.FC = () => {
  const { wallet, language, rechargeWallet } = useApp();
  const t = getTranslation(language);

  const [txs, setTxs] = useState<WalletTransaction[]>([]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NetBanking'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function loadTxs() {
      const list = await walletService.getTransactions();
      setTxs(list);
    }
    loadTxs();
  }, [wallet]);

  const handleRecharge = async () => {
    if (paymentMethod === 'UPI' && (!upiId || upiId.trim().length < 3)) {
      alert('Enter your UPI ID to continue with the payment.');
      return;
    }

    setIsProcessing(true);
    try {
      await rechargeWallet(rechargeAmount, paymentMethod, upiId);
      setShowRechargeModal(false);
      setUpiId('');
      setPaymentMethod('UPI');
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Banner & Balance Card */}
      <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-teal-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-800/80 text-emerald-300">
              <WalletIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">{t.wallet.title}</h1>
              <p className="text-xs text-teal-200">{t.wallet.subtitle}</p>
            </div>
          </div>

          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold px-2.5 py-1 rounded-full uppercase">
            Govt Verified
          </span>
        </div>

        <div className="my-3">
          <span className="text-xs text-teal-300 uppercase tracking-wider font-semibold">
            {t.wallet.currentBalance}
          </span>
          <div className="text-4xl font-extrabold text-emerald-300 tracking-tight mt-1">
            ₹{wallet?.balance.toFixed(2) || '0.00'}
          </div>
        </div>

        <div className="pt-3 border-t border-teal-800/60 flex justify-between items-center text-xs">
          <span className="text-teal-200">Zero-Delay Token Checkout</span>
          <button
            onClick={() => setShowRechargeModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl transition-colors cursor-pointer min-h-[40px]"
          >
            <Plus className="w-4 h-4" />
            <span>{t.wallet.addFunds}</span>
          </button>
        </div>
      </div>

      {/* Transaction Ledger */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
          {t.wallet.recentTransactions}
        </h2>

        <div className="space-y-2">
          {txs.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    tx.type === 'Credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {tx.type === 'Credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{tx.description}</div>
                  <div className="text-[11px] text-slate-500">{tx.date}</div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-extrabold text-sm ${
                    tx.type === 'Credit' ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Bal: ₹{tx.balance_after.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowRechargeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-slate-900 text-lg mb-1">Recharge QCare Health Balance</h3>
            <p className="text-xs text-slate-500 mb-4">Add funds via UPI (GPay / PhonePe / Paytm) or NetBanking</p>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase">Select Amount</label>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setRechargeAmount(amt)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                      rechargeAmount === amt
                        ? 'bg-teal-700 text-white'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                    paymentMethod === 'UPI'
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                    paymentMethod === 'NetBanking'
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  NetBanking
                </button>
              </div>
            </div>

            {paymentMethod === 'UPI' && (
              <div className="space-y-2 mb-5">
                <label className="block text-xs font-bold text-slate-700 uppercase">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                />
              </div>
            )}

            <button
              disabled={isProcessing}
              onClick={handleRecharge}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer min-h-[44px]"
            >
              {isProcessing
                ? 'Processing Payment...'
                : `Pay ₹${rechargeAmount} via ${paymentMethod === 'UPI' ? 'UPI' : 'NetBanking'} & Top Up Wallet`}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
