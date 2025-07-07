import { createContractAction } from '@/actions/contract/contract-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllPrograms } from '@/actions/program/program-server-actions';
import { ProgramSelector } from '@/components/form/ProgramSelector';

async function CreateContractPage() {
  const guardians = await fetchAllGuardians();
  const programs = await fetchAllPrograms();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create contract
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createContractAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Contract Title"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Contract Description"
              defaultValue=""
            />
            <GuardianSelector
              guardians={guardians}
              selectSingleGuardian
            />
            <ProgramSelector programs={programs} />
            <SubmitButton
              text="Create Contract"
              className="mt-8"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateContractPage;
