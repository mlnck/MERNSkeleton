/**
* Renders the footer to be used on each page
 */

import React, { PropTypes } from 'react';
import StyledFooter from './StyledFooter';

function Footer(props)
{
  return (
    <footer>
      &copy; {props.author}
    </footer>
  );
}

Footer.defaultProps = {
  year: '2017',
};

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  year: PropTypes.string
};

export default Footer;
