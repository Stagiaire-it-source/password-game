function checkUsername(value) {
    const val = value.trim();
    if (!val) return "Username required";
    if (val.length < 5) return "Username must be at least 5 characters";
    if (!/[A-Z]/.test(val)) return "Username must contain at least 1 uppercase letter";
    if (!/[0-9]/.test(val)) return "Username must contain at least 1 number";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(val)) return "Username must contain at least 1 special character";

  return "";
    
}
export default checkUsername