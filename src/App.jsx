import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const { results } = response.data;
      const { name, email } = results[0];
      const fullName = `${name.first} ${name.last}`;
      const userData = { fullName, email };
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
      setError("Error fetching user data. Please try again later.");
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchUserData();
  };

  return (
    <div className="outer_layout">
      <div>
        <h1>User Information</h1>
        {loading ? (
          <div className="loader">Fetching data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="user-info">
            <p>
              <strong>Name:</strong> {userData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}
        <button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
};

export default App;
