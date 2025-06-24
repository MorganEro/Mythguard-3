import { IoHomeOutline } from 'react-icons/io5';
import { TbShield, TbShieldDollar, TbContract } from 'react-icons/tb';
import { IoCartOutline, IoLocationOutline } from 'react-icons/io5';
import { MdStarBorder, MdOutlinePeopleAlt } from 'react-icons/md';
import { SlEvent } from 'react-icons/sl';
import { BsBoxSeam } from 'react-icons/bs';
import { RxDashboard } from 'react-icons/rx';
import { NavLink } from '@/types/navigation';
import { GrLike } from 'react-icons/gr';
import { LiaUserShieldSolid } from "react-icons/lia";


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
  { href: '/likes', label: 'Likes', icon: GrLike },
];

export const agencyLinks: NavLink[] = [
  { href: '/events', label: 'Events', icon: SlEvent },
  { href: '/locations', label: 'Locations', icon: IoLocationOutline },
  { href: '/about', label: 'About', icon: LiaUserShieldSolid },
];
