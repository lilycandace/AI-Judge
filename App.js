
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [agreement, setAgreement] = useState('');
  const [evidence, setEvidence] = useState('');
  const [decision, setDecision] = useState('');

  const handleResolve = async () => {
    try {
      const response = await axios.post('http://localhost:5000/resolve', {
        agreement,
        evidence
      });
      setDecision(response.data.decision);
    } catch (error) {
      setDecision('Error: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 AI-Judge: Dispute Resolver</h1>
      
      <div style={styles.inputGroup}>
        <textarea
          placeholder="Paste agreement text"
          value={agreement}
          onChange={(e) => setAgreement(e.target.value)}
          style={styles.textarea}
        />
        <textarea
          placeholder="Paste evidence (timestamps, links, etc.)"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          style={styles.textarea}
        />
      </div>

      <button onClick={handleResolve} style={styles.button}>Resolve</button>

      {decision && <p style={styles.result}><strong>AI Decision:</strong> {decision}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  textarea: {
    width: '300px',
    height: '120px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  },
  result: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333'
  }
};

export default App;

