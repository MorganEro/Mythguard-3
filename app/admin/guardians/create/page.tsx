import { createGuardianAction } from '@/actions/guardian/guardian-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

function CreateGuardianPage() {
  return (
    <section>
      <BreadCrumbs
        homeName="Admin"
        homeLink="/admin"
        previousName="Guardians"
        previousLink="/admin/guardians"
        currentName="Create Guardian"
      />
      <h1 className="text-2xl font-semibold mb-8 capitalize">create guardian</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createGuardianAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Guardian Name"
              defaultValue=""
            />
            <ImageInput />
            <TextAreaInput
              name="shortDescription"
              labelText="Guardian Short Description"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Guardian Description"
              defaultValue=""
            />

            <div className="md:col-span-2 md:flex md:justify-end">
              <SubmitButton
                text="Create Guardian"
                className="mt-8 w-full md:w-auto"
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateGuardianPage;
