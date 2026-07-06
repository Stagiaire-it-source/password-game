function checkPassword(value) {
    // value treatment
    const val = value.trim();
    const lowerVal = val.toLowerCase();
    
    // basic rules
    if(!val) return "Password is required";
    if(val.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(val)) return "Must include at least one uppercase letter";
    if (!/[0-9]/.test(val)) return "Must include at least one number";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(val)) return "Must include at least one special character";
    
    // number rules
    const numbers = val.match(/[0-9]/g)?.map(Number) || [];
    if (numbers.includes(6)) return "Numbers cannot include 6";
    if (numbers.includes(7)) return "Numbers cannot include 7";

    const sum = numbers.reduce((a, b) => a + b, 0);
    if (sum !== 13) return "Numbers must add up to 13";

    // days
    const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    if (!days.some(d => lowerVal.includes(d))) return "Must include a day of the week";

    // months
    const months = ["january","february","march","april","may","june",
    "july","august","september","october","november","december"];
    if (!months.some(m => lowerVal.includes(m))) return "Must include a month of the year";
    
    // planet requirement
    const planets = ["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune" ];
    if (!planets.some(p => lowerVal.includes(p))) return "Must include a planet of our solar system";

    // seasons
    const seasons = ["spring","summer","autumn","fall","winter"];
    if (!seasons.some(s => lowerVal.includes(s))) return "Must include a season of the year";

    // zodiac signs
    const zodiacSigns = ["aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
    if (!zodiacSigns.some(z => lowerVal.includes(z))) return "Must include a zodiac sign";
    
    // colors
    const colors = ["red","orange","yellow","green","blue","indigo","violet"];
    if (!colors.some(c => lowerVal.includes(c))) return "Must include a color of the rainbow";

    // animal requirement
    if(!lowerVal.includes("cat"))
    return "Must include the domesticated feline species which is a small, typically furry, carnivorous mammal that is often kept as a pet or for pest control purposes, and is known for its agility, playfulness, and ability to form social bonds with humans and other animals.";
    
    // cardinal directions
    const cardinalDirections = ["north","south","east","west"];
    if (!cardinalDirections.some(d => lowerVal.includes(d))) return "Must include a cardinal direction";

    // HTTP methods
    const httpMethods = ["get","post","put","delete","patch","head","options","trace","connect"];
    if (!httpMethods.some(m => lowerVal.includes(m))) return "Must include an HTTP method";

    // musical notes
    const musicalNotes = ["do","re","mi","fa","sol","la","ti"];
    if (!musicalNotes.some(n => lowerVal.includes(n))) return "Must include a musical note";

    // apple
    if (!lowerVal.includes("apple"))
    return "Must include the precise lexical identifier of the universally recognizable pomological specimen, typically exhibiting a red or green chromatic range and classified within the species Malus domestica, which, according to culturally propagated and scientifically unverified anecdotal accounts, is said to have descended upon the cranial region of a historically eminent English-born natural philosopher, mathematician, astronomer, and alchemist of the 17th–18th century scientific milieu, namely an individual of notable scholarly repute within the early Royal Society tradition, whose contributions to classical mechanics and the mathematical description of universal gravitation have been extensively documented, thereby purportedly contributing to his subsequent theoretical articulation of gravitational force."

  return "";
}

function confirmPassword(value, password) {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    if (value === password) return "Password confirmed";
  return "";
}
export { checkPassword, confirmPassword }; 