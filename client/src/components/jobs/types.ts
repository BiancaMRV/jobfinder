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
  type: string;
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

export interface Job {
  id: string;
  title: string;
  description: string;
  logo: SVGStringList;
  location?: string;
  experiencelevelid: string;
  jobtypeid: string;
  salaryrange: string;
}

export interface JobCard {
  logo: string;
  title: string;

  tags: string[]; // Um array de tags
  description: string;
}
