import { createLocationAction } from '@/actions/location/location-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import LocationPositionInput from '@/components/form/LocationPositionInput';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

function CreateLocationPage() {
  return (
    <section>
      <BreadCrumbs
        homeName="Admin"
        homeLink="/admin"
        previousName="Locations"
        previousLink="/admin/locations"
        currentName="Create Location"
      />
      <h1 className="text-2xl font-semibold mb-8 capitalize">create location</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createLocationAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4 items-start">
            <FormInput
              type="text"
              name="name"
              label="Location Name"
              defaultValue=""
            />
            <FormInput
              type="text"
              name="subtitle"
              label="Location Subtitle"
              defaultValue=""
            />
            <div className="md:col-span-2 space-y- grid md:grid-cols-2 gap-4">
              <ImageInput field="image" />
              <ImageInput field="mapIcon" />
            </div>
            <FormInput
              type="text"
              name="address"
              label="Location Address"
              defaultValue=""
            />
            <div className="grid grid-cols-2 gap-4">
              <LocationPositionInput
                min={-90}
                max={90}
                step={0.0001}
                type="number"
                name="lat"
                label="Latitude"
                defaultValue={0}
              />
              <LocationPositionInput
                min={-180}
                max={180}
                step={0.0001}
                type="number"
                name="lng"
                label="Longitude"
                defaultValue={0}
              />
            </div>
            <TextAreaInput
              name="shortDescription"
              labelText="Location Short Description"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Location Description"
              defaultValue=""
            />
            <div className="md:col-span-2 md:flex md:justify-end">
              <SubmitButton
                text="Create Location"
                className="mt-8 w-full md:w-auto"
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateLocationPage;
