import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) =>
  (WrappedComponent) => {
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextTypes = {
        store: PropTypes.object.isRequired,
      };

      static displayName = `withReducer(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;

      // eslint-disable-next-line react/no-deprecated
      componentWillMount() {
        const { injectReducer } = this.injectors;

        injectReducer(key, reducer);
      }

      // eslint-disable-next-line react/destructuring-assignment
      injectors = getInjectors(this.context.store);

      render() {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
