import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0000aa',
            color: '#ffffff',
            fontFamily: "'Courier New', monospace",
            padding: '24px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#aaaaaa',
              color: '#0000aa',
              padding: '2px 12px',
              fontWeight: 'bold',
              marginBottom: '16px',
            }}
          >
            GarfieldOS System Error
          </div>
          <p style={{ margin: '8px 0', fontSize: '13px' }}>
            An exception occurred in a virtual subsystem:
          </p>
          <div
            style={{
              backgroundColor: '#000088',
              border: '1px solid #5555ff',
              padding: '8px 12px',
              maxWidth: '90%',
              fontSize: '11px',
              whiteSpace: 'pre-wrap',
              margin: '12px 0',
              textAlign: 'left',
            }}
          >
            {this.state.error?.message || 'Unknown runtime error'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '16px',
              padding: '6px 16px',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: 'inherit',
            }}
          >
            Press any key or Click to Restart OS
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
