import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from '@/actions/product/product-server-actions';
import { SubmitButton } from '@/components/form/Button';
import CheckboxInput from '@/components/form/CheckboxInput';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { Button } from '@/components/ui/button';

async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchAdminProductDetails(id);

  if ('message' in product) {
    return <div>{product.message}</div>;
  } else {
    const {
      id: productId,
      name,
      company,
      price,
      description,
      featured,
    } = product;  

    return (
      <section>
        <BreadCrumbs
          homeName="Admin"
          homeLink="/admin"
          previousName="Products"
          previousLink="/admin/products"
          currentName="Update Product"
        />
        <h3 className="text-2xl font-semibold mb-8 capitalize">
          Update Product
        </h3>
        <div className="border p-8 rounded-md">
          <ImageInputContainer
            action={updateProductImageAction}
            name={name}
            image={product.image}
            text="Update Image">
            <input
              type="hidden"
              name="id"
              value={productId}
            />
            <input
              type="hidden"
              name="url"
              value={product.image}
            />
          </ImageInputContainer>
          <FormContainer action={updateProductAction}>
            <div className="grid gap-4 md:grid-cols-2 my-4">
              <input
                type="hidden"
                name="id"
                value={productId}
              />
              <FormInput
                type="text"
                name="name"
                label="Product Name"
                defaultValue={name}
              />
              <FormInput
                type="text"
                name="company"
                label="Company"
                defaultValue={company}
              />
              <PriceInput defaultValue={price} />
              <TextAreaInput
                name="description"
                labelText="product Description"
                defaultValue={description}
              />
              <div className="mt-6">
                <CheckboxInput
                  name="featured"
                  label="Featured"
                  defaultChecked={featured}
                />
                <Button
                  type="reset"
                  variant="outline"
                  size="sm"
                  className="mt-8 mr-3 sm:mr-4">
                  Reset
                </Button>
                <div className="md:col-span-2 md:flex md:justify-end">
                  <SubmitButton
                    text="Update Product"
                    className="mt-8 w-full md:w-auto"
                  />
                </div>
              </div>
            </div>
          </FormContainer>
        </div>
      </section>
    );
  }
}
export default EditProductPage;
