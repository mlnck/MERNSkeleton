/**
 * Component Description from cli
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import StyledCloset from './StyledCloset';

export default function Closet(props)
{
  let inState = (props.inState) ? '$' : 'XX';
  return (
    <StyledCloset>
      {props.title}!<br/>
      &nbsp;&nbsp;&nbsp; - <i>{props.content}</i><br/>
      <sub>{inState}</sub>
    </StyledCloset>
  );
}

Closet.defaultProps = {
  prop: 'Default closet props here',
};

Closet.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string
};
