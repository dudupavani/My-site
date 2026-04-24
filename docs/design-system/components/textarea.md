# Textarea

`Textarea` is the shared multi-line text field component. It renders a native `textarea` element.

## Import

```tsx
import { Textarea } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding and text size |
| `className` | `string` | - | Optional extension for local layout tweaks |

It also accepts all native `textarea` props.

## Examples

```tsx
<Textarea placeholder="Descrição" />
<Textarea size="lg" rows={6} />
<Textarea aria-invalid />
```
