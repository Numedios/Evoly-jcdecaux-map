import type { FC } from "react";
import type { ContractSelectProps } from "../types/contract";

const ContractSelect: FC<ContractSelectProps> = ({
  value,
  onChange,
  contracts,
  className = "",
  placeholder = "-- Choisir une ville --",
}) => {
  const sortedContracts = [...contracts].sort((a, b) =>
    a.cities[0].localeCompare(b.cities[0], "fr")
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label="Sélection du contrat"
    >
      <option value="">{placeholder}</option>

      {sortedContracts.map((contract) => {
        const label = contract.cities.join(", ");
        const subtitle = contract.commercial_name
          ? ` (${contract.commercial_name})`
          : "";

        return (
          <option key={contract.name} value={contract.name}>
            {label}
            {subtitle}
          </option>
        );
      })}
    </select>
  );
};

export default ContractSelect;
