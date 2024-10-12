import { FaExclamationCircle } from 'react-icons/fa';

function ErrorPage({ title, children }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default ErrorPage;
