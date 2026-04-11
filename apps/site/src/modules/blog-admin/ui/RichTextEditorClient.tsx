"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef } from "react";

type RichTextEditorClientProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

type CkEditorInstance = {
  getData: () => string;
  setData: (value: string) => void;
};

const CKEDITOR_LICENSE_KEY = process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY ?? "GPL";

export default function RichTextEditorClient({ value, onChange }: RichTextEditorClientProps) {
  const editorRef = useRef<CkEditorInstance | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }
    if (editor.getData() === value) {
      return;
    }
    editor.setData(value);
  }, [value]);

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <CKEditor
        editor={ClassicEditor as never}
        data={value}
        config={{
          licenseKey: CKEDITOR_LICENSE_KEY,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "insertTable",
            "undo",
            "redo",
          ],
        }}
        onReady={(editor) => {
          editorRef.current = editor as unknown as CkEditorInstance;
        }}
        onChange={(_event, editor) => {
          onChange((editor as unknown as CkEditorInstance).getData());
        }}
      />
    </div>
  );
}

