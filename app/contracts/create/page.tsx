import { createContractAction } from '@/actions/contract/contract-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllPrograms } from '@/actions/program/program-server-actions';
import { ProgramSelector } from '@/components/form/ProgramSelector';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import DateInput from '@/components/form/DateInput';

async function CreateContractPage() {
  const guardians = await fetchAllGuardians();
  const programs = await fetchAllPrograms();

  return (
    <section>
      <BreadCrumbs
        homeName="Contracts"
        homeLink="/contracts"
        currentName="Create Contract"
      />
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create contract
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createContractAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4 content-start items-start">
            <FormInput
              type="text"
              name="name"
              label="Contract Title"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Contract Details"
              defaultValue=""
            />
            <GuardianSelector
              guardians={guardians}
              selectSingleGuardian={true}
            />
            <ProgramSelector programs={programs} />
            <div className="md:col-span-2">
              <div className="grid gap-4 lg:grid-cols-2 my-4 content-start items-start lg:w-1/2" >
                <DateInput
                  name="startDate"
                  labelText="Contract Start Date"
                  defaultValue=""
                />
                <DateInput
                  name="endDate"
                  labelText="Contract End Date"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="md:col-span-2 md:flex md:justify-end">
              <SubmitButton
                text="Create Contract"
                className="mt-8 w-full md:w-auto"
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateContractPage;
