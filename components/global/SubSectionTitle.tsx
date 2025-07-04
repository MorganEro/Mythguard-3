import { Separator } from '../ui/separator';
function SubSectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h3 className="text-2xl font-bold">{text}</h3>
      <Separator />
    </div>
  );
}
export default SubSectionTitle;
