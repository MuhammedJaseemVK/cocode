import React, { useEffect, useRef } from "react";
import { Socket } from "../pages/Workspace";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

interface CodeEditorProps {
  roomId: string | undefined;
  onCodeChange: (code: string) => void;
  socket: Socket;
  userName:string|undefined
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  roomId,
  socket,
  onCodeChange,
  userName
}) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorInstanceRef = useRef<Codemirror.EditorFromTextArea | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      const editorElement = Codemirror.fromTextArea(editorRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
      editorInstanceRef.current = editorElement;

      editorElement.on("change", (instance, changes) => {
        const { origin } = changes;
        const code: string = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue" && roomId && userName) {
          socket.emit("changeInCode", { roomId, code,userName });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("syncCode", (data) => {
        const { code } = data;
        if (code !== null && editorInstanceRef.current) {
          if(userName!==data.userName){
            editorInstanceRef.current.setValue(code);
          }
        }
      });
      return () => {
        socket.off("syncCode");
        if (editorInstanceRef.current) {
          editorInstanceRef.current.toTextArea();
          editorInstanceRef.current = null;
        }
      };
    }
  }, [socket]);

  return (
    <textarea
      id="codeEditor"
      ref={editorRef}
      style={{ height: "90vh", width: "50vw" }}
    />
  );
};

export default CodeEditor;
