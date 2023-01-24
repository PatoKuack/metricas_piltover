import React from 'react';
import Button from '../components/Button.jsx'

const ShowRiotTXT = () => {

  return (
    <React.Fragment>
      <p>e243aad5-5909-4640-a8c1-af37c4f282b8</p>
      <a href="https://drive.google.com/file/d/1Gk80gU5a33QvHuLDkFmEIOJP8v6s2hOK/view?usp=share_link">
        <Button 
          content = {"Descargar riot.txt"}
          type = {"button"}
        />
      </a>
    </React.Fragment>
  );
}

export default ShowRiotTXT;