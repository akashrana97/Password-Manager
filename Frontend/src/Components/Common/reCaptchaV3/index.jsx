import React, { useCallback, useEffect, useState } from "react";

const Index = ({ sitekey }) => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  useEffect(() => {
    if (window.grecaptcha) {
      setIsRecaptchaReady(true);
    } else {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        setIsRecaptchaReady(true);
      };

      return () => {
        // Remove the reCAPTCHA script when the component unmounts
        document.head.removeChild(script);
        // const element =
        //   document.body.querySelector(".grecaptcha-badge").parentElement;
        // element.style.display = "none";
      };
    }
  }, [sitekey]);
};

export default Index;
