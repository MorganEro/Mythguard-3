import { createProgramAction } from '@/actions/program/program-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { fetchAdminGuardians } from '@/actions/guardian/guardian-server-actions';
import { GuardianSelector } from '@/components/form/GuardianSelector';

async function CreateProgramPage() {
  const guardians = await fetchAdminGuardians();
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create program</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProgramAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Program Name"
              defaultValue=""
            />
            <ImageInput />
            <TextAreaInput
              name="description"
              labelText="Program Description"
              defaultValue=""
            />
            <GuardianSelector guardians={guardians} />
            <SubmitButton
              text="Create Program"
              className="mt-8"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProgramPage;
