import { Separator } from '../ui/separator';
function SubSectionTitle({ text, lined }: { text: string; lined?: boolean }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{text}</h3>
      {lined && <Separator />}
    </div>
  );
}
export default SubSectionTitle;
