import React, { useState } from "react";
import axios from "axios";

const API_KEY = "your_api_key";
const API_ENDPOINT = `https://api.openai.com/v1/engines/text-davinci/jobs`;

export default function Home() {
  const [businessNiche, setBusinessNiche] = useState("");
  const [companyNames, setCompanyNames] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      API_ENDPOINT,
      {
        prompt: `Generate company names for a ${businessNiche} business`,
        max_tokens: 1024,
        n: 5,
        stop: `"`,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    setCompanyNames(response.data.choices[0].text.split("\n"));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="block border border-gray-400 p-2 w-full"
          type="text"
          value={businessNiche}
          onChange={(e) => setBusinessNiche(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
          Generate Company Names
        </button>
      </form>
      <ul className="list-disc pl-5">
        {companyNames.map((companyName) => (
          <li key={companyName}>{companyName}</li>
        ))}
      </ul>
    </div>
  );
}
