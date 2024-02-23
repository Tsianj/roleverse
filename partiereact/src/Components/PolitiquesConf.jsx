import React, { useEffect } from 'react';

const PrivacyPolicyLink = () => {
  useEffect(() => {
    const loader = () => {
      const script = document.createElement('script');
      const tag = document.getElementsByTagName('script')[0];
      script.src = 'https://cdn.iubenda.com/iubenda.js';
      tag.parentNode.insertBefore(script, tag);
    };

    if (window.addEventListener) {
      window.addEventListener('load', loader, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', loader);
    } else {
      window.onload = loader;
    }
  }, []);

  return (
    <>
      <a
        href="https://www.iubenda.com/privacy-policy/50048113"
        className="a_link"
        title="Politique de confidentialité"
      >
        Politique de confidentialité
      </a>
    </>
  );
};

export default PrivacyPolicyLink;
