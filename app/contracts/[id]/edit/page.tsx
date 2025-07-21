import { fetchSingleContractWithRelatedFields, updateContractAction } from '@/actions/contract/contract-server-actions';
import { fetchAllGuardiansWithPrograms } from '@/actions/guardian/guardian-server-actions';
import { fetchAllProgramsWithGuardians } from '@/actions/program/program-server-actions';
import EditContractWrapper from '@/components/contracts/EditContractWrapper';
import Section from '@/components/global/sections/Section';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { ContractWithGuardianAndProgram, GuardianWithPrograms, ProgramWithGuardians } from '@/types';

async function EditContractPage({  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const guardians =
    (await fetchAllGuardiansWithPrograms()) as GuardianWithPrograms[];
  const programs =
    (await fetchAllProgramsWithGuardians()) as ProgramWithGuardians[];

  const { id } = await params;
  const contract = await fetchSingleContractWithRelatedFields(id) as ContractWithGuardianAndProgram;

  if ('message' in contract) {
    return console.error(contract.message);
  }

  const { guardian, program } = contract;




  return (
    <Section title="Edit Contract">
      <BreadCrumbs
        homeName="Contracts"
        homeLink="/contracts"
        currentName="Edit Contract"
      />
      <div className="border p-8 rounded-md">
        <EditContractWrapper
          guardians={guardians}
          programs={programs}
          updateContractAction={updateContractAction}
          defaultGuardianId={guardian.id}
          defaultProgramId={program.id}
          id={id}
          contract={contract}
        />
      </div>
    </Section>
  );
}

export default EditContractPage;
