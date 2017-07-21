import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import Helmet from 'react-helmet';
import ListItemTitle from '../ListItemTitle';
import messages from '../messages';
import FeaturePage from '../index';

describe('<FeaturePage />', () =>
{
  it('should render its heading', () =>
  {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    )).toBe(true);
  });

  it('Should have title', () =>
  {
    const renderedComponent = shallow(
      <FeaturePage />
    );

    expect(renderedComponent.contains(
      <Helmet
        title="Feature Page"
        meta={[
          { name: 'description', content: 'Feature page of React.js Boilerplate application' }
        ]}
      />
    )).toBe(true);
  });

  it('Should have a <ListItemTitle>', () =>
  {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(
      <ListItemTitle>
        <FormattedMessage {...messages.scaffoldingHeader} />
      </ListItemTitle>
    )).toBe(true);
  });

  it('Should not update', () =>
  {
    const props = {};
    const nextProps = {};
    const nextState = {};
    const comp = shallow(<FeaturePage {...props} />);
    const shouldUpdate = comp.instance().shouldComponentUpdate(nextProps, nextState);
    expect(shouldUpdate).toBe(false);
  });
});
