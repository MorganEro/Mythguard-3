'use client';

import {
  actionFunction,
  GuardianWithPrograms,
  ProgramWithGuardians,
} from '@/types';
import { useMemo, useState } from 'react';
import { SubmitButton } from '../form/Button';
import DateInput from '../form/DateInput';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import { GuardianSelector } from '../form/GuardianSelector';
import { ProgramSelector } from '../form/ProgramSelector';
import TextAreaInput from '../form/TextAreaInput';

function ContractWrapper({
  guardians,
  programs,
  createContractAction,
  defaultGuardianId,
  defaultProgramId,
}: {
  guardians: GuardianWithPrograms[];
  programs: ProgramWithGuardians[];
  createContractAction: actionFunction;
  defaultGuardianId?: string;
  defaultProgramId?: string;
}) {
  const [selectedGuardianId, setSelectedGuardianId] = useState<
    string | undefined
  >(defaultGuardianId);
  const [selectedProgramId, setSelectedProgramId] = useState<
    string | undefined
  >(defaultProgramId);

  const filteredGuardians = useMemo(() => {
    if (!selectedProgramId) return guardians;
    return guardians.filter(
      guardian =>
        Array.isArray(guardian.programs) &&
        guardian.programs.some(program => program.id === selectedProgramId)
    );
  }, [guardians, selectedProgramId]);

  const filteredPrograms = useMemo(() => {
    if (!selectedGuardianId) return programs;
    return programs.filter(
      program =>
        Array.isArray(program.guardians) &&
        program.guardians.some(guardian => guardian.id === selectedGuardianId)
    );
  }, [programs, selectedGuardianId]);

  return (
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
          guardians={filteredGuardians}
          selectSingleGuardian={true}
          defaultValue={selectedGuardianId}
          onChange={setSelectedGuardianId}
        />
        <ProgramSelector
          programs={filteredPrograms}
          defaultValue={selectedProgramId}
          onChange={setSelectedProgramId}
        />
        <div className="md:col-span-2">
          <div className="grid gap-4 lg:grid-cols-2 my-4 content-start items-start lg:w-1/2">
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
  );
}
export default ContractWrapper;
