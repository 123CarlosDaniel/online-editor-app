import { editor } from 'monaco-editor'
import { RefObject, useEffect, useRef } from 'react'
interface Code {
  html: string
  css: string
  js: string
}
import debouncer from '../utils/debouncer'

const createHtml = ({ html, css, js }: Code) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${css}
      </style>
    </head>
    <body>
      <script>
      ${js}
      </script>
      ${html}
    </body>
  </html>
  `
}

interface IframeProps {
  htmlEditor: editor.ICodeEditor | null
  cssEditor: editor.ICodeEditor | null
  jsEditor: editor.ICodeEditor | null
}

export default function Iframe({
  htmlEditor,
  cssEditor,
  jsEditor,
}: IframeProps) {
  const iframeRef = useRef() as RefObject<HTMLIFrameElement>
  const debouncerEditor = debouncer(() => {
    const html = htmlEditor!.getValue()
    const css = cssEditor!.getValue()
    const js = jsEditor!.getValue()
    const codePreview = createHtml({ html, css, js })
    iframeRef.current?.setAttribute('srcDoc', codePreview)
  }, 500)

  useEffect(() => {
    debouncerEditor()
    htmlEditor!.onDidChangeModelContent(debouncerEditor)
    cssEditor!.onDidChangeModelContent(debouncerEditor)
    jsEditor!.onDidChangeModelContent(debouncerEditor)
  }, [])

  return (
    <iframe ref={iframeRef} srcDoc="">
      Iframe
    </iframe>
  )
}
