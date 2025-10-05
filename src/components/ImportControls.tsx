import type { ImportControlsProps } from "../types/ui/components";
import ContractSelect from "./ContractSelect";


export default function ImportControls({
  contract,
  setContract,
  contracts,
  handleFileUpload,
}: ImportControlsProps) {
  const isContractSelected = Boolean(contract);

  const buttonBase =
    "rounded-full font-medium cursor-pointer transition flex items-center justify-center";
  const buttonEnabled = "bg-blue-500 text-white hover:bg-blue-600";
  const buttonDisabled = "bg-gray-300 text-gray-600 cursor-not-allowed";

  return (
    <>
      {/* 💻 Desktop */}
      <div className="absolute top-4 left-12 bg-white shadow-lg rounded-full items-center gap-2 px-4 py-2 z-[9999] md:flex hidden">
        <ContractSelect
          value={contract}
          onChange={setContract}
          contracts={contracts}
          className="px-2 py-1 border rounded-md text-sm"
          placeholder="-- Ville --"
        />
        <label
          className={`${buttonBase} px-3 py-1 text-sm ${
            isContractSelected ? buttonEnabled : buttonDisabled
          }`}
        >
          Importer CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={!isContractSelected}
            className="hidden"
          />
        </label>
      </div>

      {/* 📱 Mobile */}
      <div className="absolute top-2 right-4 bg-white shadow rounded-lg flex items-center gap-1 px-2 py-1 z-[9999] md:hidden">
        <ContractSelect
          value={contract}
          onChange={setContract}
          contracts={contracts}
          className="flex-1 px-1 py-0.5 border rounded text-[10px]"
          placeholder="Ville"
        />

        <label
          className={`${buttonBase} px-2 py-0.5 text-[10px] ${
            isContractSelected ? buttonEnabled : buttonDisabled
          }`}
        >
          CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={!isContractSelected}
            className="hidden"
          />
        </label>
      </div>
    </>
  );
}
