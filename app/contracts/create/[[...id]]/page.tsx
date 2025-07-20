import { createContractAction } from '@/actions/contract/contract-server-actions';
import { fetchAllGuardiansWithPrograms } from '@/actions/guardian/guardian-server-actions';
import { fetchAllProgramsWithGuardians } from '@/actions/program/program-server-actions';
import ContractWrapper from '@/components/contracts/ContractWrapper';
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
        <ContractWrapper
          guardians={guardians}
          programs={programs}
          createContractAction={createContractAction}
          defaultGuardianId={selectedGuardianId}
          defaultProgramId={selectedProgramId}
        />
      </div>
    </section>
  );
}

export default CreateContractPage;
