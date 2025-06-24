'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { adminLinks } from '@/lib/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();
  type AdminLink = {
    label: string;
    href: string;
    section?: string;
  };

  const [sectionedLinks] = adminLinks.reduce<[Record<string, AdminLink[]>]>(
    (acc, link) => {
      if (link.section) {
        if (!acc[0][link.section]) {
          acc[0][link.section] = [];
        }
        acc[0][link.section].push(link);
      }
      return acc;
    },
    [{} as Record<string, AdminLink[]>]
  );
  return (
    <aside>
      <NavigationMenu
        viewport={false}
        className="">
        <NavigationMenuList className=" gap-2 sm:flex-col sm:gap-4 ">
          {Object.entries(sectionedLinks).map(([section, links]) => (
            <NavigationMenuItem
              key={section}
              className="navigation-menu-item min-w-fit">
              <NavigationMenuTrigger className="navigation-menu-trigger capitalize bg-secondary sm:bg-transparent">
                {section}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="navigation-menu-content absolute left-0 top-full w-max border shadow sm:relative sm:top-auto sm:left-4 sm:z-auto sm:mt-0 sm:shadow-none sm:border-none sm:bg-transparent">
                {links.map(link => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuLink
                      asChild
                      data-active={isActive}
                      key={link.href}
                      className="navigation-menu-link capitalize">
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}

export default Sidebar;
