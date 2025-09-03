export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateName = (name: string): ValidationResult => {
  const trimmedName = name.trim();
  const nameRegex = /^.{3,}$/;
  const isValid = nameRegex.test(trimmedName);
  
  return {
    isValid,
    errors: isValid ? [] : ['Name must be at least 3 characters'],
  };
};

export const validatePassword = (password: string): ValidationResult => {
  
  if (password.length < 8) {
    return {
      isValid: false,
      errors: ['Password must be at least 8 characters long'],
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errors: ['Password must contain at least one uppercase letter'],
    };
  }
  
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      errors: ['Password must contain at least one lowercase letter'],
    };
  }
  
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      errors: ['Password must contain at least one number'],
    };
  }
  
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return {
      isValid: false,
      errors: ['Password must contain at least one special character'],
    };
  }
  
  return {
    isValid: true,
    errors: [],
  };
};

export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(trimmedEmail);
  
  return {
    isValid,
    errors: isValid ? [] : ['Email validation failed'],
  };
};

export const validateSignUpForm = (data: {
  name: string;
  email: string;
  password: string;
}): ValidationResult => {
  const nameValidation = validateName(data.name);
  const emailValidation = validateEmail(data.email);
  const passwordValidation = validatePassword(data.password);
  
  const allErrors = [
    ...nameValidation.errors,
    ...emailValidation.errors,
    ...passwordValidation.errors,
  ];
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};
