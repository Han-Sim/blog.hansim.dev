import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import style from "./footer.module.scss";

const Footer = () => {
  const handleEmailOnClick = useCallback(() => {
    window.location.href = "mailto:han.sim.dev@gmail.com";
  }, []);

  const handleLinkedInOnClick = useCallback(() => {
    window.location.href = "https://www.linkedin.com/in/han-dev/";
  }, []);

  const handleGitHubOnClick = useCallback(() => {
    window.location.href = "https://www.github.com/han-sim/";
  }, []);

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div>Copyright © 2020</div>
        <div className={style.divider}></div>
        <a href="mailto:han.sim.dev@gmail.com">han.sim.dev@gmail.com</a>
      </div>
      <div className={style.right}>
        <IconButton onClick={handleEmailOnClick}>
          <EmailIcon />
        </IconButton>
        <IconButton onClick={handleLinkedInOnClick}>
          <LinkedInIcon />
        </IconButton>
        <IconButton onClick={handleGitHubOnClick}>
          <GitHubIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
