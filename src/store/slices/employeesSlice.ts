import { createSlice } from "@reduxjs/toolkit";
import { dataBase } from "../dataBase";

const initialState = {
  employees: dataBase,
  sortBy: "name",
  filters: {
    role: "all",
    isArchive: false,
  },
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setRoleFilter: (state, action) => {
      state.filters.role = action.payload;
    },
    setArchiveFilter: (state, action) => {
      state.filters.isArchive = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  setSortBy,
  setRoleFilter,
  setArchiveFilter,
} = employeesSlice.actions;

export default employeesSlice.reducer;
