import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import {
  setSortBy,
  setRoleFilter,
  setArchiveFilter,
} from "../../store/slices/employeesSlice";
import { formatDateForNewDate, getRole } from "../../utils/helpers";
import { useAppSelector } from "../../hooks/hooks";
import styles from "./EmployeeList.module.scss";
import EmployeeCards from "../EmployeeCards/EmployeeCards";
import Filters from '../Filters/Filters';
import SortButtons from "../SortButtons/SortButtons";


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
