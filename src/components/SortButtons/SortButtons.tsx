import { Link } from "react-router-dom";
import styles from './SortButtons.module.scss'
import { SortButtonsProps } from "components/EmployeeList/EmployeeListTypes";

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
  
export default SortButtons