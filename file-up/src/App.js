import React, { useState } from 'react';
import AuthLogin from './components/AuthLogin';
import FileUploader from './components/FileUploader';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>File Upload & Preview with MongoDB Auth</h1>
      {!user ? (
        <AuthLogin setUser={setUser} />
      ) : (
        <div>
          <h3>Welcome, {user}</h3>
          <FileUploader />
        </div>
      )}
    </div>
  );
};

export default App;
