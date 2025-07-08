import { fetchAdminOrders } from "@/actions/order/order-server-action";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { Order } from "@prisma/client";

async function SalesPage() {
  const orders = await fetchAdminOrders() as Order[];
  return <>
    {/* TABLE for larger screens */}
    <div className="hidden sm:block">
      <Table>
        <TableCaption>Total Orders: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { id, products, orderTotal, tax, shipping, createdAt, email } = order;
            return <TableRow key={id}>
              <TableCell>{email}</TableCell>
              <TableCell>{products}</TableCell>
              <TableCell>{formatCurrency(orderTotal)}</TableCell>
              <TableCell>{formatCurrency(tax)}</TableCell>
              <TableCell>{formatCurrency(shipping)}</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
    {/* CARD LAYOUT FOR MOBILE SCREENS */}
    <div className="block sm:hidden space-y-4">
      {orders.map(order => (
        <div
          key={order.id}
          className="rounded-lg border p-4 shadow-sm bg-background flex flex-col gap-2"
        >
          <h4 className="text-lg font-semibold capitalize">{order.email}</h4>
          <p className="text-sm text-muted-foreground capitalize">ordered on {formatDate(order.createdAt)}</p>

          <div className="grid grid-cols-2 gap-2 mt-2 justify-between">
            <p className="text-sm font-semibold">Number of Products</p>
            <span className="text-sm text-end">{order.products}</span>
            <p className="text-sm font-semibold">Tax</p>
            <span className="text-sm text-end">{formatCurrency(order.tax)}</span>
            <p className="text-sm font-semibold">Shipping</p>
            <span className="text-sm text-end">{formatCurrency(order.shipping)}</span>
          </div>
          <Separator />
          <span className="ml-auto ">{formatCurrency(order.orderTotal)}</span>
        </div>
      ))}
      <p className="text-center text-muted-foreground mt-4 text-sm">Total Orders: {orders.length}</p>
    </div>
  </>;
}
export default SalesPage;
