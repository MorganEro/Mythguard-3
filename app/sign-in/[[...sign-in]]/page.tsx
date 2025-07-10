import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-top min-h-screen">
      <SignIn />
    </div>
  );
}
