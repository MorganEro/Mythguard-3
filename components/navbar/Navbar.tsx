import { Suspense } from 'react';
import Container from '../global/Container';
import CartButton from './CartButton';
import ContractButton from './ContractButton';
import DarkMode from './DarkMode';
import LinksDropDown from './LinksDropDown';
import Logo from './Logo';
import NavSearch from './NavSearch';

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />

        <div className="flex gap-4 items-center sm:order-last">
          <ContractButton />
          <CartButton />
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
