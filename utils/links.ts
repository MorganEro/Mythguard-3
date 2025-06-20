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
import { RxDashboard } from 'react-icons/rx';

type NavLink = {
  href: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  admin?: boolean;
  section?: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home', icon: IoHomeOutline },
  { href: '/admin/sales', label: 'Dashboard', icon: RxDashboard, admin: true },
];

export const adminLinks: NavLink[] = [
  {
    href: '/admin/contracts',
    label: 'Contracts',
    admin: true,
    section: 'programs',
  },
  {
    href: '/admin/guardians',
    label: 'Guardians',
    admin: true,
    section: 'guardians',
  },
  {
    href: '/admin/products',
    label: 'Products',
    admin: true,
    section: 'products',
  },
  {
    href: '/admin/products/create',
    label: 'new product',
    admin: true,
    section: 'products',
  },

  {
    href: '/admin/guardians/create',
    label: 'new guardian',
    admin: true,
    section: 'guardians',
  },
  {
    href: '/admin/programs',
    label: 'Programs',
    admin: true,
    section: 'programs',
  },
  {
    href: '/admin/programs/create',
    label: 'new program',
    admin: true,
    section: 'programs',
  },
  { href: '/admin/sales', label: 'Sales', admin: true, section: 'products' },
];

export const userLinks: NavLink[] = [];

export const signedOutLinks: NavLink[] = [
  { href: '/products', label: 'Products', icon: TbShieldDollar },
  { href: '/programs', label: 'Programs', icon: TbShield },
];

export const productsLinks: NavLink[] = [
  { href: '/cart', label: 'Cart', icon: IoCartOutline },
  { href: '/favorites', label: 'Favorites', icon: MdStarBorder },
  { href: '/orders', label: 'Orders', icon: BsBoxSeam },
  { href: '/products', label: 'Products', icon: TbShieldDollar },
];

export const guardiansLinks: NavLink[] = [
  { href: '/contracts', label: 'Contracts', icon: TbContract },
  { href: '/guardians', label: 'Guardians', icon: MdOutlinePeopleAlt },
  { href: '/programs', label: 'Programs', icon: TbShield },
];

export const agencyLinks: NavLink[] = [
  { href: '/events', label: 'Events', icon: SlEvent },
  { href: '/locations', label: 'Locations', icon: IoLocationOutline },
];
