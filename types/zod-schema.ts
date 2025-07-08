import { z, ZodSchema } from 'zod';

export const contractSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 400;
    },

    {
      message: 'Description must have between 2 and 400 words',
    }
  ),
  startDate: z.coerce.date({ required_error: 'Start date is required' })
    .min(new Date(), { message: 'Start date must be in the future' }),
  endDate: z.coerce.date({ required_error: 'End date is required' })
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});
export const eventSchema: ZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  locationArea: z
    .string()
    .min(2, { message: 'Location area is required' })
    .max(100, { message: 'Location area must be less than 100 characters' }),
  eventDate: z.coerce
    .date({ required_error: 'Event date is required' })
    .min(new Date(), { message: 'Event date must be in the future' }),
  shortDescription: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 40;
    },

    {
      message: 'Description must have between 2 and 40 words',
    }
  ),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 400;
    },

    {
      message: 'Description must have between 2 and 400 words',
    }
  ),
});
export const guardianSchema: ZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 400;
    },

    {
      message: 'Description must have between 2 and 400 words',
    }
  ),
  shortDescription: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 40;
    },

    {
      message: 'Description must have between 2 and 40 words',
    }
  ),
});
export const locationSchema: ZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  subtitle: z
    .string()
    .min(2, { message: 'Subtitle must be at least 2 characters' })
    .max(150, { message: 'Subtitle must be less than 150 characters' }),
  address: z
    .string()
    .min(4, { message: 'Address must be at least 4 characters' })
    .max(50, { message: 'Address must be less than 50 characters' }),
  shortDescription: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 40;
    },

    {
      message: 'Description must have between 2 and 40 words',
    }
  ),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 400;
    },
    {
      message: 'Description must have between 2 and 400 words',
    }
  ),
  lat: z.coerce
    .number()
    .min(-90, { message: 'Latitude must be between -90 and 90 degrees' })
    .max(90, { message: 'Latitude must be between -90 and 90 degrees' }),
  lng: z.coerce
    .number()
    .min(-180, { message: 'Longitude must be between -180 and 180 degrees' })
    .max(180, { message: 'Longitude must be between -180 and 180 degrees' }),
});
export const productSchema: ZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  company: z.string().min(4, { message: 'Company is required' }),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: 'Price must be a positive number' }),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 800;
    },
    {
      message: 'Description must have between 2 and 800 words',
    }
  ),

  featured: z.coerce.boolean(),
});
export const programSchema: ZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'name must be less than 50 characters' }),
  description: z.string().refine(
    description => {
      const wordCount = description.split(' ').length;
      return wordCount >= 2 && wordCount <= 400;
    },

    {
      message: 'Description must have between 2 and 400 words',
    }
  ),
});
export const reviewSchema = z
  .object({
    productId: z.string().optional(),
    programId: z.string().optional(),
    guardianId: z.string().optional(),
    authorName: z.string().refine(value => value !== '', {
      message: 'Author name cannot be empty',
    }),
    authorImageUrl: z.string().refine(value => value !== '', {
      message: 'Author image URL cannot be empty',
    }),
    rating: z.coerce
      .number()
      .int()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating must be at most 5' }),
    comment: z
      .string()
      .min(10, { message: 'Comment must be at least 10 characters long' })
      .max(1000, { message: 'Comment must be at most 1000 characters long' }),
  })
  .refine(
    data => {
      const keys = ['productId', 'programId', 'guardianId'];
      const count = keys.filter(key => data[key as keyof typeof data]).length;
      return count === 1;
    },
    {
      message:
        'Please provide exactly one of productId, programId, or guardianId',
    }
  );

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ['image/'];

  return z
    .instanceof(File)
    .refine(file => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1MB')
    .refine(file => {
      return (
        !file || acceptedFileTypes.some(type => file.type.startsWith(type))
      );
    }, 'File type must be an image');
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.errors.map(error => error.message);
    throw new Error(errorMessages.join('\n'));
  }
  return result.data;
}
