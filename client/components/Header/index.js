/**
 * Renders the header to be used on each page
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledHeader from './StyledHeader';

function Header(props)
{
  return (
    <StyledHeader>
      <h1>{props.navTitle}</h1>
    </StyledHeader>
  );
}

Header.defaultProps = {
  navTitle: 'Sample Project',
};

// We require the use of src and alt, only enforced by react in dev mode
Header.propTypes = {
  navTitle: PropTypes.string,
};

export default Header;
