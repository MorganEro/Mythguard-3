import { z, ZodSchema } from 'zod';

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
