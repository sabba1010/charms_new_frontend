import { useState, useEffect, useCallback } from 'react';

export interface SitterBooking {
  id: string;
  clientName: string;
  clientAvatar: string;
  petType: string;
  serviceType: string;
  listingName: string;
  scheduleLabel: string;
  date: string;
  time: string;
  price: number;
  requirements?: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
}

const formatSchedule = (date: string, time?: string) => {
  const cleanTime = time && !['undefined', 'N/A', 'null', 'Not specified'].includes(String(time))
    ? String(time)
    : null;
  return cleanTime ? `${date} at ${cleanTime}` : date;
};

const resolveClientName = (b: Record<string, unknown>) => {
  const client = b.client as Record<string, string> | undefined;
  const fromUser = client
    ? `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.username
    : '';
  return fromUser || String(b.customerName || 'Owner');
};

const resolveListingName = (b: Record<string, unknown>) => {
  const listing = b.listing as Record<string, string> | undefined;
  return listing?.title || String(b.serviceType || '');
};

const getImageUrl = (url?: string) => {
  if (!url) return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
  const backendUrl = apiUrl.replace('/api', '');
  return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const useSitterBookings = () => {
  const [bookings, setBookings] = useState<SitterBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setBookings([]);
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
      const res = await fetch(`${apiUrl}/bookings/sitter-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        const formatted: SitterBooking[] = data.data.map((b: Record<string, unknown>) => {
          const client = b.client as Record<string, string> | undefined;
          const date = String(b.date || '');
          const time = String(b.time || '');
          const listingName = resolveListingName(b);
          return {
            id: String(b._id),
            clientName: resolveClientName(b),
            clientAvatar: getImageUrl(client?.avatar),
            petType: `${b.petCount} Pet(s)`,
            serviceType: String(b.serviceType || (b.listing as Record<string, string>)?.category || ''),
            listingName,
            date,
            time,
            scheduleLabel: formatSchedule(date, time),
            price: Number(b.totalAmount) || 0,
            requirements: b.requirements ? String(b.requirements) : undefined,
            status: b.status as SitterBooking['status'],
          };
        });
        setBookings(formatted);
      }
    } catch (err) {
      console.error('Error fetching sitter bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL || 'https://clietn16-backend.vercel.app/api';
    const res = await fetch(`${apiUrl}/bookings/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: status as SitterBooking['status'] } : b))
      );
    } else {
      alert(data.message);
    }
  };

  const counts = {
    pending: bookings.filter((b) => b.status === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    cancelled: bookings.filter((b) => b.status === 'Cancelled').length,
    total: bookings.length,
  };

  return { bookings, loading, counts, updateStatus, refetch: fetchBookings };
};
