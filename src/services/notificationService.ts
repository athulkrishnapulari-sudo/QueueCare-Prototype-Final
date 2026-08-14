import { NotificationItem } from '../types';
import { getLocalStore, supabase, isSupabaseConfigured } from '../lib/supabase';

export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const store = getLocalStore();
    return store.getNotifications();
  },

  async markAsRead(id: string): Promise<NotificationItem[]> {
    const store = getLocalStore();
    const current = store.getNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, is_read: true } : n));
    store.saveNotifications(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('notifications').update({ is_read: true }).eq('id', id);
      } catch (e) {
        console.warn('Supabase mark notification read error:', e);
      }
    }

    return updated;
  },

  async markAllAsRead(): Promise<NotificationItem[]> {
    const store = getLocalStore();
    const current = store.getNotifications();
    const updated = current.map((n) => ({ ...n, is_read: true }));
    store.saveNotifications(updated);
    return updated;
  }
};
