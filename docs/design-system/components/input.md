# Input

`Input` is the shared text field component. It renders a native `input` element.

## Import

```tsx
import { Input } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Field height, padding and text size |
| `className` | `string` | - | Optional extension for local layout tweaks |

It also accepts all native `input` props, except the native `size` attribute.

## Examples

```tsx
<Input placeholder="Nome" />
<Input size="lg" type="email" placeholder="voce@dominio.com" />
<Input size="xl" placeholder="Titulo do post" />
<Input aria-invalid />
```
