import React from "react"
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => (
  <div className="site-footer">
    <div className="footer-social-links">
      <p className="text-center">
        Copyright © 2019 — Han Sim. All Rights Reserved.{" "}
        <span className="footer-link">
          <a
            id="portfolio-page"
            href="https://hansim.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://hansim.dev
          </a>
          {" | "}
          <a id="email" href="mailto:han.sim.dev@gmail.com">
            han.sim.dev@gmail.com
          </a>
        </span>
      </p>
      <ul className="social-links-list">
        <li>
          <a
            href="https://www.facebook.com/simhaneul"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a
            href="http://instagram.com/hansim.han"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/han-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedIn"
          >
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/han-sim"
            target="_blank"
            rel="noopener noreferrer"
            className="github"
          >
            <GitHubIcon />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
