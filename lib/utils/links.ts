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
import { PiShieldStar } from 'react-icons/pi';


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
    label: 'add product',
    admin: true,
    section: 'products',
  },

  {
    href: '/admin/guardians/create',
    label: 'add guardian',
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
    label: 'add program',
    admin: true,
    section: 'programs',
  },
  {
    href: '/admin/locations',
    label: 'Locations',
    admin: true,
    section: 'programs',
  },
  {
    href: '/admin/locations/create',
    label: 'add location',
    admin: true,
    section: 'programs',
  },
  { href: '/admin/events', 
    label: 'Events', 
    admin: true, 
    section: 'programs' 
  },
  { href: '/admin/events/create', 
    label: 'add event', 
    admin: true, 
    section: 'programs' 
  },
 
  { href: '/admin/sales', 
    label: 'Sales', 
    admin: true, 
    section: 'products' 
  },
];

export const userLinks: NavLink[] = [];

export const signedOutLinks: NavLink[] = [
  { href: '/products', label: 'Products', icon: TbShieldDollar },
  { href: '/programs', label: 'Programs', icon: TbShield },
];

export const productsLinks: NavLink[] = [
  { href: '/products', label: 'Products', icon: TbShieldDollar },
  { href: '/favorites', label: 'Favorites', icon: MdStarBorder },
  { href: '/cart', label: 'Cart', icon: IoCartOutline },
  { href: '/orders', label: 'Orders', icon: BsBoxSeam },
];

export const guardiansLinks: NavLink[] = [
  { href: '/guardians', label: 'Guardians', icon: MdOutlinePeopleAlt },
  { href: '/programs', label: 'Programs', icon: TbShield },
  { href: '/likes', label: 'Likes', icon: GrLike },
  { href: '/contracts', label: 'Contracts', icon: TbContract },
  { href: '/reviews', label: 'Reviews', icon: PiShieldStar },
];

export const agencyLinks: NavLink[] = [
  { href: '/events', label: 'Events', icon: SlEvent },
  { href: '/locations', label: 'Locations', icon: IoLocationOutline },
  { href: '/about', label: 'About', icon: LiaUserShieldSolid },
];
