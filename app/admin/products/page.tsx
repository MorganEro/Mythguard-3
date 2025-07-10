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
import { deleteProductAction } from '@/actions/product/product-server-actions';
import { fetchAdminProducts } from '@/actions/product/product-server-actions';
import { formatCurrency } from '@/lib/format';
import Image from 'next/image';
import { toast } from 'sonner';
import { Product } from '@prisma/client';
import { AddNewButton } from '@/components/form/Button';

async function AdminProductsPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get('success')?.value;
  const items: Product[] = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList />;

  function DeleteProduct({ productId }: { productId: string }) {
    const deleteProduct = deleteProductAction.bind(null, { productId });
    return (
      <FormContainer action={deleteProduct}>
        <IconButton actionType="delete" />
      </FormContainer>
    );
  }

  return (
    <section>
      {success && toast.success(success)}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <AddNewButton href="/admin/products/create" />
      </div>

      {/* TABLE for larger screens */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Picture</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => {
              const { name, price, id: productId } = item;
              return (
                <TableRow key={productId}>
                  <TableCell>
                    <div className="relative w-[40px] h-[40px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-sm"
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/products/${productId}`}
                      className="underline font-semibold text-foreground tracking-wide capitalize">
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCurrency(price)}</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <IconButton actionType="edit" />
                    </Link>
                    <DeleteProduct productId={productId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableCaption className="capitalize">
            total products: {items.length}
          </TableCaption>
        </Table>
      </div>

      {/* CARD LAYOUT FOR MOBILE SCREENS */}
      <div className="block sm:hidden space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-lg border p-4 shadow-sm bg-background flex flex-col gap-2"
          >
            <div>
              <h4 className="text-lg font-semibold capitalize">{item.name}</h4>
              <span className="ml-auto"> {formatCurrency(item.price)}</span>
            </div>


            <p className="text-muted-foreground text-sm">{item.company}</p>
            <div className="flex gap-2 mt-2 justify-end">
              <Link href={`/admin/products/${item.id}/edit`}>
                <IconButton actionType="edit" />
              </Link>
              <DeleteProduct productId={item.id} />
            </div>
          </div>
        ))}
        <p className="text-center text-muted-foreground mt-4 text-sm">total products: {items.length}</p>
      </div>
    </section>
  );
}
export default AdminProductsPage;
