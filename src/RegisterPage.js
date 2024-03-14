import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './styles/Login.css';

function SignupPage({ auth, signInWithGoogle, signInWithFacebook }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        navigate('/home'); // Redirect to home after successful sign-up
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '33%', padding: '0 20px' }}>
        <h2 className='signup'>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: '10px' }}>
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input type="password" id="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className='loginbutton'>Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="lineWithText">
          <span>Or</span>
        </div>
        <div className="buttonContainer">
        <button onClick={handleGoogleSignIn} className='googlebutton'><img src="Google.png" alt="Google Logo" style={{ marginRight: '10px' }}/>Google</button>
        <button onClick={handleFacebookSignIn} className='googlebutton'><img src="Facebook.png" alt="Google Logo" style={{ marginRight: '10px' }}/>Facebook</button>
        </div>
        <div className="signup-link">
          <span>Already have an account? </span>
          <Link to="/">Login</Link>
        </div>
      </div>
      <div style={{ width: '66%' }}>
        <img src='DrawKit Vector Illustration Mental Health (3).png' alt="Signup Illustration" style={{ width: '100%', height: '99.5vh', objectFit: 'cover' }} />
      </div>
    </div>
  );
}

export default SignupPage;
