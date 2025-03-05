import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function ExploreHero() {
  const [searchcity, setsearchcity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [display, setdisplay] = useState({ aqi: info.data.aqi, image: aqi_image3, text: "none", station: info.data.station, city: info.data.city, state: info.data.state });

  // useEffect(() => {
  //   renderleft();

  // }, []);
  const [formData, setFormData] = useState({
    destination: '',
  });
  const handleFormSubmit2 = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlechange = (event) => {
    const value = event.target.value;
    setsearchcity(event.target.value);

    const stationNames = Data.map(item => item.station);

    // Filtering station names based on the search term
    const filteredSuggestions = stationNames.filter(station =>
      station.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);

  }

  const searchRef = useRef();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSuggestions([]); // Close suggestions when clicking outside the search box
    }
  };
  const handlesearch = (search) => {
    let val2 = Data.find(item => item.station === search);
    info.data = val2;
    renderleft();
    trigger();
  }



  const [destination, setDestination] = useState('');
  // const history = useHistory();
const navigate=useNavigate()
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Redirect to the LocationPage with the destination as a query parameter
   navigate(`/location?destination=${destination}`);
  };




  return (
    <div
      className="bg-black w-full h-96 opacity-80"
      style={{
        backgroundImage: 'url("https://t3.ftcdn.net/jpg/00/93/76/02/360_F_93760221_KJMb5fQHdgai8y4mUF6TzLJWRJQQAO2K.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full flex items-center justify-center pt-64">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none flex items-center">
          {/* <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
            />
          </svg> */}
        </div>

        <form onSubmit={handleFormSubmit} className="flex">
      {/* <input
        type="text"
        name="destination"
        value={formData.destination}
        onChange={handleInputChange}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-96 ps-10 p-2.5"
        placeholder="Search by destination"
        required
      /> */}
      <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-96 ps-10 p-2.5"
          placeholder="Search by destination"
          required
        />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full ml-2">
        Enter
      </button>
    </form>
      </div>
    </div>
  );
}

export default ExploreHero;
