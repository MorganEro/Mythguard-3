'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { SubmitButton } from './Button';
import { actionFunction } from '@/types';

type imageInputContainerProps = {
  image: string;
  name: string;
  text: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function ImageInputContainer(props: imageInputContainerProps) {
  const { image, name, text, action } = props;
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
      />
      <Button
        variant="outline"
        onClick={() => setIsUpdateFormVisible(prev => !prev)}>
        {isUpdateFormVisible ? 'Cancel Image Update' : text}
      </Button>
      {isUpdateFormVisible && (
        <div className="mt-4 max-v-md">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton
              size="sm"
              text={text}
            />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
