import { SubmitButton } from '@/components/form/Button';
import CheckboxInput from '@/components/form/CheckboxInput';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { createProductAction } from '@/utils/actions/product/product-server-actions';

function CreateProductPage() {
  return (
    <section>
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
              defaultValue=""
            />
            <PriceInput />
            <ImageInput />
            <TextAreaInput
              name="description"
              labelText="product Description"
              defaultValue=""
            />
            <div>
              <CheckboxInput
                name="featured"
                label="Featured"
              />
            </div>
            <SubmitButton
              text="Create Product"
              className="mt-8"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProductPage;
