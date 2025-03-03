'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthSignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signup');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      Redirecting to signup page...
    </div>
  );
} 