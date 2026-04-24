# Badge

`Badge` is a small, non-interactive label used for metadata, status, category names and compact visual tags.

## Import

```tsx
import { Badge } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"gray-light" \| "gray-dark" \| "gray-outline" \| "gold-dark" \| "gold-light" \| "gold-outline"` | `"gray-light"` | Visual color treatment |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Badge height, horizontal padding and text size |
| `className` | `string` | - | Optional extension for local layout tweaks |

It also accepts all native `span` props.

## Sizes

| Size | Use when |
| --- | --- |
| `sm` | Dense metadata, compact lists and tight card headers |
| `md` | Default badges and chips |
| `lg` | More prominent labels in editorial or marketing sections |

## Variants

| Variant | Use when |
| --- | --- |
| `gray-light` | Neutral badge on light or mixed backgrounds |
| `gray-dark` | Neutral badge on dark public surfaces |
| `gray-outline` | Low-emphasis neutral badge |
| `gold-dark` | Strong brand emphasis on light or neutral surfaces |
| `gold-light` | Softer brand emphasis on light surfaces |
| `gold-outline` | Premium/editorial label on dark public surfaces |

## Examples

```tsx
<Badge>Default</Badge>
<Badge size="sm" variant="gray-outline">Draft</Badge>
<Badge size="lg" variant="gold-outline">Trajetoria</Badge>
```

## Accessibility

`Badge` renders as a `span` and is not interactive. Do not use it for clickable actions. Use a button or link when the element performs an action or navigation.
