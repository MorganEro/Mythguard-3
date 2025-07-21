import { createContractAction } from '@/actions/contract/contract-server-actions';
import { fetchAllGuardiansWithPrograms } from '@/actions/guardian/guardian-server-actions';
import { fetchAllProgramsWithGuardians } from '@/actions/program/program-server-actions';
import ContractWrapper from '@/components/contracts/ContractWrapper';
import Section from '@/components/global/sections/Section';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { GuardianWithPrograms, ProgramWithGuardians } from '@/types';

async function CreateContractPage({
  params,
}: {
  params: Promise<{ id?: string[] } | undefined>;
}) {
  const guardians =
    (await fetchAllGuardiansWithPrograms()) as GuardianWithPrograms[];
  const programs =
    (await fetchAllProgramsWithGuardians()) as ProgramWithGuardians[];

  let selectedGuardianId: string | undefined;
  let selectedProgramId: string | undefined;

  if ((await params)?.id?.length === 2) {
    const [type, targetId] = (await params)?.id ?? [];
    selectedGuardianId = type === 'guardian' ? targetId : undefined;
    selectedProgramId = type === 'program' ? targetId : undefined;
  }

  return (
    <Section title="Create Contract">
      <BreadCrumbs
        homeName="Contracts"
        homeLink="/contracts"
        currentName="Create Contract"
      />
      <div className="border p-8 rounded-md">
        <ContractWrapper
          guardians={guardians}
          programs={programs}
          createContractAction={createContractAction}
          defaultGuardianId={selectedGuardianId}
          defaultProgramId={selectedProgramId}
        />
      </div>
    </Section>
  );
}

export default CreateContractPage;
