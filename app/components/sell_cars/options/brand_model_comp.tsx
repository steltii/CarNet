"use client";
import React, { useEffect, useState } from "react";

interface Maker {
    MakeID: number;
    MakeName: string;
}

interface Model {
  ModelID: number;
  ModelName: string;
}

const BrandModel: React.FC = () => {
    const [makers, setMakers] = useState<Maker[]>([]);
    const [models, setModels] = useState<Model[]>([]);

    const [selectedMaker, setSelectedMaker] = useState<string>("");
    
  // Fetch makers
  useEffect(() => {
    const fetchMakers = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/options/makers");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data: Maker[] = await response.json();
        setMakers(data);
      } catch (error) {
        console.error("Failed to fetch makers:", error);
      }
    };

    fetchMakers();
  }, []);

  // Fetch models
  useEffect(() => {
    if (!selectedMaker) return;

    const fetchModels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/options/models/${selectedMaker}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data: Model[] = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, [selectedMaker]);

  return(
    <div>
        <div className="form-control">
            <select
                className="select select-bordered"
                value={selectedMaker}
                onChange={(e) => setSelectedMaker(e.target.value)}
                >
                <option value="">Select Brand</option>
                {makers.map((maker) => (
                    <option key={maker.MakeID} value={maker.MakeID}>
                    {maker.MakeName}
                </option>
                ))}
            </select>
        </div>

        <div className="form-control">
            <select className="select select-bordered" disabled={!selectedMaker}>
                <option value="">Select Model</option>
                {models.map((model) => (
                <option key={model.ModelID} value={model.ModelID}>
                    {model.ModelName}
                </option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default BrandModel;