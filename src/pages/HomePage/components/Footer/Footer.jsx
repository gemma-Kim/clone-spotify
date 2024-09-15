import React from 'react';
import './Footer.style.css'; 

function Footer() {
  const teamMembers = [
    { name: '김민서', role: 'IDK' },
    { name: '옥승원', role: 'SM' },
    { name: '하지원', role: 'PO' },
    { name: '전세현', role: 'IDK' },
    { name: '이기진', role: 'IDK' },
  ];

  const branchOffices = [
    { location: 'UK Office', phone: '+44 20 1234 5678' },
    { location: 'Germany Office', phone: '+49 30 9876 5432' },
    { location: 'Australia Office', phone: '+61 2 8765 4321' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="team-info">
          <p>Team Member</p>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index} className="team-member">
                <span className="member-name">{member.name}</span>
                <span className="member-role">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="branch-info">
          <p>Branch Offices</p>
          <ul>
          {branchOffices.map((office, index) => (
          <li key={index} className="branch-office">
            <span className="office-location">{office.location}</span>
            <span className="office-phone">{office.phone}</span>
          </li>
        ))}
          </ul>
        </div>
        <div className="footer-note">
          <p>© 2024 GLOBAL MUSIC. All rights reserved.</p>
          <div className="social-media-icons">
            <a href="https://www.instagram.com/spotify/" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Instagram_logo.png/1200px-Instagram_logo.png" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.youtube.com/@Spotify" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/YouTube_logo.png" alt="YouTube" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
