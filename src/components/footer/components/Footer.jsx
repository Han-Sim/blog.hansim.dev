import React, { forwardRef, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  FooterCopyRight,
  FooterDivider,
  FooterRootContainer,
  FooterTitle,
} from "./footer.styled";

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
    <FooterRootContainer ref={ref}>
      <FooterTitle>Blog by Han Sim</FooterTitle>
      <FooterCopyRight>
        <span>© 2022</span>
        <FooterDivider />
        <span>
          <a href="mailto:han.sim.dev@gmail.com">han.sim.dev@gmail.com</a>
        </span>
      </FooterCopyRight>
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
    </FooterRootContainer>
  );
});

export default Footer;
