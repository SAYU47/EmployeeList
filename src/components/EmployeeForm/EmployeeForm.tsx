import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee } from "../../store/slices/employeesSlice";
import { formatDate } from "../../utils/helpers";
import { PatternFormat } from "react-number-format";
import styles from "./EmployeeForm.module.scss";
import { useAppSelector } from "../../hooks/hooks";

const roleOptions = [
  { value: "cook", label: "Повар" },
  { value: "waiter", label: "Официант" },
  { value: "driver", label: "Водитель" },
];

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const employees = useAppSelector((state) => state.employees.employees);
  const employee = id ? employees.find((emp) => emp.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    role: "cook",
    isArchive: false,
  });

  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (id && employee) {
      setFormData({
        name: employee.name,
        phone: employee.phone,
        birthday: employee.birthday,
        role: employee.role,
        isArchive: employee.isArchive,
      });
    }
  }, [id, employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handlePhoneChange = (values: { formattedValue: string }) => {
    const { formattedValue } = values;
    setFormData({
      ...formData,
      phone: formattedValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 11) {
      setPhoneError("Номер телефона должен содержать 11 цифр");
      return;
    }

    setPhoneError("");

    const newEmployee = {
      ...formData,
      id: id ? parseInt(id) : Date.now(),
    };

    if (id) {
      dispatch(updateEmployee(newEmployee));
    } else {
      dispatch(addEmployee(newEmployee));
    }
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {id ? "Редактировать сотрудника" : "Добавить нового сотрудника"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Поле для имени */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
        </div>

        {/* Поле для телефона */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Телефон:
            <PatternFormat
              format="+7 (###) ###-####"
              mask="_"
              name="phone"
              value={formData.phone}
              onValueChange={handlePhoneChange}
              className={styles.formInput}
              placeholder="+7 (999) 999-9999"
              required
            />
          </label>
          {phoneError && <span className={styles.errorMessage}>{phoneError}</span>}
        </div>

        {/* Поле для даты рождения */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Дата рождения:
            <input
              type="date"
              name="birthday"
              value={formatDate(formData.birthday)}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
        </div>

        {/* Поле для выбора должности */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Должность:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.formSelect}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Чекбокс для архива */}
        <div className={styles.formGroup}>
          <label className={styles.formCheckbox}>
            <input
              type="checkbox"
              name="isArchive"
              checked={formData.isArchive}
              onChange={handleChange}
              className={styles.formCheckbox}
            />
            В архиве
          </label>
        </div>

        {/* Кнопка отправки формы */}
        <button type="submit" className={styles.formButton}>
          {id ? "Сохранить" : "Добавить сотрудника"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;