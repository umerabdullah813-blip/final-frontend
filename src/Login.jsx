import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [showSuccess, setShowSuccess] = useState(false);
=======
>>>>>>> 285f6e0dff0d9dfbbc860f46933e8482e938d393

  const handleLogin = () => {
    // 🔴 Fake login (later replace with API)
    if (email === "admin@gmail.com" && password === "123456") {
      setError("");
<<<<<<< HEAD
      setShowSuccess(true);
      // Wait for 1.5 seconds to let the user see the professional popup
      setTimeout(() => {
        onLogin();
      }, 1500);
=======
      onLogin();
>>>>>>> 285f6e0dff0d9dfbbc860f46933e8482e938d393
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
<<<<<<< HEAD
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Enter your credentials to access the admin panel</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(30, 144, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(30, 144, 255, 0.2)";
          }}
        >
          Sign In
        </button>

        <div style={styles.footer}>
          <p style={styles.footerText}>Secure Admin Access</p>
        </div>
      </div>

      {showSuccess && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.popupTitle}>Login Successful!</h2>
            <p style={styles.popupMessage}>Welcome back, Admin. Redirecting to dashboard...</p>
            <div style={styles.loader}>
              <div style={styles.loaderBar}></div>
            </div>
          </div>
        </div>
      )}
=======
      <div style={styles.card}>
        <h2>Courier Admin Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
>>>>>>> 285f6e0dff0d9dfbbc860f46933e8482e938d393
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
<<<<<<< HEAD
    width: "100vw",
=======
>>>>>>> 285f6e0dff0d9dfbbc860f46933e8482e938d393
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('image2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
<<<<<<< HEAD
    position: "relative",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)",
    zIndex: 1,
  },

  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    padding: "40px 50px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "420px",
    zIndex: 2,
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },

  header: {
    marginBottom: "30px",
    textAlign: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: "32px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",
    margin: 0,
    lineHeight: "1.5",
  },

  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },

  label: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
    display: "block",
  },

  input: {
    padding: "14px 18px",
    fontSize: "16px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },

  button: {
    padding: "16px",
    width: "100%",
    background: "linear-gradient(90deg, #1e90ff 0%, #00bfff 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(30, 144, 255, 0.2)",
  },

  errorContainer: {
    background: "rgba(255, 82, 82, 0.1)",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "1px solid rgba(255, 82, 82, 0.3)",
  },

  errorText: {
    color: "#ff5252",
    fontSize: "13px",
    fontWeight: "500",
  },

  footer: {
    marginTop: "30px",
    textAlign: "center",
  },

  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    animation: "fadeIn 0.3s ease-out",
  },

  popup: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    transform: "scale(1)",
    animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  successIcon: {
    width: "70px",
    height: "70px",
    background: "#4ade80",
    color: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "36px",
    margin: "0 auto 20px",
    boxShadow: "0 10px 20px rgba(74, 222, 128, 0.4)",
  },

  popupTitle: {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 10px 0",
  },

  popupMessage: {
    color: "#6b7280",
    fontSize: "15px",
    margin: "0 0 25px 0",
    lineHeight: "1.5",
  },

  loader: {
    width: "100%",
    height: "4px",
    background: "#f3f4f6",
    borderRadius: "2px",
    overflow: "hidden",
  },

  loaderBar: {
    width: "100%",
    height: "100%",
    background: "#4ade80",
    animation: "loading 1.5s linear forwards",
  },
};

// Keyframes added via a style tag for the animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes popIn {
    from { transform: scale(0.85); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes loading {
    from { width: 0%; }
    to { width: 100%; }
  }
`;
document.head.appendChild(styleSheet);
=======
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    padding: 10,
    margin: 8,
    width: 250,
  },

  button: {
    padding: 10,
    width: 250,
    background: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: 10,
  },

  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
};
>>>>>>> 285f6e0dff0d9dfbbc860f46933e8482e938d393
