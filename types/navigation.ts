import { SVGProps } from 'react';

export type NavLink = {
  href: string;
  label: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  admin?: boolean;
  section?: string;
};
