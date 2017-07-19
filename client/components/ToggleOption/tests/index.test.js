import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';

import ToggleOption from '../index';

describe('<ToggleOption />', () =>
{
  it('should render default language messages', () =>
{
    const defaultEnMessage = 'someContent';
    const message = defineMessages({
      enMessage: {
        id: 'boilerplate.containers.LocaleToggle.en',
        defaultMessage: defaultEnMessage,
      },
    });
    const renderedComponent = shallow(
      <IntlProvider locale="en">
        <ToggleOption value="en" message={message.enMessage} />
      </IntlProvider>
    );
    expect(renderedComponent.contains(<ToggleOption value="en" message={message.enMessage} />)).toBe(true);
  });

  it('should display `Deutch` when from `DEUTCH` is needed', () =>
{
    const defaultEnMessage = 'Deutch';
    const message = defineMessages({
      enMessage: {
        id: 'boilerplate.containers.LocaleToggle.de',
        defaultMessage: defaultEnMessage,
      },
    });

    const renderedComponent = mount(
      <IntlProvider locale="de">
        <ToggleOption value="de" message={message.enMessage} />
      </IntlProvider>
    );
    expect(renderedComponent.text()).toBe('Deutch');
  });
});
