const handleSubmit = (e) => {
  e.preventDefault(); // stops the page from reloading (default HTML form behavior)
  setAttemptedSubmit(true);
  setSuccess(false);
 
  const hasError = usernameError || passwordError;
 
  if (hasError) return;

};
export default handleSubmit;