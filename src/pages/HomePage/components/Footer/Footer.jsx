import React from "react";
import "./Footer.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const teamMembers = [
    { name: "Jiwon Ha", role: "PO", github: "https://github.com/Gigijiwonha" },
    {
      name: "Kijin Lee ",
      role: "DEV",
      github: "https://github.com/ken-do-it ",
    },
    { name: "Minseo Kim", role: "DEV", github: "https://github.com/gemma-Kim" },
    {
      name: "Sehyeon Jun",
      role: "DEV",
      github: "https://github.com/JunSehyeon",
    },
    {
      name: "SeungWon Ock",
      role: "SM",
      github: "https://github.com/SeungwonOck",
    },
  ];

  const branchOffices = [
    { location: "Australia Office", phone: "+61 0468 937 7**" },
    { location: "Germany Office", phone: "+49 157 740288**" },
    { location: "UK Office", phone: "+44 07 4445727**" },
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
                <a className="github-addresss" href={member.github}>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
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
            <a
              href="https://www.instagram.com/spotify/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Instagram_logo.png/1200px-Instagram_logo.png"
                alt="Instagram"
                className="social-icon"
              />
            </a>
            <a
              href="https://www.youtube.com/@Spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9c/YouTube_logo.png"
                alt="YouTube"
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
