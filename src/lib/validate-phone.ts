export const isValidIranianPhone = (phone: string): boolean => {
 return /^(09\d{9}|00989\d{9}|\+989\d{9})$/.test(phone);
};
