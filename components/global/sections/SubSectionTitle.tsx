import { Separator } from '@/components/ui/separator';
function SubSectionTitle({ text, lined }: { text: string; lined?: boolean }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{text}</h3>
      {lined && <Separator />}
    </div>
  );
}
export default SubSectionTitle;
