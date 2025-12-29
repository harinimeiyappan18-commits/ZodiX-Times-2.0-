// utils/originality.js

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function similarity(a, b) {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));

  const intersection = [...setA].filter(x => setB.has(x));
  const union = new Set([...setA, ...setB]);

  return intersection.length / union.size;
}

export function calculateOriginality(newText, existingTexts) {
  if (existingTexts.length === 0) return 100;

  let maxSimilarity = 0;

  for (const text of existingTexts) {
    const sim = similarity(newText, text);
    if (sim > maxSimilarity) maxSimilarity = sim;
  }

  return Math.max(0, Math.round((1 - maxSimilarity) * 100));
}
