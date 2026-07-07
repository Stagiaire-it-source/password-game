
const rules = [
  { id: "required", label: "Username is required", test: (v) => v.length > 0 },
  { id: "length", label: "At least 5 characters", test: (v) => v.length >= 5 },
  { id: "uppercase", label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number", label: "At least one number", test: (v) => /[0-9]/.test(v) },
  { id: "special", label: "At least one special character", test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
];
 
// Returns every rule up through (and including) the first one still failing.
// Rules beyond that point stay hidden, same reveal-as-you-go behavior as checkPassword.
function checkUsername(value) {
  const val = value.trim();
  const results = [];
 
  for (const rule of rules) {
    const valid = rule.test(val);
    results.push({ id: rule.id, label: rule.label, valid });
    if (!valid) break;
  }
 
  return results;
}
 
export default checkUsername;