import React from "react"
import facebook from "../images/facebook.png"
import instagram from "../images/instagram.png"
import linkedin from "../images/linkedin.png"
import github from "../images/github.png"

const Footer = () => (
  <div className="site-footer container">
    <div className="footer-social-links">
      <p className="text-center">
        Copyright © 2019 — Han Sim. All Rights Reserved.{" "}
        <a href="mailto:han.sim.dev@gmail.com">han.sim.dev@gmail.com</a>
      </p>
      <ul className="social-links-list">
        <li>
          <a
            href="https://www.facebook.com/simhaneul"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <img src={facebook} width="32px" alt="facebook" />
          </a>
        </li>
        <li>
          <a
            href="http://instagram.com/hansim.han"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <img src={instagram} width="32px" alt="instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/han-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <img src={linkedin} width="32px" alt="linkedin" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/han-sim"
            target="_blank"
            rel="noopener noreferrer"
            className="github"
          >
            <img src={github} width="32px" alt="github" />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
