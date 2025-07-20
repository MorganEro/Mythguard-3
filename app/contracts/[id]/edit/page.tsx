import { updateContractAction, fetchSingleContractWithRelatedFields } from '@/actions/contract/contract-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { fetchAllGuardiansWithPrograms } from '@/actions/guardian/guardian-server-actions';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllProgramsWithGuardians } from '@/actions/program/program-server-actions';
import { ProgramSelector } from '@/components/form/ProgramSelector';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import DateInput from '@/components/form/DateInput';
import { Guardian, Program } from '@prisma/client';

async function EditContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contract = await fetchSingleContractWithRelatedFields(id);

  if ('message' in contract) {
    return <div>{contract.message}</div>;
  }
  const { name, description, startDate, endDate, guardian, program } = contract;

  const guardians = await fetchAllGuardiansWithPrograms();
  const programs = await fetchAllProgramsWithGuardians();

  return (
    <section>
      <BreadCrumbs
        homeName="Contracts"
        homeLink="/contracts"
        currentName="Edit Contract"
      />
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        edit contract
      </h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={updateContractAction}>
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-4 md:grid-cols-2 my-4 content-start items-start">
            <FormInput
              type="text"
              name="name"
              label="Contract Title"
              defaultValue={name}
            />
            <TextAreaInput
              name="description"
              labelText="Contract Details"
              defaultValue={description}
            />
            <GuardianSelector
              guardians={guardians}
              selectSingleGuardian={true}
              selectedGuardians={guardian as Guardian}
            />
            <ProgramSelector programs={programs} selectedProgram={program as Program} />
            <div className="md:col-span-2">
              <div className="grid gap-4 lg:grid-cols-2 my-4 content-start items-start lg:w-1/2" >
                <DateInput
                  name="startDate"
                  labelText="Contract Start Date"
                  defaultValue={startDate}
                />
                <DateInput
                  name="endDate"
                  labelText="Contract End Date"
                  defaultValue={endDate}
                />
              </div>
            </div>
            <div className="md:col-span-2 md:flex md:justify-end">
              <SubmitButton
                text="Update Contract"
                className="mt-8 w-full md:w-auto"
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default EditContractPage;
