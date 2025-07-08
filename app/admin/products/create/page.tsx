import { createProductAction } from '@/actions/product/product-server-actions';
import { SubmitButton } from '@/components/form/Button';
import CheckboxInput from '@/components/form/CheckboxInput';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

function CreateProductPage() {
  return (
    <section>
      <BreadCrumbs
        homeName="Admin"
        homeLink="/admin"
        previousName="Products"
        previousLink="/admin/products"
        currentName="Create Product"
      />
      <h1 className="text=2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Product Name"
              defaultValue=""
            />
            <FormInput
              type="text"
              name="company"
              label="Company"
              defaultValue="MythGuard"
            />
            <PriceInput defaultValue={0} />
            <ImageInput />
            <div className="md:col-span-2">
              <TextAreaInput
                name="description"
                labelText="product Description"
                defaultValue=""
              />
            </div>
            <CheckboxInput
              name="featured"
              label="Featured"
            />
            <div className="md:col-span-2 md:flex md:justify-end">
              <SubmitButton
                text="Create Product"
                className="mt-8 w-full md:w-auto"
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProductPage;
