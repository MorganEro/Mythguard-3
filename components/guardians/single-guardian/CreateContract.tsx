import { TbContract } from 'react-icons/tb';
import { Button } from '../../ui/button';

function CreateContract({ id }: { id: string }) {
  console.log(`Creating contract with ID: ${id}`);
  return (
    <Button
      className="capitalize mt-8 flex items-center gap-2"
      size={'lg'}>
      <TbContract className="w-6 h-6" />
      New Contract
    </Button>
  );
}
export default CreateContract;
