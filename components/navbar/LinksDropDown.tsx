'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  agencyLinks,
  guardiansLinks,
  links,
  productsLinks,
  signedOutLinks,
} from '@/utils/links';
import { LuAlignLeft } from 'react-icons/lu';

import Link from 'next/link';
import { useIsAdmin } from '@/utils/hooks/useAdmin';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';

import SignInLink from './SignInLink';
import SignOutLink from './SignOutLink';
import UserIcon from './UserIcon';

function LinksDropDown() {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();
  const activeClassName =
    'bg-secondary text-secondary-foreground font-semibold';
  const linkClassName = 'grid grid-cols-6 gap-6 items-center capitalize w-full';
  const iconClassName = 'w-4 h-4 text-inherit col-span-1';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        align="start"
        sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInLink />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {signedOutLinks.map(link => (
            <DropdownMenuItem
              key={link.href}
              className={pathname === link.href ? activeClassName : ''}>
              <Link
                href={link.href}
                className={linkClassName}>
                {link.icon && <link.icon className={iconClassName} />}
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </SignedOut>
        <SignedIn>
          {links
            .filter(link => !link.admin || (link.admin && isAdmin))
            .map(link => (
              <DropdownMenuItem
                key={link.href}
                className={pathname === link.href ? activeClassName : ''}>
                <Link
                  href={link.href}
                  className={linkClassName}>
                  {link.icon && <link.icon className={iconClassName} />}
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          {guardiansLinks.map(link => (
            <DropdownMenuItem
              key={link.href}
              className={pathname === link.href ? activeClassName : ''}>
              <Link
                href={link.href}
                className={linkClassName}>
                {link.icon && <link.icon className={iconClassName} />}
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {productsLinks.map(link => (
            <DropdownMenuItem
              key={link.href}
              className={pathname === link.href ? activeClassName : ''}>
              <Link
                href={link.href}
                className={linkClassName}>
                {link.icon && <link.icon className={iconClassName} />}
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {agencyLinks.map(link => (
            <DropdownMenuItem
              key={link.href}
              className={pathname === link.href ? activeClassName : ''}>
              <Link
                href={link.href}
                className={linkClassName}>
                {link.icon && <link.icon className={iconClassName} />}
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropDown;
