export const format_date = (date: string) => {
  return new Date(date).toDateString();
};

export const format_phone = (phone: string) => {
  return phone
    ? phone
        .replace("+1", "")
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
    : `(610) 363-8020`;
};

export function concatClassNames(
  ...args: Array<string | boolean | null | undefined>
): string {
  return args.filter((item) => !!item).join(" ");
}
