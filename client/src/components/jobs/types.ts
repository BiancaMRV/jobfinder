export interface Filter {
  salaryRange: [number, number];
  experienceLevels: string[];
  jobTypes: string[];
}

export type FilterName = keyof Filter;

export interface ExperienceLevel {
  value: string;
  label: string;
}

export interface JobType {
  value: string;
  label: string;
}
export interface salaryRange {
  value: string;
  label: string;
}

export interface FilterComponentProps {
  filters: Filter;
  onFilterChange: (filterName: FilterName, value: any) => void;
  clearAll?: () => void;
}
