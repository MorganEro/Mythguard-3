'use client';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';
import { LiaEditSolid } from 'react-icons/lia';
import { SignInButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  onClick?: () => void;
};



export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn('capitalize', className)}
      size={size}>
      {pending ? (
        <>
          <IoReload className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = 'edit' | 'delete';

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();
  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LiaEditSolid />;
      case 'delete':
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      variant="link"
      disabled={pending}
      className="p-2 cursor-pointer"
      size="icon">
      {pending ? (
        <IoReload className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        renderIcon()
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        variant="outline"
        asChild
        className="p-2 cursor-pointer"
        size="icon">
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};
export const LikeSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        variant="outline"
        asChild
        className="p-2 cursor-pointer"
        size="icon">
        <AiOutlineLike />
      </Button>
    </SignInButton>
  );
};
export const CartSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        className="mt-8 capitalize">
        sign in
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="p-2 cursor-pointer">
          {pending ? (
            <IoReload className="mr-2 h-4 w-4 animate-spin" />
          ) : isFavorite ? (
            <FaHeart className="text-orange-700" />
          ) : (
            <FaRegHeart />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {pending
            ? 'Please wait...'
            : isFavorite
              ? 'Favorite'
              : 'Add to Favorite'}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
export const LikeSubmitButton = ({ isLiked }: { isLiked: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="p-2 cursor-pointer">
          {pending ? (
            <IoReload className="mr-2 h-4 w-4 animate-spin" />
          ) : isLiked ? (
            <AiFillLike className="text-yellow-500" />
          ) : (
            <AiOutlineLike />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{pending ? 'Please wait...' : isLiked ? 'Liked' : 'Like'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const AddNewButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90">
      <PlusIcon className="w-3 h-3" />
    </Link>
  );
};

type CreateContractButtonProps ={
  guardianId?: string;
  programId?: string;
}

export const CreateContractButton = ({ guardianId, programId }: CreateContractButtonProps) => {
  const path = guardianId 
    ? `/contracts/create/guardian/${guardianId}`
    : programId
    ? `/contracts/create/program/${programId}`
    : '/contracts/create';

  return (
    <Link
      href={path}
      className="text-xs bg-primary text-primary-foreground p-2 rounded-sm fixed bottom-6 right-8 z-50 opacity-70 hover:opacity-100 transition-opacity duration-300">
      Select for Contract
    </Link>
  );
};