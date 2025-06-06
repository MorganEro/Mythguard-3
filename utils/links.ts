type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [{ href: '/', label: 'home' }];

export const adminLinks: NavLink[] = [];

export const userLinks: NavLink[] = [];

export const productsLinks: NavLink[] = [
  { href: '/products', label: 'Products' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/cart', label: 'Cart' },
  { href: '/orders', label: 'Orders' },
];

export const guardiansLinks: NavLink[] = [
  { href: '/programs', label: 'Programs' },
  { href: '/guardians', label: 'Guardians' },
  { href: '/contracts', label: 'Contracts' },
];

export const agencyLinks: NavLink[] = [
  { href: '/locations', label: 'Locations' },
  { href: '/events', label: 'Events' },
];
