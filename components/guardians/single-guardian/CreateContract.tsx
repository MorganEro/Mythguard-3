import { Button } from '../../ui/button';

function CreateContract({ id }: { id: string }) {
  console.log(`Creating contract with ID: ${id}`);
  return (
    <Button
      className="capitalize"
      size={'lg'}>
      New Contract
    </Button>
  );
}
export default CreateContract;
