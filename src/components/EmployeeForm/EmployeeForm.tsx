import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee } from "../../store/slices/employeesSlice";
import { formatDate } from "../../utils/helpers";
import { PatternFormat } from "react-number-format";
import styles from "./EmployeeForm.module.scss";
import { useAppSelector } from "../../hooks/hooks";
import {
  ChangeNumberType,
  FormCheckboxProps,
  FormInputProps,
  FormPhoneInputProps,
  FormSelectProps,
} from "./EmployeeFormTypes";

const roleOptions = [
  { value: "cook", label: "Повар" },
  { value: "waiter", label: "Официант" },
  { value: "driver", label: "Водитель" },
];

// Компонент для текстовых полей и выбора даты
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
}: FormInputProps) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>
      {label}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.formInput}
        required={required}
      />
    </label>
  </div>
);

// Компонент для ввода телефона с маской
const FormPhoneInput = ({ value, onChange, error }: FormPhoneInputProps) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>
      Телефон:
      <PatternFormat
        format="+7 (###) ###-####"
        mask="_"
        name="phone"
        value={value}
        onValueChange={onChange}
        className={styles.formInput}
        placeholder="+7 (999) 999-9999"
        required
      />
    </label>
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
);

// Компонент для выбора должности
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
}: FormSelectProps) => (
  <div className={styles.formGroup}>
    <label className={styles.formLabel}>
      {label}:
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.formSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

// Компонент для чекбокса
const FormCheckbox = ({
  label,
  name,
  checked,
  onChange,
}: FormCheckboxProps) => (
  <div className={styles.formGroup}>
    <label className={styles.formCheckbox}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.formCheckbox}
      />
      {label}
    </label>
  </div>
);

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

  const handlePhoneChange = (values: ChangeNumberType) => {
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
        <FormInput
          label="Имя"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormPhoneInput
          value={formData.phone}
          onChange={handlePhoneChange}
          error={phoneError}
        />
        <FormInput
          label="Дата рождения"
          type="date"
          name="birthday"
          value={formatDate(formData.birthday)}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Должность"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roleOptions}
        />
        <FormCheckbox
          label="В архиве"
          name="isArchive"
          checked={formData.isArchive}
          onChange={handleChange}
        />

        <button type="submit" className={styles.formButton}>
          {id ? "Сохранить" : "Добавить сотрудника"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
