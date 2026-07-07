const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const months = ["january","february","march","april","may","june",
  "july","august","september","october","november","december"];
const planets = ["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];
const seasons = ["spring","summer","autumn","fall","winter"];
const zodiacSigns = ["aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
const colors = ["red","orange","yellow","green","blue","indigo","violet"];
const cardinalDirections = ["north","south","east","west"];
const httpMethods = ["get","post","put","delete","patch","head","options","trace","connect"];
const musicalNotes = ["do","re","mi","fa","sol","la","ti"];
const vowels = ["a","e","i","o","u"];
const franceNeighbors = ["belgium","luxembourg","germany","switzerland","italy","monaco","spain","andorra"];
const gitCommands = ["add","commit","push","pull","clone","checkout","branch","merge",
  "rebase","status","log","fetch","init","diff","stash","reset","revert","tag"];

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const rules = [
  { id: "required", label: "Password is required", test: (v) => v.length > 0 },
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number", label: "At least one number", test: (v) => /[0-9]/.test(v) },
  { id: "special", label: "At least one special character", test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
  {
    id: "sum57",
    label: "Numbers must add up to 57",
    test: (v) => {
      const nums = v.match(/[0-9]/g)?.map(Number) || [];
      return nums.reduce((a, b) => a + b, 0) === 57;
    },
  },
  { id: "day", label: "Must include a day of the week", test: (v) => days.some((d) => v.toLowerCase().includes(d)) },
  { id: "month", label: "Must include a month of the year", test: (v) => months.some((m) => v.toLowerCase().includes(m)) },
  { id: "planet", label: "Must include a planet of our solar system", test: (v) => planets.some((p) => v.toLowerCase().includes(p)) },
  { id: "season", label: "Must include a season of the year", test: (v) => seasons.some((s) => v.toLowerCase().includes(s)) },
  { id: "zodiac", label: "Must include a zodiac sign", test: (v) => zodiacSigns.some((z) => v.toLowerCase().includes(z)) },
  { id: "color", label: "Must include a color of the rainbow", test: (v) => colors.some((c) => v.toLowerCase().includes(c)) },
  {
    id: "cat",
    label: "Must include the domesticated feline species which is a small, typically furry, carnivorous mammal that is often kept as a pet or for pest control purposes, and is known for its agility, playfulness, and ability to form social bonds with humans and other animals.",
    test: (v) => v.toLowerCase().includes("cat"),
  },
  { id: "cardinal", label: "Must include a cardinal direction", test: (v) => cardinalDirections.some((d) => v.toLowerCase().includes(d)) },
  { id: "http", label: "Must include an HTTP method", test: (v) => httpMethods.some((m) => v.toLowerCase().includes(m)) },
  { id: "note", label: "Must include a musical note", test: (v) => musicalNotes.some((n) => v.toLowerCase().includes(n)) },
  {
    id: "apple",
    label: "Must include the precise lexical identifier of the universally recognizable pomological specimen, typically exhibiting a red or green chromatic range and classified within the species Malus domestica, which, according to culturally propagated and scientifically unverified anecdotal accounts, is said to have descended upon the cranial region of a historically eminent English-born natural philosopher, mathematician, astronomer, and alchemist of the 17th–18th century scientific milieu, namely an individual of notable scholarly repute within the early Royal Society tradition, whose contributions to classical mechanics and the mathematical description of universal gravitation have been extensively documented, thereby purportedly contributing to his subsequent theoretical articulation of gravitational force.",
    test: (v) => v.toLowerCase().includes("apple"),
  },
  {
    id: "ascendingDigits",
    label: "Digits must be in ascending order",
    test: (v) => {
      const nums = v.match(/[0-9]/g)?.map(Number) || [];
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) return false;
      }
      return true;
    },
  },
  {
    id: "primeLength",
    label: "Password length must be a prime number",
    test: (v) => isPrime(v.length),
  },
  {
    id: "specialSurroundedByVowels",
    label: "Every special character must be surrounded by vowels",
    test: (v) => {
      const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
      for (let i = 0; i < v.length; i++) {
        if (specialRegex.test(v[i])) {
          const prev = v[i - 1];
          const next = v[i + 1];
          if (!prev || !next) return false;
          if (!vowels.includes(prev.toLowerCase()) || !vowels.includes(next.toLowerCase())) {
            return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: "franceNeighbor",
    label: "Must contain a country bordering France",
    test: (v) => franceNeighbors.some((c) => v.toLowerCase().includes(c)),
  },
  {
    id: "gitCommand",
    label: "Must contain a Git command",
    test: (v) => gitCommands.some((c) => v.toLowerCase().includes(c)),
  },
];

// Returns every rule up through (and including) the first one still failing.
// Rules beyond that point stay hidden — this is what gives the "reveal as you go" feel.
function checkPassword(value) {
  const val = value.trim();

  const visibleRules = [];

  for (const rule of rules) {
    const valid = rule.test(val);

    visibleRules.push({
      id: rule.id,
      label: rule.label,
      valid,
    });

    if (!valid) break;
  }

  const failed = visibleRules.filter((rule) => !rule.valid).reverse();
  const passed = visibleRules.filter((rule) => rule.valid);

  return [...failed, ...passed];
}

export default checkPassword;
