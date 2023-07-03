export interface EmployeesQuarterly {
    department: string;
    job: string;
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
}

export interface DepartmentsOverhiring {
    id: number;
    department: string;
    hired: number;
}