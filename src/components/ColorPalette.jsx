import { useState } from "react";

export default function ColorPalette({ colorPalettes }) {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleCopy = async (hex, name) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(name);
      setTimeout(() => setCopiedColor(null), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {Object.entries(colorPalettes).map(([paletteName, colors]) => (
        <div key={paletteName} className="p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {paletteName}
          </h2>
          <div className="space-y-4">
            {Object.entries(colors).map(([shade, hex]) => {
              const colorName = `${paletteName}-${shade}`;
              return (
                <div
                  key={colorName}
                  className="flex items-center space-x-4 p-2 hover:bg-cloud-100/20 rounded-lg"
                >
                  <button
                    onClick={() => handleCopy(hex, colorName)}
                    className={`w-20 h-20 rounded-lg shadow-md hover:scale-105 transition-transform ${
                      copiedColor === colorName ? "ring-2 ring-green-500" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                  <div>
                    <p className="font-medium">{colorName}</p>
                    <p className="text-cloud-100/80 text-sm uppercase">{hex}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
