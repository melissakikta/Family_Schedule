import { useRouteError } from 'react-router-dom';
import { Result, Button} from "antd";


interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--tertiary)', color: 'var(--primary)', fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
      <Result
        status="500"
        title="Oops! Something Went Wrong"
        subTitle={error.statusText || error.message || "Sorry, an unexpected error has occurred."}
        extra={
          <Button type="primary" className="custom-menu-item" onClick={() => window.location.href = '/'}>
            Return to Start Page
          </Button>
        }
      />
    </div>
  );
}
