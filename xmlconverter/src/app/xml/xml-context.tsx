 "use client";
import React, { createContext, useContext, useState } from "react";
import { XmlParseError } from "./types";

type XmlContextProps = {
    textInput: string;
    xmlOutput: string;
    error: XmlParseError | null;
    debugText: string;
};

type XmlContextType = {
  textInput: string;
  setTextInput: (textInput: string) => void;
  xmlOutput: string;
  setXmlOutput: (xmlOutput: string) => void;
  error: XmlParseError | null;
  setError: (error: XmlParseError | null) => void;
  debugText: string;
  setDebugText: (debugText: string) => void;
};

const XmlContext = createContext<XmlContextType | null>(null);

export default function XmlProvider({
  children,
  xmlContext,
}: {
  children: React.ReactNode;
  xmlContext: XmlContextProps;
}) {
  const [textInput, setTextInput] = useState(xmlContext.textInput);
  const [xmlOutput, setXmlOutput] = useState(xmlContext.xmlOutput);
  const [error, setError] = useState(xmlContext.error);
  const [debugText, setDebugText] = useState(xmlContext.debugText);

  return (
    <XmlContext.Provider
      value={{
        textInput,
        setTextInput,
        xmlOutput,
        setXmlOutput,
        error,
        setError,
        debugText,
        setDebugText,
      }}
    >
      {children}
    </XmlContext.Provider>
  );
}

export function useXmlContext() {
  const context = useContext(XmlContext);
  if (!context) {
    throw new Error("useXmlContext must be used within a XmlProvider");
  }
  return context;
}
