/**
*
* LocaleToggle
*
*/

import React from 'react';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props)
{
  let content = (<option>--</option>);

  // If we have items, render them
  if(props.values)
{
    content = props.values.map((value) => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <Select value={props.value} onChange={props.onToggle}>
      {content}
    </Select>
  );
}

Toggle.defaultProps = {
  values: [],
  value: '',
  messages: '',
};

Toggle.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  values: React.PropTypes.array,
  value: React.PropTypes.string,
  messages: React.PropTypes.object,
};

export default Toggle;
