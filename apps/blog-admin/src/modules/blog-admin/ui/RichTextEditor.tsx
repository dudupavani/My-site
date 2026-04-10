"use client";

import dynamic from "next/dynamic";

type RichTextEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
};

const RichTextEditorClient = dynamic(() => import("./RichTextEditorClient"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
      Carregando editor...
    </div>
  ),
});

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return <RichTextEditorClient value={value} onChange={onChange} />;
}

