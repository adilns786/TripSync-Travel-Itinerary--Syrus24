import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductsCollection() {
  const [data, setData] = useState([]); // Store the raw data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recommendation");
      const data = response.data;
      console.log("Fetched data:", data); // Log the raw data to the console
      setData(data); // Store the raw data in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-white flex justify-center items-center">
        <img
          className="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-white flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-white">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Best Spots for Your Next Trip
            </h2>
            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Explore the Extraordinary: Your Journey, Your Adventure, Your Way!
            </p>
          </header>

          <div className="mt-8">
            <p className="text-center text-gray-700">
              Data fetched successfully. Check the console for details.
            </p>
            {/* Optionally display raw data as JSON */}
            <pre className="mt-4 bg-gray-100 p-4 rounded-md">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductsCollection;