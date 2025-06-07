import { IoHomeOutline } from 'react-icons/io5';
import { TbShield } from 'react-icons/tb';
import { TbShieldDollar } from 'react-icons/tb';
import { TbContract } from 'react-icons/tb';
import { IoCartOutline } from 'react-icons/io5';
import { MdStarBorder } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { SlEvent } from 'react-icons/sl';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlinePeopleAlt } from 'react-icons/md';

type NavLink = {
  href: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const links: NavLink[] = [
  { href: '/', label: 'home', icon: IoHomeOutline },
];

export const adminLinks: NavLink[] = [];

export const userLinks: NavLink[] = [];

export const signedOutLinks: NavLink[] = [
  { href: '/programs', label: 'Programs', icon: TbShield },
  { href: '/products', label: 'Products', icon: TbShieldDollar },
];

export const productsLinks: NavLink[] = [
  { href: '/products', label: 'Products', icon: TbShieldDollar },
  { href: '/favorites', label: 'Favorites', icon: MdStarBorder },
  { href: '/cart', label: 'Cart', icon: IoCartOutline },
  { href: '/orders', label: 'Orders', icon: BsBoxSeam },
];

export const guardiansLinks: NavLink[] = [
  { href: '/programs', label: 'Programs', icon: TbShield },
  { href: '/guardians', label: 'Guardians', icon: MdOutlinePeopleAlt },
  { href: '/contracts', label: 'Contracts', icon: TbContract },
];

export const agencyLinks: NavLink[] = [
  { href: '/locations', label: 'Locations', icon: IoLocationOutline },
  { href: '/events', label: 'Events', icon: SlEvent },
];
