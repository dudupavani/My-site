# Button

`Button` is the shared action component for the application. Use it for commands, form actions and link-styled calls to action when paired with `asChild`.

## Import

```tsx
import { Button } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual hierarchy |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button height, padding and text size |
| `iconOnly` | `boolean` | `false` | Makes the button square for icon-only actions |
| `asChild` | `boolean` | `false` | Render the styles on a child element, commonly `Link` or `a` |
| `className` | `string` | - | Optional extension for local layout tweaks |

It also accepts all native `button` props.

## Sizes

| Size | Use when |
| --- | --- |
| `sm` | Compact toolbars, dense forms and secondary actions |
| `md` | Default actions |
| `lg` | Primary calls to action in larger layouts |

## Variants

| Variant | Use when |
| --- | --- |
| `primary` | Main action on a screen or form |
| `secondary` | Supporting action with visible surface |
| `ghost` | Low-emphasis action, often near other content |

## Examples

```tsx
<Button>Salvar</Button>
<Button size="sm" variant="secondary">Cancelar</Button>
<Button size="lg" variant="ghost">Ver detalhes</Button>
```

Icon button:

```tsx
<Button iconOnly size="md" variant="ghost" aria-label="Abrir menu">
  <Menu />
</Button>
```

With a link:

```tsx
<Button asChild>
  <Link href="/cases">Ver cases</Link>
</Button>
```

## Accessibility

Use `Button` for actions. For navigation, use `asChild` with `Link` or `a`. Disabled buttons should use the native `disabled` prop.

Icon-only buttons must have an accessible name, usually with `aria-label`.
