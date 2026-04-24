# Button

`Button` is the shared action component for the application. Use it for commands and form actions.

## Import

```tsx
import { Button } from "@/src/shared/ui";
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | `"primary"` | Visual hierarchy |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button height, padding and text size |
| `iconOnly` | `boolean` | `false` | Makes the button square for icon-only actions |
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
| `outline` | Supporting action with a visible border |
| `ghost` | Low-emphasis action, often near other content |
| `destructive` | Destructive or irreversible actions |

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

Link styled as a button:

```tsx
<Link className={buttonVariants({ variant: "primary", size: "md" })} href="/cases">
  Ver cases
</Link>
```

## Accessibility

Use `Button` for actions. For navigation, use `Link` or `a` styled with `buttonVariants`. Disabled buttons should use the native `disabled` prop.

Icon-only buttons must have an accessible name, usually with `aria-label`.
