import { useState, useEffect, useCallback } from 'react';

export interface AdminDashboardStats {
  activeListings: number;
  pendingListings: number;
  totalListings: number;
  totalReviews: number;
  totalJobs: number;
  pendingJobs: number;
  activeJobs: number;
  filledJobs: number;
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  totalUsers: number;
}

export interface AdminActivity {
  id: string;
  title: string;
  action: string;
  time: string;
}

export interface BookingsChartPoint {
  date: string;
  label: string;
  count: number;
}

const API_BASE = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<AdminActivity[]>([]);
  const [bookingsChart, setBookingsChart] = useState<BookingsChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/admin/dashboard-stats`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data.stats);
        setRecentActivities(data.data.recentActivities || []);
        setBookingsChart(data.data.bookingsChart || []);
      } else {
        setError(data.message || 'Failed to load dashboard');
      }
    } catch {
      setError('Network error loading dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { stats, recentActivities, bookingsChart, loading, error, refetch: fetchDashboard };
};
