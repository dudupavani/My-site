# Label

`Label` is the shared form label component. It renders a native `label` element.

## Import

```tsx
import { Label } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Text size |
| `className` | `string` | - | Optional extension for local layout tweaks |

It also accepts all native `label` props.

## Examples

```tsx
<Label htmlFor="title">Titulo</Label>
<Input id="title" />
```
