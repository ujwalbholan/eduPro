export const slug = (slug: string): string => {
  const slugD = slug.replaceAll(' ', '_');
  return slugD;
};
