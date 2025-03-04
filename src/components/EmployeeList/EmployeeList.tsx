import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setSortBy,
  setRoleFilter,
  setArchiveFilter,
} from "../../store/slices/employeesSlice";
import { formatDateForNewDate, getRole } from "../../utils/helpers";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./EmployeeList.module.scss";
import {
  EmployeeCardsProps,
  FiltersProps,
  SortButtonsProps,
} from "./EmployeeListTypes";

// Компонент для кнопок сортировки
const SortButtons = ({ onSortByName, onSortByBirthday }: SortButtonsProps) => (
  <div className={styles.buttonContainer}>
    <div className={styles.sortButtonsContainer}>
      <button className={styles.sortButton} onClick={onSortByName}>
        Сортировать по имени
      </button>
      <button
        className={`${styles.sortButton} ${styles.secondary}`}
        onClick={onSortByBirthday}
      >
        Сортировать по дате рождения
      </button>
    </div>
    <Link to="/add-employee">
      <button className={styles.addButton}>
        <span className={styles.icon}>+</span> Добавить нового сотрудника
      </button>
    </Link>
  </div>
);

// Компонент для фильтров
const Filters = ({
  role,
  isArchive,
  onRoleChange,
  onArchiveChange,
}: FiltersProps) => (
  <div className={styles.mainFilterContainer}>
    <div className={styles.filterPostContainer}>
      <label className={styles.filterLabel}>
        Должность:
        <select
          className={styles.filterSelect}
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </label>
    </div>
    <div>
      <label className={styles.inputCheckbox}>
        <input
          type="checkbox"
          checked={isArchive}
          onChange={(e) => onArchiveChange(e.target.checked)}
          className={styles.inputCheckbox}
        />
        Показать только в архиве
      </label>
    </div>
  </div>
);

// Компонент для отображения списка сотрудников
const EmployeeCards = ({ employees }: EmployeeCardsProps) => (
  <div className={styles.employeeList}>
    {employees.map((employee) => (
      <div key={employee.id} className={styles.employeeCard}>
        <Link to={`/edit/${employee.id}`} className={styles.employeeName}>
          {employee.name}
        </Link>
        <p className={styles.employeeRole}>{getRole(employee.role)}</p>
        <p className={styles.employeePhone}>{employee.phone}</p>
        <p
          className={`${styles.employeeStatus} ${
            employee.isArchive ? styles.archived : styles.active
          }`}
        >
          {employee.isArchive ? "В архиве" : "Активный"}
        </p>
      </div>
    ))}
  </div>
);

const EmployeesList = () => {
  const dispatch = useDispatch();

  const employees = useAppSelector((state) => state.employees.employees);
  const sortBy = useAppSelector((state) => state.employees.sortBy);
  const { role, isArchive } = useAppSelector(
    (state) => state.employees.filters
  );

  // Логика сортировки
  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "birthday") {
        const dateA = formatDateForNewDate(a.birthday).getTime();
        const dateB = formatDateForNewDate(b.birthday).getTime();
        return dateA - dateB;
      }
      return 0;
    });
  }, [employees, sortBy]);
  // Логика фильтрации
  const filteredEmployees = useMemo(() => {
    return sortedEmployees.filter((employee) => {
      const roleMatch = role === "all" || employee.role === role;
      const archiveMatch = !isArchive || employee.isArchive === isArchive;
      return roleMatch && archiveMatch;
    });
  }, [sortedEmployees, role, isArchive]);

  // Обработчики для сортировки
  const handleSortByName = () => dispatch(setSortBy("name"));
  const handleSortByBirthday = () => dispatch(setSortBy("birthday"));

  // Обработчики для фильтров
  const handleRoleChange = (value: string) => dispatch(setRoleFilter(value));
  const handleArchiveChange = (checked: boolean) =>
    dispatch(setArchiveFilter(checked));

  return (
    <div className={styles.mainContainer}>
      <SortButtons
        onSortByName={handleSortByName}
        onSortByBirthday={handleSortByBirthday}
      />
      <Filters
        role={role}
        isArchive={isArchive}
        onRoleChange={handleRoleChange}
        onArchiveChange={handleArchiveChange}
      />
      <EmployeeCards employees={filteredEmployees} />
    </div>
  );
};

export default EmployeesList;
