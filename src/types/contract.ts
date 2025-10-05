
export interface Contract {
  name: string;
  commercial_name: string;
  country_code: string;
  cities: string[];
}

export interface ContractSelectProps {
  value: string;
  onChange: (value: string) => void;
  contracts: Contract[];
  className?: string;
  placeholder?: string;
}