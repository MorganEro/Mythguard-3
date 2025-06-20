'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface ToastMessageProps {
  message: string;
  type?: 'success' | 'error';
}

export default function ToastMessage({ message, type = 'success' }: ToastMessageProps) {
  useEffect(() => {
    if (message) {
      if (type === 'success') {
        toast.success(message, {
            style: {
                backgroundColor: 'white',
                color: 'hsl(173 58% 39%)',
                border: '1px solid #e2e8f0',
              },
            
        });
      } else {
        toast.error(message, {
            style: {
                backgroundColor: 'white',
                color: 'hsl(0 100% 50%)',
                border: '1px solid #e2e8f0',
              },
            
        });
      }
    }
  }, [message, type]);

  return null;
}
