import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, ERROR: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(ERROR, errorInfo) {
    this.setState({
      ERROR: ERROR,
      errorInfo: errorInfo
    });
    
    console.error('ErrorBoundary caught an error:', ERROR, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <div className="error-content">
            <h2>SYSTEM ERROR // CRITICAL FAILURE</h2>
            <p>The job hunter system encountered an unexpected error.</p>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Technical Details</summary>
              {this.state.ERROR && this.state.ERROR.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="error-restart-btn"
            >
              RESTART SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
