import { fetchAdminLocationDetails , updateLocationAction, updateLocationImageAction } from '@/actions/location/location-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import LocationPositionInput from '@/components/form/LocationPositionInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import BreadCrumbs from '@/components/ui/BreadCrumbs';

async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await fetchAdminLocationDetails(id);

  if ('message' in location) {
    return <div>{location.message}</div>;
  } else {
    const {
      id: locationId,
      name,
      description,
      subtitle,
      shortDescription,
      address,
      lat,
      lng,
    } = location;

    return (
      <section>
        <BreadCrumbs
          homeName="Admin"
          homeLink="/admin"
          previousName="Locations"
          previousLink="/admin/locations"
          currentName="Update Location"
        />
        <h1 className="text-2xl font-semibold mb-8 capitalize">
          Update Location
        </h1>
        <div className="border p-8 rounded-md">
          <ImageInputContainer
            action={updateLocationImageAction}
            name={name}
            image={location.image}
            text="Update Image">
            <input
              type="hidden"
              name="id"
              value={locationId}
            />
            <input
              type="hidden"
              name="url"
              value={location.image}
            />
            <input
              type="hidden"
              name="field"
              value="image"
            />
          </ImageInputContainer>
          <ImageInputContainer
            action={updateLocationImageAction}
            name={name}
            image={location.mapIcon}
            text="Update Map Icon">
            <input
              type="hidden"
              name="id"
              value={locationId}
            />
            <input
              type="hidden"
              name="url"
              value={location.mapIcon}
            />
            <input
              type="hidden"
              name="field"
              value="mapIcon"
            />
          </ImageInputContainer>
          <FormContainer action={updateLocationAction}>
            <div className="grid gap-4 my-4">
              <input
                type="hidden"
                name="id"
                value={locationId}
              />
              <FormInput
                type="text"
                name="name"
                label="Location Name"
                defaultValue={name}
              />
              <FormInput
                type="text"
                name="subtitle"
                label="Location Subtitle"
                defaultValue={subtitle}
              />
              <FormInput
                type="text"
                name="address"
                label="Location Address"
                defaultValue={address}
              />
              <FormInput
                type="text"
                name="shortDescription"
                label="Location Short Description"
                defaultValue={shortDescription}
              />    
              <TextAreaInput
                name="description"
                labelText="Location Description"
                defaultValue={description}
              />
              <LocationPositionInput
                type="number"
                name="lat"
                label="Location Latitude"
                min={-90}
                max={90}
                step={0.0001}
                defaultValue={lat}
              />
              <LocationPositionInput
                type="number"
                name="lng"
                label="Location Longitude"
                min={-180}
                max={180}
                step={0.0001}
                defaultValue={lng}
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
                  text="Update Location"
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
export default EditLocationPage;
