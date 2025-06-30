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
          <div className="grid gap-4 md:grid-cols-2 my-4">
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
            <div className="col-span-2 space-y-4">
              <ImageInput field="image" />
              <ImageInput field="mapIcon" />
            </div>
            <FormInput
              type="text"
              name="shortDescription"
              label="Location Short Description"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Location Description"
              defaultValue=""
            />
            <TextAreaInput
              name="address"
              labelText="Location Address"
              defaultValue=""
            />
            <LocationPositionInput
              min={-90}
              max={90}
              step={0.0001}
              type="number"
              name="lat"
              label="Location Latitude"
              defaultValue={0}
            />
            <LocationPositionInput
              min={-180}
              max={180}
              step={0.0001}
              type="number"
              name="lng"
              label="Location Longitude"
              defaultValue={0}
            />
            <SubmitButton
              text="Create Location"
              className="mt-8"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateLocationPage;
