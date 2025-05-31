# Troubleshooting Log

## March 19, 2025 - Tailwind CSS Configuration Issue

### Problem
- Error: "Can't resolve 'tailwindcss'" in globals.css
- Issue appeared during Prisma integration work
- Previous working state had functioning Tailwind CSS

### Investigation
1. Package Version Analysis
   - Found multiple Tailwind versions installed
   - Initial confusion about @tailwindcss/postcss version number
   - Verified compatibility between packages

2. Configuration Check
   - Confirmed correct import syntax in globals.css: `@import "tailwindcss"`
   - Verified PostCSS configuration
   - Checked Tailwind config settings

### Resolution
Working configuration preserved in git commit `5f1dc69`:

1. Package Versions:
   ```json
   {
     "tailwindcss": "^3.4.1",
     "@tailwindcss/postcss": "^4.0.11",
     "postcss": "^8.5.3"
   }
   ```

2. Key Files:
   - globals.css: Uses `@import "tailwindcss"`
   - postcss.config.mjs: Configured with @tailwindcss/postcss plugin
   - tailwind.config.ts: Set up for Next.js app directory

### Key Learnings
1. The @tailwindcss/postcss version number (4.0.11) does not indicate a requirement for Tailwind v4
2. The modern `@import "tailwindcss"` syntax is correct
3. Package version numbers don't need to match between tailwindcss and @tailwindcss/postcss

### How to Find This Configuration
1. Git commit with detailed configuration is tagged with "feat(config): establish working Tailwind CSS configuration"
2. Use `git log --grep="Tailwind"` to find this commit
3. Configuration files are preserved in this state

## March 20, 2025 - Prisma and Supabase Integration

### Problem
- Error: "Can't reach database server" when running Prisma commands
- Issues with database connection configuration
- Confusion between pooled and direct connections

### Investigation
1. Database Connection Types
   - Identified two types of connections needed:
     - Pooled Connection (DATABASE_URL): For regular queries
     - Direct Connection (DIRECT_URL): For Prisma schema operations
   - Initial setup had incorrect connection string format

2. Environment Configuration
   - Required variables in `.env.local`:
     - DATABASE_URL
     - DIRECT_URL
   - Required variables in `.env`:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY

### Resolution Steps
1. Database URL Format:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=udemy_typescript_shop&sslmode=require
   ```

2. Required Configuration:
   - schema.prisma: Single URL configuration for simplicity
   - utils/db.ts: Basic Prisma client setup
   - utils/supabase.ts: Supabase client configuration

### Important Resources
1. Documentation:
   - [Prisma Docs](https://www.prisma.io/docs)
   - [Supabase Docs](https://supabase.com/docs)
   - [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
   - [shadcn/ui Tailwind Guide](https://ui.shadcn.com/docs/tailwind-v4)

2. Project Resources:
   - [React Icons](https://react-icons.github.io/react-icons/)
   - [shadcn/ui Components](https://ui.shadcn.com/)

### Key Learnings
1. Always use `sslmode=require` for Supabase connections
2. Start with simple configuration before adding optimizations
3. Verify Supabase connection before attempting Prisma operations
4. Keep track of both pooled and direct connection requirements

### Common Issues and Solutions
1. "Can't reach database server":
   - Verify database password is correct and up to date
   - Ensure SSL mode is properly configured
   - Check if database is active in Supabase dashboard

2. Connection Pooling Issues:
   - Use direct connection (DIRECT_URL) for schema operations
   - Use pooled connection (DATABASE_URL) for regular queries
   - Don't mix connection types in configuration

3. Environment Variables:
   - Keep sensitive information in `.env.local`
   - Use public variables in `.env`
   - Follow the naming conventions for each service

## March 20, 2025 - UI Component Integration and Styling

### Problem
- Inconsistent component styling between development and production
- Issues with shadcn/ui component customization
- Tailwind classes not applying correctly in some components

### Investigation
1. Component Setup
   - Analyzed shadcn/ui integration process
   - Reviewed Tailwind configuration
   - Checked component style overrides

2. Style Conflicts
   - Identified potential CSS specificity issues
   - Checked for conflicting Tailwind directives
   - Reviewed component customization approach

### Resolution Steps
1. shadcn/ui Setup:
   ```bash
   # Installation
   npx shadcn-ui@latest init
   
   # Component Installation
   npx shadcn-ui@latest add [component-name]
   ```

2. Required Configuration:
   - components.json: Base styling configuration
   - tailwind.config.ts: Extended theme settings
   - globals.css: Base component styles

### Important Resources
1. UI Documentation:
   - [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4)
   - [Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

2. Component Libraries:
   - [shadcn/ui Components](https://ui.shadcn.com/)
   - [React Icons](https://react-icons.github.io/react-icons/)

### Key Learnings
1. Component Customization:
   - Always customize in the components/ui directory
   - Use CSS variables for theme customization
   - Maintain consistent class naming conventions

2. Style Organization:
   - Keep base styles in globals.css
   - Use Tailwind layers appropriately
   - Avoid direct style overrides when possible

### Common Issues and Solutions
1. Component Styling Issues:
   - Check Tailwind class order
   - Verify CSS variable definitions
   - Ensure proper component import paths

2. Theme Customization:
   - Use CSS variables in tailwind.config.ts
   - Define colors in the theme section
   - Override default styles in components/ui

3. Development vs Production:
   - Use proper purge configuration
   - Check for JIT compilation issues
   - Verify CSS bundling settings

### Best Practices
1. Component Structure:
   ```tsx
   // components/ui/custom-button.tsx
   export function CustomButton({ className, ...props }) {
     return (
       <Button 
         className={cn(
           "custom-base-styles",
           className
         )}
         {...props}
       />
     );
   }
   ```

2. Theme Configuration:
   ```ts
   // tailwind.config.ts
   export default {
     theme: {
       extend: {
         colors: {
           // Use CSS variables for dynamic theming
           primary: 'var(--primary)',
           // ...
         }
       }
     }
   }
   ```

3. Style Organization:
   ```css
   /* globals.css */
   @layer base {
     :root {
       --primary: 222.2 47.4% 11.2%;
       /* ... */
     }
   }
   ```

### Testing UI Components
1. Visual Consistency:
   - Check responsive breakpoints
   - Verify dark/light mode transitions
   - Test with different content lengths

2. Accessibility:
   - Ensure proper ARIA attributes
   - Test keyboard navigation
   - Verify color contrast ratios
