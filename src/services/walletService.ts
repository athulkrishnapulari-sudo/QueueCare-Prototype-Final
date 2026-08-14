import { Wallet, WalletTransaction } from '../types';
import { getLocalStore, supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const walletService = {
  async getWallet(): Promise<Wallet> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const store = getLocalStore();
        const userId = store.getProfile().id;
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        if (data && !error) return data as Wallet;

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('wallets')
          .select('*')
          .limit(1)
          .maybeSingle();
        if (retry.data) return retry.data as Wallet;
      } catch (e) {
        console.warn('Supabase wallet fetch error:', e);
      }
    }

    const store = getLocalStore();
    return store.getWallet();
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const store = getLocalStore();
        const userId = store.getProfile().id;
        const { data, error } = await supabase
          .from('wallet_transactions')
          .select('*')
          .order('date', { ascending: false });
        if (data && data.length > 0 && !error) return data as WalletTransaction[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('wallet_transactions')
          .select('*')
          .order('date', { ascending: false });
        if (retry.data && retry.data.length > 0) return retry.data as WalletTransaction[];
      } catch (e) {
        console.warn('Supabase wallet transactions fetch error:', e);
      }
    }

    const store = getLocalStore();
    return store.getWalletTxs();
  },

  async rechargeWallet(
    amount: number,
    paymentMethod: 'UPI' | 'NetBanking' = 'UPI',
    upiId?: string
  ): Promise<{ wallet: Wallet; transaction: WalletTransaction }> {
    if (amount <= 0) throw new Error('Invalid recharge amount');
    if (!paymentMethod) throw new Error('Payment method is required before wallet recharge.');
    if (paymentMethod === 'UPI' && (!upiId || upiId.trim().length < 3)) {
      throw new Error('Enter a valid UPI ID to complete the payment.');
    }

    const wallet = await this.getWallet();
    const currentTxs = await this.getTransactions();

    const newBal = wallet.balance + amount;
    const updatedWallet: Wallet = {
      ...wallet,
      balance: newBal,
      last_updated: new Date().toISOString()
    };

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      user_id: wallet.user_id,
      date: new Date().toISOString().split('T')[0],
      description: paymentMethod === 'UPI' ? `UPI Payment via ${upiId} Wallet Top-up` : 'NetBanking Wallet Top-up',
      type: 'Credit',
      amount: amount,
      balance_after: newBal
    };

    const store = getLocalStore();
    store.saveWallet(updatedWallet);
    store.saveWalletTxs([newTx, ...currentTxs]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('wallets').upsert(updatedWallet);
        await supabase.from('wallet_transactions').insert(newTx);
      } catch (e) {
        console.warn('Supabase wallet top-up sync error:', e);
      }
    }

    return { wallet: updatedWallet, transaction: newTx };
  },

  async deductForBooking(amount: number, bookingRef: string, tokenNum: string): Promise<Wallet> {
    const wallet = await this.getWallet();

    if (wallet.balance < amount) {
      throw new Error(`Insufficient QCare Health Balance. Available: ₹${wallet.balance.toFixed(2)}, Required: ₹${amount.toFixed(2)}`);
    }

    const currentTxs = await this.getTransactions();
    const newBal = wallet.balance - amount;

    const updatedWallet: Wallet = {
      ...wallet,
      balance: newBal,
      last_updated: new Date().toISOString()
    };

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      user_id: wallet.user_id,
      date: new Date().toISOString().split('T')[0],
      description: `OP Booking - ${bookingRef} (${tokenNum})`,
      type: 'Debit',
      amount: amount,
      balance_after: newBal,
      reference_id: bookingRef
    };

    const store = getLocalStore();
    store.saveWallet(updatedWallet);
    store.saveWalletTxs([newTx, ...currentTxs]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('wallets').upsert(updatedWallet);
        await supabase.from('wallet_transactions').insert(newTx);
      } catch (e) {
        console.warn('Supabase wallet deduction sync error:', e);
      }
    }

    return updatedWallet;
  }
};
