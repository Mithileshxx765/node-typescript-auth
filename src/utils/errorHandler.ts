interface Errors {
  email: string;
  password: string;
}

// Handler error function

const handleErrors = (email: string, password: string): Errors | null => {
  let errors = {
    email: "",
    password: "",
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else if (!email.match(emailRegex)) {
    errors.email = "Please enter a valid email";
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (!password.match(passRegex)) {
    errors.password =
      "Password must contain Minimum eight characters, at least one letter and one number";
  }

  if (errors.email === "" && errors.password === "") {
    return null;
  } else {
    return errors;
  }
};

export default handleErrors;
