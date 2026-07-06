import { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="password-wrapper">
      <input type={showPassword ? "text" : "password"} placeholder="Password" value={value} onChange={onChange}/>
      <button type="button" className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );

};
export default PasswordInput;