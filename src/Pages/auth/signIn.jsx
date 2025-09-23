import { Sun, ArrowLeft, Brain, Mail ,Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./signIn.css";

function SignIn() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleSignIn = () => {
    // Add your sign-in logic here
    navigate("/dashboard");
  };

  const handleSignUp = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  return (
    <div className="signin-page-wrapper">
      {/* Top Bar */}
      <header className="sd-wrapper">
        <div className="sd-left" onClick={handleGoHome}>
          <ArrowLeft size={18} strokeWidth={2} color="white" />
          <span className="sd-sitemotto">Back To Home</span>
        </div>
        <div className="sd-right">
          <button className="sd-theme">
            <Sun size={18} />
          </button>
        </div>
      </header>

      {/* Main Sign-In Content */}
      <main className="signin-container">
        <div className="signin-header">
          <Brain size={40}/>
          <div className="signin-header-text">
            <h1>EduSync</h1>
            <p>AI-Powered Scheduling</p>
          </div>
        </div>

        <div className="signin-title">
          <h2>Welcome Back</h2>
          <p>Sign in to your EduSync account</p>
        </div>

        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-wrapper">
              <Mail size={16} className="email-icon" />
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <Lock size={16} className="password-icon" />
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
          </div>

          <button type="submit" className="signin-button" onClick={handleSignIn}>
            Sign In
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account? <span onClick={handleSignUp}>Sign up</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignIn;