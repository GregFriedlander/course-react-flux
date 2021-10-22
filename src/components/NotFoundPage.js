import React from 'react';
import {Link} from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h2>Page Not Foud</h2>
      <p>
        <Link to='/'>Back to Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
