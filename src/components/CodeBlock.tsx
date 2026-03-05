'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Props {
  code: string
  language?: string
}

export default function CodeBlock({ code, language = 'javascript' }: Props) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="relative my-10 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">

      {/* COPY BUTTON */}
      <button
        onClick={copyCode}
        className="absolute top-4 right-4 z-10 text-xs bg-black/70 text-white px-3 py-1 rounded-md hover:bg-black transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {/* LANGUAGE LABEL */}
      <div className="absolute top-4 left-4 text-xs text-gray-300 uppercase">
        {language}
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '28px 20px 20px 20px',
          fontSize: '14px',
          background: '#0B1C2D',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}