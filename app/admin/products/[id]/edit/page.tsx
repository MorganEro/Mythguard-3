import { SubmitButton } from '@/components/form/Button';
import CheckboxInput from '@/components/form/CheckboxInput';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from '@/utils/actions/product/product-server-actions';

async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchAdminProductDetails(id);

  if ('message' in product) {
    // handle error case
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
        <h1 className="text-2xl font-semibold mb-8 capitalize">
          Update Product
        </h1>
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
                <SubmitButton
                  text="Update Product"
                  className="mt-8"
                />
              </div>
            </div>
          </FormContainer>
        </div>
      </section>
    );
  }
}
export default EditProductPage;
