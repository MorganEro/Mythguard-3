import { updateGuardianAction, updateGuardianImageAction, fetchAdminGuardianDetails } from '@/actions/guardian/guardian-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

async function EditGuardianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guardian = await fetchAdminGuardianDetails(id);

  if ('message' in guardian) {
    return <div>{guardian.message}</div>;
  } else {
    const {
      id: guardianId,
      name,
      description,
      shortDescription,
    } = guardian;

    return (
      <section>
        <BreadCrumbs
          homeName="Admin"
          homeLink="/admin"
          previousName="Guardians"
          previousLink="/admin/guardians"
          currentName="Update Guardian"
        />
        <h1 className="text-2xl font-semibold mb-8 capitalize">
          Update Guardian
        </h1>
        <div className="border p-8 rounded-md">
          <ImageInputContainer
            action={updateGuardianImageAction}
            name={name}
            image={guardian.image}
            text="Update Image">
            <input
              type="hidden"
              name="id"
              value={guardianId}
            />
            <input
              type="hidden"
              name="url"
              value={guardian.image}
            />
          </ImageInputContainer>
          <FormContainer action={updateGuardianAction}>
            <div className="grid gap-4 my-4">
              <input
                type="hidden"
                name="id"
                value={guardianId}
              />
              <FormInput
                type="text"
                name="name"
                label="Guardian Name"
                defaultValue={name}
              />
              <TextAreaInput
                name="description"
                labelText="Guardian Description"
                defaultValue={description}
              />
              <TextAreaInput
                name="shortDescription"
                labelText="Guardian Short Description"
                defaultValue={shortDescription}
              />
              <div className="mt-6">
                <Button
                  type="reset"
                  variant="outline"
                  size="sm"
                  className="mt-8 mr-3 sm:mr-4">
                  Reset
                </Button>
                <SubmitButton
                  text="Update Guardian"
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
export default EditGuardianPage;
