import { cookies } from 'next/headers';
import EmptyList from '@/components/global/EmptyList';
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
import { deleteLocationAction } from '@/actions/location/location-server-actions';
import { fetchAllLocations } from '@/actions/location/location-server-actions';
import { toast } from 'sonner';
import { Location } from '@prisma/client';
import { AddNewButton } from '@/components/form/Button';
import Link from 'next/link';

async function AdminLocationsPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get('success')?.value;
  const items: Location[] = await fetchAllLocations();

  if (items.length === 0) return <EmptyList />;

  function DeleteLocation({ locationId }: { locationId: string }) {
    const deleteLocation = deleteLocationAction.bind(null, { locationId });
    return (
      <FormContainer action={deleteLocation}>
        <IconButton actionType="delete" />
      </FormContainer>
    );
  }

  return (
    <section>
      {success && toast.success(success)}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Locations</h3>
        <AddNewButton href="/admin/locations/create" />
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead className="md:max:w-[240px] truncate">
                Description
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    href={`/locations/${item.id}`}
                    className="underline font-semibold capitalize">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className="md:max-w-[240px] lg:max-w-[450px] truncate">
                  <div className="truncate">{item.description}</div>
                </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/locations/${item.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteLocation locationId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>total locations: {items.length}</TableCaption>
        </Table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="block sm:hidden space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-lg border p-4 shadow-sm bg-background flex flex-col gap-2">
            <h4 className="text-lg font-semibold capitalize">{item.name}</h4>
            <p className="text-muted-foreground text-sm">{item.address}</p>
            <p className="text-muted-foreground text-sm">{item.description}</p>
            <div className="flex gap-2 mt-2 justify-end">
              <Link href={`/admin/locations/${item.id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteLocation locationId={item.id} />
            </div>
          </div>
        ))}
        <p className="text-center text-muted-foreground mt-4 text-sm">
          total locations: {items.length}
        </p>
      </div>
    </section>
  );
}

export default AdminLocationsPage;
