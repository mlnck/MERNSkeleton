/**
 * Component Description from cli
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledCloset from './StyledCloset';

export default function Closet(props)
{
  const inState = (props.inState) ? 'prop in state' : 'prop is static';
  return (
    <StyledCloset>
      {props.title}!<br />
      &nbsp;&nbsp;&nbsp; - <i>{props.content}</i><br />
      <sub>{inState}</sub>
    </StyledCloset>
  );
}

Closet.defaultProps = {
  prop: 'Default closet props here',
  content: PropTypes.string,
  inState: false
};

Closet.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  inState: PropTypes.bool
};
