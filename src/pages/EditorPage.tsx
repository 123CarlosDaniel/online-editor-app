import { io, Socket } from 'socket.io-client'
import EditorMonaco from '../components/EditorMonaco'
import { useEffect, useRef, useState } from 'react'
import Iframe from '../components/Iframe'
import { editor } from 'monaco-editor'
import { useParams } from 'react-router-dom'
import { serverRoute } from '../api/api'

function EditorPage() {
  const socket = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const HtmlRef = useRef<editor.ICodeEditor | null>(null)
  const CssRef = useRef<editor.ICodeEditor | null>(null)
  const JsRef = useRef<editor.ICodeEditor | null>(null)
  const [isHtmlMounted, setIsHtmlMounted] = useState(false)
  const [isCssMounted, setIsCssMounted] = useState(false)
  const [isJsMounted, setIsJsMounted] = useState(false)
  const params = useParams()
  useEffect(() => {
    const roomName = params.roomName

    socket.current = io(serverRoute)
    socket.current.on('connect', () => {
      console.log('you connected with id:', socket.current!.id)
    })
    socket.current?.emit('join_room', roomName, setIsConnected)
    return () => {
      socket.current?.emit('exit',roomName)
      setIsConnected(false)
      setIsHtmlMounted(false)
      setIsCssMounted(false)
      setIsJsMounted(false)
    }
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="editorElement">
          <EditorMonaco
            language={'Html'}
            socketClient={isConnected ? socket.current : null}
            isConnected={isConnected}
            editorRef={HtmlRef}
            setMounted={setIsHtmlMounted}
          />
        </div>
        <div className="editorElement">
          <EditorMonaco
            language={'Javascript'}
            socketClient={isConnected ? socket.current : null}
            isConnected={isConnected}
            editorRef={JsRef}
            setMounted={setIsJsMounted}
          />
        </div>
        <div className="editorElement">
          <EditorMonaco
            language={'Css'}
            socketClient={isConnected ? socket.current : null}
            isConnected={isConnected}
            editorRef={CssRef}
            setMounted={setIsCssMounted}
          />
        </div>
        <div className="editorElement">
          {isHtmlMounted && isCssMounted && isJsMounted && (
            <Iframe
              htmlEditor={HtmlRef.current}
              cssEditor={CssRef.current}
              jsEditor={JsRef.current}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditorPage
