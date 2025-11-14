"use client";

import ConvertToXmlButton from "./components/convert-to-xml-button";
import XmlInputPanel from "./components/rawinput";
import XmlProvider, { useXmlContext } from "./xml-context";
import XmlOutput from "./components/xmloutput";
import CopyToClipboard from "./components/copy-to-clipboard";

export default function XmlConversionPanel() {
  return (
    <div className="container mx-auto p-8">
      <XmlProvider
        xmlContext={{
          textInput: "",
          xmlOutput: "",
          error: null,
          debugText: "",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">XML Conversion Page</h1>
        <div className="grid gap-8 grid-cols-[2fr_1fr_2fr]">
          <div className="col-span-1">
            <XmlInputPanel />
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center">
            <ConvertToXmlButton className="mb-2" />
            <CopyToClipboard />
          </div>
          <div className="col-span-1">
            <XmlOutput />
          </div>
        </div>
        {/*  For debugging        <DebugStatus /> */}
      </XmlProvider>
    </div>
  );
}

function DebugStatus() {
  const { debugText, error } = useXmlContext();

  return (
    <div className="text-base bg-white p-4 rounded-md w-full block">
      <code className="text-red-500">{error?.message}</code>
      <hr className="my-2" />
      <code className="text-gray-800">{debugText}</code>
    </div>
  );
}
