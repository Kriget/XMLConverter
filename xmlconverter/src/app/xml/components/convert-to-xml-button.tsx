import { useXmlContext } from "../xml-context";
import convertToXml from "./utils/convert-to-xml";

export default function ConvertToXmlButton({
  className,
}: {
  className?: string;
}) {
  const { textInput, setXmlOutput, setDebugText, setError } = useXmlContext();

  function handleConvertToXml() {
    const response = convertToXml(textInput);

    if (typeof response === "string") {
      setXmlOutput(response);
      setDebugText(response);
    } else {
      setDebugText(response.message);
      setError(response);
    }
  }
  return (
    <button
      className={` bg-blue-500 text-white px-4 py-2 rounded-md w-full whitespace-nowrap hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ${className}`}
      onClick={handleConvertToXml}
    >
      Convert to XML
    </button>
  );
}
