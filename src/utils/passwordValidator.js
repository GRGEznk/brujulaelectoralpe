export const validatePassword = (password) => {
  if (!password) return { isValid: false, error: "La contraseña es requerida" };

  const upperCount = (password.match(/[A-Z]/g) || []).length;
  const lowerCount = (password.match(/[a-z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;

  if (upperCount < 1) {
    return { isValid: false, error: "Mínimo 1 letra mayúscula" };
  }
  if (lowerCount < 1) {
    return { isValid: false, error: "Mínimo 1 letra minúscula" };
  }
  if (numberCount < 1) {
    return { isValid: false, error: "Mínimo 1 dígito numérico" };
  }
  if (password.length < 6) {
    return { isValid: false, error: "Mínimo 6 caracteres" };
  }
  return { isValid: true, error: null };
};

export const getPasswordStrength = (password) => {
  if (!password) return 0;
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Escala de 0 a 5
  return Math.min(strength, 5);
};

export const PASSWORD_REQUIREMENTS_TEXT =
  "Min. 6 car., una mayúscula, una minúscula y un número.";
