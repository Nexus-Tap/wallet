import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function ScannerPage() {
  const navigate = useNavigate();
  const [qrValue, setQrValue] = useState("");

  return (
    <div className="flex flex-col gap-4 justify-center items-center px-8">
      <h3 className="text-white text-lg mt-10 mb-6">Scan to Pay</h3>

      <div className="max-w-full">
        <Scanner
          onScan={(result) => {
            setQrValue(result[0].rawValue);
            navigate("/send", { state: { data: { toAddress: qrValue } } });
          }}
        />
      </div>

      <div className="my-4 text-white break-all">{qrValue}</div>

      <button
        onClick={() => {
          navigate("/send", { state: { qrData: qrValue } });
        }}
        className="w-full mt-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold"
      >
        Continue
      </button>
    </div>
  );
}
