import { useXmlContext } from "../xml-context";

export default function XmlInputPanel() {
  const { textInput, setTextInput } = useXmlContext();

  return (
    <div>
      <h2 className="text-2xl font-bold">Input Raw Data</h2>
      <textarea
        value={textInput}
        className="w-full h-96 p-4 border border-gray-300 rounded-md whitespace-pre-wrap"
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>
    </div>
  );
}
