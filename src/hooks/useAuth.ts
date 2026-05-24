import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const adminState = localStorage.getItem('isAdmin') === 'true';
    const superState = localStorage.getItem('isSuperUser') === 'true';
    const sellerState = localStorage.getItem('isSeller') === 'true';
    const ownerState = localStorage.getItem('isOwner') === 'true';
    const hasToken = !!localStorage.getItem('token');
    setIsLoggedIn(adminState || superState || sellerState || ownerState || hasToken);
  }, [location]);

  return { isLoggedIn };
};
