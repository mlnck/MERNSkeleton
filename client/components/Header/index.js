/**
 * Renders the header to be used on each page
 */

import React, { PropTypes } from 'react';
import StyledHeader from './StyledHeader';

function Header(props)
{
  return (
    <header>
      {props.navTitle}
    </header>
  );
}

Header.defaultProps = {
  navTitle: 'Skeleton Default',
};

// We require the use of src and alt, only enforced by react in dev mode
Header.propTypes = {
  navTitle: PropTypes.string,
};

export default Header;
