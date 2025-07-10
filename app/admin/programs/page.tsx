import { cookies } from 'next/headers';
import EmptyList from '@/components/global/EmptyList';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import { deleteProgramAction } from '@/actions/program/program-server-actions';
import { fetchAllPrograms } from '@/actions/program/program-server-actions';
import { Program } from '@/types';
import { AddNewButton } from '@/components/form/Button';
import { toast } from 'sonner';

async function AdminProgramsPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get('success')?.value;
  const items: Program[] = await fetchAllPrograms();

  if (items.length === 0) return <EmptyList />;

  function DeleteProgram({ programId }: { programId: string }) {
    const deleteProgram = deleteProgramAction.bind(null, { programId });
    return (
      <FormContainer action={deleteProgram}>
        <IconButton actionType="delete" />
      </FormContainer>
    );
  }

  return (
    <section>
      {success && toast.success(success)}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Programs</h3>
        <AddNewButton href="/admin/programs/create" />
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    href={`/programs/${item.id}`}
                    className="underline font-semibold capitalize">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className="md:max-w-[240px] lg:max-w-[400px] truncate">
                  <div className="truncate">{item.description}</div>
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/programs/${item.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteProgram programId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>total programs: {items.length}</TableCaption>
        </Table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="block sm:hidden space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-lg border p-4 shadow-sm bg-background flex flex-col gap-2">
            <h4 className="text-lg font-semibold capitalize">{item.name}</h4>
            <p className="text-muted-foreground text-sm">{item.description}</p>
            <div className="flex gap-2 mt-2 justify-end">
              <Link href={`/admin/programs/${item.id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteProgram programId={item.id} />
            </div>
          </div>
        ))}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          total programs: {items.length}
        </p>
      </div>
    </section>
  );
}

export default AdminProgramsPage;
