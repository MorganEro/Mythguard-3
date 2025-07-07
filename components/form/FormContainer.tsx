'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { actionFunction } from '@/types';

type FormState = {
  message: string;
  redirectTo?: string;
};

const initialState: FormState = {
  message: '',
};

function FormContainer({
  action,
  children,
  className,
}: {
  action: actionFunction;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  useEffect(() => {
    if (state.message) {
      toast(
        <div>
          {state.message.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>,
      );
    }
  }, [state]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message.includes('successfully')) {
      formRef.current?.reset();
    }
  }, [state.message]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={className}
    >
      {children}
    </form>
  );
}
export default FormContainer;
