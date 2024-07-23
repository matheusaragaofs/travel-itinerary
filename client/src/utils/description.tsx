interface Props {
  label: string;
  value: string;
  textAlign?: 'center' | 'left' | 'right';
}
export function Description({ label, value, textAlign = 'left' }: Props) {
  return (
    <div className="flex gap-1 ">
      <div className="font-bold">{label}:</div>
      <div
        style={{
          textAlign,
        }}
      >
        {value}
      </div>
    </div>
  );
}
