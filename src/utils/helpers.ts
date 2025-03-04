export const getRole = (role: string) => {
    switch (role) {
      case 'waiter':
        return 'Официант';
      case 'cook':
        return 'Повар';
      case 'driver':
        return 'Водитель';
      default:
        return 'Работник';
    }
  };

export const formatDate = (inputDate: string) => {
if(inputDate.includes('-')){
  return inputDate
}
  const [day, month, year] = inputDate.split('.');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


export const formatDateForNewDate = (dateString: string): Date => {
  if (dateString.includes('.')) {
    const [day, month, year] = dateString.split('.');
    return new Date(`${month}/${day}/${year}`); 
  }
  return new Date(dateString);
};