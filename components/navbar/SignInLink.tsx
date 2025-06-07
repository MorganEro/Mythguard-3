'use client';

import { SignInButton } from '@clerk/nextjs';

function SignInLink() {
  return (
    <SignInButton mode="modal">
      <button className="w-full text-left">Login</button>
    </SignInButton>
  );
}
export default SignInLink;
