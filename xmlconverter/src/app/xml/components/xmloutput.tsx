import { useXmlContext } from "../xml-context";

export default function XmlOutput() {
  const { xmlOutput } = useXmlContext();
  return (
    <div className="col-span-1">
      <h2 className="text-2xl font-bold">Output XML</h2>
      <textarea
        value={xmlOutput}
        readOnly
        className="w-full h-96 p-4 border border-gray-300 rounded-md"
      ></textarea>
    </div>
  );
}
