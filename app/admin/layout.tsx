import { Separator } from '@/components/ui/separator';
import Sidebar from './Sidebar';

function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-3xl">Dashboard</h2>
      <Separator className="mt-2" />
      <section className="flex flex-col gap-6 mt-2 sm:mt-12 sm:grid sm:grid-cols-12 sm:gap-12">
        <div className="sm:col-span-2">
          <Sidebar />
        </div>
        <div className="sm:col-span-10">{children}</div>
      </section>
    </>
  );
}
export default AdminDashboardLayout;
