export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const addThousandSeparator = (number) => {
    if (number == null || isNaN(number)) return "0";
    const [integerPart, decimalPart] = number.toString().split('.');

    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
  
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
    const formattedNumber = otherNumbers
      ? formattedOtherNumbers + ',' + lastThree
      : lastThree;
  
    return decimalPart ? `${formattedNumber}.${decimalPart}` : formattedNumber;

    
}