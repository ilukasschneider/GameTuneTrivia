interface Link {
  title: string;
  link: string;
}

export const links: Link[] = [];

for (let i = 1; i <= 100; i++) {
  links.push({
    title: `Day${i}`,
    link: `https://example.com/day${i}`,
  });
}
