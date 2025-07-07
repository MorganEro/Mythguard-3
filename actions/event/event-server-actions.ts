'use server';

import db from '@/lib/db';
import { checkRole } from '@/lib/roles';
import { deleteImage, uploadImage } from '@/lib/supabase';
import { renderError } from '@/lib/utils/error';
import { errorMessage, validateWithZodSchema } from '@/types';
import { eventSchema, imageSchema } from '@/types/zod-schema';
import { Guardian, Location } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const fetchAllEvents = async () => {
  const events = await db.event.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return events;
};

export const fetchSingleEventWithRelatedFields = async (eventId: string) => {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      guardians: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      location: {
        select: {
          id: true,
          name: true,
          address: true,
          image: true,
        },
      },
    },
  });

  if (!event) redirect('/admin/events');

  return event;
};

export const createEventAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; redirectTo?: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const rawData = Object.fromEntries(formData);
    const guardianIdsRaw = formData.getAll('guardianIds');
    const locationId = formData.get('locationId') as string;
    const guardianIds = guardianIdsRaw
      .flatMap(ids => ids.toString().split(','))
      .filter(Boolean);
    const dataWithGuardians = {
      ...rawData,
      guardians: guardianIds,
      locationId: locationId,
    };

    const validatedFields = validateWithZodSchema(
      eventSchema,
      dataWithGuardians
    );
    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema, {
      image: file,
    });
    const uploadedImagePath = await uploadImage(validatedFile.image, 'EVENTS');
    await db.event.create({
      data: {
        ...validatedFields,
        image: uploadedImagePath,
        guardians: {
          connect: guardianIds.map(id => ({ id })),
        },
        location: {
          connect: { id: locationId },
        },
      },
    });
    const { name } = validatedFields;
    return {
      message: `Event ${name} created successfully`,
      redirectTo: '/admin/events',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminEventDetails = async (eventId: string) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) redirect('/admin/events');

  return event;
};

export const updateEventAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const rawData = Object.fromEntries(formData);
    const guardianIdsRaw = formData.getAll('guardianIds');
    const locationId = formData.get('locationId') as string;
    const guardianIds = guardianIdsRaw
      .flatMap(ids => ids.toString().split(','))
      .filter(Boolean);
    const dataWithGuardianAndLocations = {
      ...rawData,
      guardians: guardianIds,
      locationId,
    };
    const validatedFields = validateWithZodSchema(
      eventSchema,
      dataWithGuardianAndLocations
    );
    const event = await db.event.update({
      where: {
        id: formData.get('id') as string,
      },
      data: {
        ...validatedFields,
        guardians: {
          set: [],
          connect: guardianIds.map(id => ({ id })),
        },
        location: {
          connect: { id: locationId },
        },
      },
    });
    const { name } = event;
    return {
      message: `Event ${name} updated successfully`,
      redirectTo: '/admin/events',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const updateEventImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const image = formData.get('image') as File;
    const eventId = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const uploadedImagePath = await uploadImage(validatedFile.image, 'EVENTS');
    await deleteImage(oldImageUrl, 'EVENTS');
    await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        image: uploadedImagePath,
      },
    });
    revalidatePath(`/admin/events/${eventId}/edit`);
    const cookieStore = await cookies();
    cookieStore.set('success', 'Event image updated successfully', {
      maxAge: 5,
    });
    return { message: 'Event image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteEventAction = async (prevState: {
  eventId: string;
}): Promise<{ message: string }> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }

  try {
    await db.event.delete({
      where: { id: prevState.eventId },
    });

    revalidatePath('/admin/events');
    return { message: 'Event deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRelatedLocation = async (
  eventId: string
): Promise<Location | errorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const events = await db.event.findMany({
      where: {
        id: eventId,
      },
      select: {
        location: true,
      },
    });
    const location = events.length > 0 ? events[0].location : null;
    if (!location) {
      return { message: 'Location not found' };
    }
    return location;
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRelatedGuardians = async (
  eventId: string
): Promise<Guardian[] | errorMessage> => {
  if (!checkRole('admin')) {
    return { message: 'Unauthorized. Admin access required.' };
  }
  try {
    const events = await db.event.findMany({
      where: {
        id: eventId,
      },
      select: {
        guardians: true,
      },
    });
    const guardians = events.length > 0 ? events[0].guardians : [];
    if (guardians.length === 0) {
      return [];
    }
    return guardians;
  } catch (error) {
    return renderError(error);
  }
};
