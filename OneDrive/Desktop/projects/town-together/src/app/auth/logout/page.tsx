'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    
    // Trigger a storage event so other tabs can react
    window.dispatchEvent(new Event('storage'));
    
    // Redirect to home page
    router.replace('/');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Logging out...
    </div>
  );
} 