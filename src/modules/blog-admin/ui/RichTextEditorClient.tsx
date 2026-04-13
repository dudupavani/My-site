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

const CKEDITOR_LICENSE_KEY =
  process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY ?? "GPL";

export default function RichTextEditorClient({
  value,
  onChange,
}: RichTextEditorClientProps) {
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
    <div>
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
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Parágrafo",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading2",
                view: "h2",
                title: "H2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "H3",
                class: "ck-heading_heading3",
              },
              {
                model: "heading4",
                view: "h4",
                title: "H4",
                class: "ck-heading_heading4",
              },
              {
                model: "heading5",
                view: "h5",
                title: "H5",
                class: "ck-heading_heading5",
              },
              {
                model: "heading6",
                view: "h6",
                title: "H6",
                class: "ck-heading_heading6",
              },
            ],
          },
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
