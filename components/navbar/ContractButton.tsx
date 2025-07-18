import Link from 'next/link';
import { Button } from '../ui/button';
import { Clipboard } from 'lucide-react';
import { fetchNumberOfContracts } from '@/actions/contract/contract-server-actions';
import { MAX_CONTRACTS_PER_USER } from '@/lib/utils/constants';

async function ContractButton() {
  
  const numActiveContracts = await fetchNumberOfContracts();
  if (typeof numActiveContracts !== 'number') {
    return null;
  }
  if (numActiveContracts <= MAX_CONTRACTS_PER_USER) {
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
}
export default ContractButton;
