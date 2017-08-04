/**
* Renders the footer to be used on each page
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledFooter from './StyledFooter';

function Footer(props)
{
  return (
    <StyledFooter>
      &copy; {props.author} - {props.year}
    </StyledFooter>
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
