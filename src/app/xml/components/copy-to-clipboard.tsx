import { useXmlContext } from "../xml-context";

export default function CopyToClipboard() {
  const { xmlOutput } = useXmlContext();
  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }
  return (
    <button
      className="bg-green-800 text-white px-4 py-2 rounded-md w-full whitespace-nowrap hover:bg-green-900 transition-all duration-300 hover:cursor-pointer"
      onClick={() => handleCopy(xmlOutput)}
    >
      Copy to Clipboard
    </button>
  );
}
