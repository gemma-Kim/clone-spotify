import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.style.css'; // Import the CSS stylesheet

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="not-found-container">
       <div className="turntable logo">
        {/* LP 턴테이블을 나타내는 요소 */}
        </div>
      <h1 className="not-found-title">Oops! Page Not Found</h1>
      <p className="not-found-description">Sorry, we couldn't find the page you're looking for.</p>
      <button onClick={handleGoHome} className="home-button">Go to Home</button>
    </div>
  );
};

export default NotFoundPage;
