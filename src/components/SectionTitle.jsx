export default function SectionTitle({ title }) {
  return (
    <>
      <h3 className="text-2xl font-medium text-center">{title}</h3>
      <div className="mx-auto mt-2 h-[1px] w-20 bg-gray-400" />
    </>
  );
}