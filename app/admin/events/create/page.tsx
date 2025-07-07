import { createEventAction } from '@/actions/event/event-server-actions';
import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import ImageInput from '@/components/form/ImageInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { GuardianSelector } from '@/components/form/GuardianSelector';
import { fetchAllGuardians } from '@/actions/guardian/guardian-server-actions';
import { fetchAllLocations } from '@/actions/location/location-server-actions';
import { LocationSelector } from '@/components/form/LocationSelector';
import DateInput from '@/components/form/DateInput';

async function CreateEventPage() {
  const guardians = await fetchAllGuardians();
  const locations = await fetchAllLocations();
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create event</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createEventAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Event Name"
              defaultValue=""
            />

            <FormInput
              type="text"
              name="locationArea"
              label="Event Location Area"
              defaultValue=""
            />
            <DateInput
              name="eventDate"
              labelText="Event Date"
              defaultValue=""
            />
            <ImageInput />
            <TextAreaInput
              name="shortDescription"
              labelText="Event Short Description"
              defaultValue=""
            />
            <TextAreaInput
              name="description"
              labelText="Event Description"
              defaultValue=""
            />
            <GuardianSelector guardians={guardians} />
            <LocationSelector locations={locations} />
            <SubmitButton
              text="Create Event"
              className="mt-8"
            />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateEventPage;
