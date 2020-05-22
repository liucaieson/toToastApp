import React from 'react';
import ErrorFallBackComponent from '../ErrorFallBackComponent'

export default function withErrorHandler (Component) {
  class WithErrorHandler extends React.Component {
    constructor () {
      super();
      // Construct the initial state
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null
      }
    }

    componentDidCatch (error, info) {
      // Update state if error happens
      this.setState({ hasError: true, error, errorInfo: info });
      // Report errors
      console.log(info, error)
    }

    render () {
      // if state contains error we render fallback component
      if (this.state.hasError) {
        const { error, errorInfo } = this.state;
        return (
          <ErrorFallBackComponent
            {...this.props}
            error={error}
            errorInfo={errorInfo}
          />
        )
      }

      return <Component {...this.props} />
    }
  }

  WithErrorHandler.displayName = `withErrorHandler(${Component.displayName || Component.name || 'Component'})`
  return WithErrorHandler
}
