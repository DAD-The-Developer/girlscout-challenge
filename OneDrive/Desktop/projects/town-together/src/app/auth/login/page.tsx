'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Redirecting to login page...
    </div>
  );
} 