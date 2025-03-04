export type Employee = {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
};

export interface SortButtonsProps {
  onSortByName: () => void;
  onSortByBirthday: () => void;
}
export interface FiltersProps {
  role: string;
  isArchive: boolean;
  onRoleChange: (value: string) => void;
  onArchiveChange: (checked: boolean) => void;
}
export interface EmployeeCardsProps {
  employees: Employee[];
}
