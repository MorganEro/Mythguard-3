import {
  fetchAdminProgramDetails,
  fetchRelatedGuardians,
  updateProgramAction,
  updateProgramImageAction,
} from '@/actions/program/program-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';

async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await fetchAdminProgramDetails(id);
  const guardians = await fetchAllGuardians();
  const relatedGuardians = await fetchRelatedGuardians(id);

  if ('message' in program) {
    return <div>{program.message}</div>;
  }

  if ('message' in relatedGuardians) {
    return <div>{relatedGuardians.message}</div>;
  } else {
    const { id: programId, name, description } = program;

    return (
      <section>
        <BreadCrumbs
          homeName="Admin"
          homeLink="/admin"
          previousName="Programs"
          previousLink="/admin/programs"
          currentName="Update Program"
        />
        <h1 className="text-2xl font-semibold mb-8 capitalize">
          Update Program
        </h1>
        <div className="border p-8 rounded-md">
          <ImageInputContainer
            action={updateProgramImageAction}
            name={name}
            image={program.image}
            text="Update Image">
            <input
              type="hidden"
              name="id"
              value={programId}
            />
            <input
              type="hidden"
              name="url"
              value={program.image}
            />
          </ImageInputContainer>
          <FormContainer action={updateProgramAction}>
            <div className="grid gap-4 my-4">
              <input
                type="hidden"
                name="id"
                value={programId}
              />
              <FormInput
                type="text"
                name="name"
                label="Program Name"
                defaultValue={name}
              />
              <TextAreaInput
                name="description"
                labelText="Program Description"
                defaultValue={description}
              />
              <div className="grid md:w-1/2">
                <GuardianSelector
                  guardians={guardians}
                  selectedGuardians={relatedGuardians}
                />
              </div>
              <div className="mt-6">
                <Button
                  type="reset"
                  variant="outline"
                  size="sm"
                  className="mt-8 mr-3 sm:mr-4">
                  Reset
                </Button>
                <SubmitButton
                  text="Update Program"
                  className="mt-8"
                />
              </div>
            </div>
          </FormContainer>
        </div>
      </section>
    );
  }
}
export default EditProgramPage;
