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
 
const rules = [
  { id: "required", label: "Password is required", test: (v) => v.length > 0 },
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number", label: "At least one number", test: (v) => /[0-9]/.test(v) },
  { id: "special", label: "At least one special character", test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
  {
    id: "sum13",
    label: "Numbers must add up to 57",
    test: (v) => {
      const nums = v.match(/[0-9]/g)?.map(Number) || [];
      return nums.reduce((a, b) => a + b, 0) === 57;
    },
  },
  { id: "day", label: "Must include a day of the week", test: (v) => days.some((d) => v.includes(d)) },
  { id: "month", label: "Must include a month of the year", test: (v) => months.some((m) => v.includes(m)) },
  { id: "planet", label: "Must include a planet of our solar system", test: (v) => planets.some((p) => v.includes(p)) },
  { id: "season", label: "Must include a season of the year", test: (v) => seasons.some((s) => v.includes(s)) },
  { id: "zodiac", label: "Must include a zodiac sign", test: (v) => zodiacSigns.some((z) => v.includes(z)) },
  { id: "color", label: "Must include a color of the rainbow", test: (v) => colors.some((c) => v.includes(c)) },
  {
    id: "cat",
    label: "Must include the domesticated feline species which is a small, typically furry, carnivorous mammal that is often kept as a pet or for pest control purposes, and is known for its agility, playfulness, and ability to form social bonds with humans and other animals.",
    test: (v) => v.includes("cat"),
  },
  { id: "cardinal", label: "Must include a cardinal direction", test: (v) => cardinalDirections.some((d) => v.includes(d)) },
  { id: "http", label: "Must include an HTTP method", test: (v) => httpMethods.some((m) => v.includes(m)) },
  { id: "note", label: "Must include a musical note", test: (v) => musicalNotes.some((n) => v.includes(n)) },
  {
    id: "apple",
    label: "Must include the precise lexical identifier of the universally recognizable pomological specimen, typically exhibiting a red or green chromatic range and classified within the species Malus domestica, which, according to culturally propagated and scientifically unverified anecdotal accounts, is said to have descended upon the cranial region of a historically eminent English-born natural philosopher, mathematician, astronomer, and alchemist of the 17th–18th century scientific milieu, namely an individual of notable scholarly repute within the early Royal Society tradition, whose contributions to classical mechanics and the mathematical description of universal gravitation have been extensively documented, thereby purportedly contributing to his subsequent theoretical articulation of gravitational force.",
    test: (v) => v.includes("apple"),
  },
];
 
// Returns every rule up through (and including) the first one still failing.
// Rules beyond that point stay hidden — this is what gives the "reveal as you go" feel.
function checkPassword(value) {
  const val = value.trim();
  const results = [];
 
  for (const rule of rules) {
    const valid = rule.test(val);
    results.push({ id: rule.id, label: rule.label, valid });
    if (!valid) break;
  }
 
  return results;
}
 
export default checkPassword;
