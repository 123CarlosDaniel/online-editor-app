import Editor, { OnMount } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { Socket } from 'socket.io-client'
import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react'
import { EditorContentManager } from '@convergencelabs/monaco-collab-ext'

interface IEditorMonaco {
  language: string
  socketClient: Socket | null
  isConnected: boolean
  editorRef: MutableRefObject<editor.ICodeEditor | null>
  setMounted: Dispatch<SetStateAction<boolean>>
}

type Targs = [index: number, length: any, text: string]

export default function EditorMonaco({
  language,
  socketClient,
  isConnected,
  editorRef,
  setMounted,
}: IEditorMonaco) {
  const contentManager = useRef<EditorContentManager>()

  const handleDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    setMounted(true)
    if (socketClient !== null) {
      contentManager.current = new EditorContentManager({
        editor: editorRef.current,
        onInsert(index, text) {
          socketClient.emit('clientInsert', index, text, language)
        },
        onReplace(index, length, text) {
          socketClient.emit('clientReplace', index, length, text, language)
        },
        onDelete(index, length) {
          socketClient.emit('clientDelete', index, length, language)
        },
      })

      socketClient.on('serverAction' + language, (action, ...args: Targs) => {
        switch (action) {
          case 'insert':
            contentManager.current?.insert(args[0], args[1])
            break
          case 'replace':
            contentManager.current?.replace(...args)
            break
          case 'delete':
            contentManager.current?.delete(args[0], args[1])
            break
        }
      })

      socketClient.emit('init', language)
      socketClient.on('initCode' + language, (code) => {
        contentManager.current?.insert(0, code)
      })
    }
  }

  return (
    <>
      {isConnected && (
        <Editor
          height={'100%'}
          width={'100%'}
          defaultLanguage={language.toLocaleLowerCase()}
          defaultValue=""
          theme="vs-dark"
          onMount={handleDidMount}
          options={{
            autoClosingQuotes: 'always',
            autoClosingBrackets: 'always',
            acceptSuggestionOnEnter: 'smart',
            tabSize: 2,
          }}
        />
      )}
    </>
  )
}
