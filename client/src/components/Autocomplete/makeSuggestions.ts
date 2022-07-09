export default function makeSuggestions(
  userInput: string,
  options: { name: string }[],
  limit?: number
): string[] {
  const textRef = userInput.toLowerCase();

  let arr = options
    .map((option) => option.name)
    .filter((option: string) => option.toLowerCase().includes(textRef));

  if (limit && arr.length > limit) {
    arr = arr.slice(0, limit);
  }

  return arr;
}
