function checkPassword(value) {
    // value treatment
    const val = value.trim();
    const lowerVal = val.toLowerCase();
    
    // basic rules
    if(!val) return "Password is required";
    if(val.length < 8) return "Password must be at least 8 characters";

    // uppercase rules
    if (!/[A-Z]/.test(val)) return "Must include an uppercase letter";
    if ((val.match(/[A-Z]/g) || []).length < 2) return "Must include 2 uppercase letters";
    if ((val.match(/[A-Z]/g) || []).length < 3) return "Must include 3 uppercase letters";

    if (!/[0-9]/.test(val)) return "Must include at least 1 number";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(val)) return "Must include at least 1 special character";
    
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

    // animal requirement
    if(!lowerVal.includes("cat"))
    return "Must include the domesticated feline species which is a small, typically furry, carnivorous mammal that is often kept as a pet or for pest control purposes, and is known for its agility, playfulness, and ability to form social bonds with humans and other animals.";

    // apple
    if (!lowerVal.includes("apple"))
    return "Must include the precise lexical identifier of the universally recognizable pomological specimen, typically exhibiting a red or green chromatic range and classified within the species Malus domestica, which, according to culturally propagated and scientifically unverified anecdotal accounts, is said to have descended upon the cranial region of a historically eminent English-born natural philosopher, mathematician, astronomer, and alchemist of the 17th–18th century scientific milieu, namely an individual of notable scholarly repute within the early Royal Society tradition, whose contributions to classical mechanics and the mathematical description of universal gravitation have been extensively documented, thereby purportedly contributing to his subsequent theoretical articulation of gravitational force."

  return "";
}
export default checkPassword