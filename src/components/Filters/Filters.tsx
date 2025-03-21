import { FiltersProps } from "components/EmployeeList/EmployeeListTypes";
import styles from './Filters.module.scss'

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
  export default Filters