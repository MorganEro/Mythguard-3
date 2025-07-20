'use client'

import Link from 'next/link';
import { Button } from '../ui/button';
import { Clipboard } from 'lucide-react';
import { useUserContracts } from '@/lib/queries/contract';

function ContractButton() {
  const { data: contracts } = useUserContracts();
  const numActiveContracts = contracts?.length;
  if (typeof numActiveContracts !== 'number') {
    return null;
  }

    return (
      <Button
        asChild
        variant="outline"
        size="icon"
        className="flex justify-center items-center relative">
        <Link href="/contracts">
          <Clipboard className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
            {numActiveContracts.toString() || '0'}
          </span>
        </Link>
      </Button>
    );
}
export default ContractButton;
