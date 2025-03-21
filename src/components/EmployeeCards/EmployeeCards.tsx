import { EmployeeCardsProps } from "components/EmployeeList/EmployeeListTypes";
import { Link } from "react-router-dom";
import styles from './EmployeeCards.module.scss'
import { getRole } from "../../utils/helpers";

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

  export default EmployeeCards