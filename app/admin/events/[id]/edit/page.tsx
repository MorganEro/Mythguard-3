import {
  fetchAdminEventDetails,
  fetchRelatedGuardians,
  fetchRelatedLocation,
  updateEventAction,
  updateEventImageAction,
} from '@/actions/event/event-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import { fetchAllLocations } from '@/actions/location/location-server-actions';
import { LocationSelector } from '@/components/form/LocationSelector';
import DateInput from '@/components/form/DateInput';

async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await fetchAdminEventDetails(id);
  const guardians = await fetchAllGuardians();
  const relatedGuardians = await fetchRelatedGuardians(id);
  const locations = await fetchAllLocations();
  const relatedLocation = await fetchRelatedLocation(id);

  if ('message' in event) {
    return <div>{event.message}</div>;
  }

  if ('message' in relatedGuardians) {
    return <div>{relatedGuardians.message}</div>;
  }
  if ('message' in relatedLocation) {
    return <div>{relatedLocation.message}</div>;
  } else {
    const {
      id: eventId,
      name,
      description,
      shortDescription,
      eventDate,
      image,
      locationArea,
    } = event;

    return (
      <section>
        <BreadCrumbs
          homeName="Admin"
          homeLink="/admin"
          previousName="Events"
          previousLink="/admin/events"
          currentName="Update Event"
        />
        <h1 className="text-2xl font-semibold mb-8 capitalize">Update Event</h1>
        <div className="border p-8 rounded-md">
          <ImageInputContainer
            action={updateEventImageAction}
            name={name}
            image={image}
            text="Update Image">
            <input
              type="hidden"
              name="id"
              value={eventId}
            />
            <input
              type="hidden"
              name="url"
              value={image}
            />
          </ImageInputContainer>
          <FormContainer action={updateEventAction}>
            <div className="grid gap-4 my-4">
              <input
                type="hidden"
                name="id"
                value={eventId}
              />
              <FormInput
                type="text"
                name="name"
                label="Event Name"
                defaultValue={name}
              />
              <FormInput
                type="text"
                name="locationArea"
                label="Event Location Area"
                defaultValue={locationArea}
              />
              <DateInput
                name="eventDate"
                labelText="Event Date"
                defaultValue={eventDate}
              />
              <TextAreaInput
                name="shortDescription"
                labelText="Event Short Description"
                defaultValue={shortDescription}
              />
              <TextAreaInput
                name="description"
                labelText="Event Description"
                defaultValue={description}
              />
              <div className="grid md:w-1/2">
                <GuardianSelector
                  guardians={guardians}
                  selectedGuardians={relatedGuardians}
                />
              </div>
              <div className="grid md:w-1/2">
                <LocationSelector
                  locations={locations}
                  selectedLocation={relatedLocation}
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
                  text="Update Event"
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
export default EditEventPage;
