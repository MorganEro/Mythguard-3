import { cookies } from 'next/headers';
import EmptyList from '@/components/global/EmptyList';
import { deleteProductAction } from '@/utils/actions/product/product-server-actions';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
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
import ToastMessage from '@/components/global/ToastMessage';
import { fetchAdminProducts } from '@/utils/actions/product/product-client-actions';

async function AdminProductsPage() {
  const cookieStore = await cookies();
  const success = cookieStore.get('success')?.value;
  const items = await fetchAdminProducts();
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
      {success && <ToastMessage message={success} />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => {
            const { name, company, price, id: productId } = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline font-semibold text-foreground tracking-wide capitalize">
                    {name}
                  </Link>
                </TableCell>
                <TableCell className="capitalize">{company}</TableCell>
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
      </Table>
      <div className="flex items-center justify-center ">
        <TableCaption className="capitalize">
          total products: {items.length}
        </TableCaption>
      </div>
    </section>
  );
}
export default AdminProductsPage;
