import React, { forwardRef, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import style from "./footer.module.scss";

const Footer = forwardRef((_p, ref) => {
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
    <div className={style.container} ref={ref}>
      <div className={style.titleContianer}>Blog by Han Sim</div>
      <div className={style.copyRightContainer}>
        <div>© 2020</div>
        <div className={style.divider}></div>
        <div>
          <a href="mailto:han.sim.dev@gmail.com">han.sim.dev@gmail.com</a>
        </div>
      </div>
      <div>
        <IconButton onClick={handleEmailOnClick} fontSize="small">
          <EmailIcon />
        </IconButton>
        <IconButton onClick={handleLinkedInOnClick} fontSize="small">
          <LinkedInIcon />
        </IconButton>
        <IconButton onClick={handleGitHubOnClick} fontSize="small">
          <GitHubIcon />
        </IconButton>
      </div>
    </div>
  );
});

export default Footer;
