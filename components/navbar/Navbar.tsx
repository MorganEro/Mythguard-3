import { Suspense } from 'react';
import Container from '../global/Container';
import CartButton from './CartButton';
import ContractButton from './ContractButton';
import DarkMode from './DarkMode';
import LinksDropDown from './LinksDropDown';
import Logo from './Logo';
import NavSearch from './NavSearch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { auth } from '@clerk/nextjs/server';

async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Tooltip>
          <TooltipTrigger>
            <Logo />
          </TooltipTrigger>
          <TooltipContent>
            <p>Home Page</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex gap-4 items-center sm:order-last">
          {userId && (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <ContractButton />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Contracts</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <CartButton />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cart</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          <DarkMode />
          <div className="ml-auto">
            <LinksDropDown />
          </div>
        </div>
        <Suspense>
          <NavSearch />
        </Suspense>
      </Container>
    </nav>
  );
}
export default Navbar;
