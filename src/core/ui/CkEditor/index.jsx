import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const CkEditor = ({ content = '', onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  React.useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  return (
    <div>
    dasdsad
      <EditorContent editor={editor} />
    </div>
  );
};

export default CkEditor;
