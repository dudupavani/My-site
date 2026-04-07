const DASHES_REGEX = /-+/g;
const NON_ALNUM_REGEX = /[^a-z0-9]+/g;

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(NON_ALNUM_REGEX, "-")
    .replace(DASHES_REGEX, "-")
    .replace(/^-|-$/g, "");
}

