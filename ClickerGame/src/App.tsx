import React, { useState, useEffect } from 'react';
import myImage from './assets/me.jpg'; // Local image

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [multiplierCost, setMultiplierCost] = useState<number>(10); // Initial multiplier cost
  const [autoClickers, setAutoClickers] = useState<number>(0); // Number of auto-clickers
  const [autoClickerCost, setAutoClickerCost] = useState<number>(20); // Initial auto-clicker cost
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Sidebar open/close state
  const [isBopping, setIsBopping] = useState<boolean>(false); // Animation trigger state

  // Auto-clicker effect (fires once every second for each auto-clicker)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + autoClickers * multiplier);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, [autoClickers, multiplier]);

  const handleClick = () => {
    setCount(prevCount => prevCount + multiplier);
    
    // Trigger the "bop" effect
    setIsBopping(true);
    
    // Remove the "bop" effect after animation completes (e.g., 300ms)
    setTimeout(() => setIsBopping(false), 300);
  };

  // Upgrade the multiplier and increase its cost
  const upgradeMultiplier = () => {
    if (count >= multiplierCost) {
      setCount(prevCount => prevCount - multiplierCost); // Deduct the cost
      setMultiplier(prevMultiplier => prevMultiplier + 1); // Increase the multiplier
      setMultiplierCost(prevCost => prevCost * 2); // Double the cost after each upgrade
    }
  };

  // Buy an auto-clicker and increase its cost
  const buyAutoClicker = () => {
    if (count >= autoClickerCost) {
      setCount(prevCount => prevCount - autoClickerCost); // Deduct the cost
      setAutoClickers(prevAutoClickers => prevAutoClickers + 1); // Add one auto-clicker
      setAutoClickerCost(prevCost => prevCost * 2); // Double the cost after each purchase
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
  };

  return (
    <div style={{ 
      ...styles.container, 
      backgroundColor: isSidebarOpen ? 'lavender' : 'lightblue' // Change background color
    }}>
      <div style={styles.clickArea}>
        <button onClick={handleClick} style={styles.imageButton}>
          <img
            src={myImage} // Local image
            alt="Clicker"
            style={{
              ...styles.image,
              ...(isBopping ? styles.bop : {}), // Apply "bop" effect if triggered
            }}
          />
        </button>
        <p style={styles.score}>Score: {count}</p>
      </div>

      {/* Sidebar with sliding animation */}
      <div style={{ 
        ...styles.sidebar, 
        transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)', // Slide in/out
        backgroundColor: 'white' // White sidebar
      }}>
        {isSidebarOpen && ( /* Content only visible when sidebar is open */
          <div style={styles.sidebarContent}>
            <h2>Upgrades</h2>

            {/* Multiplier upgrade */}
            <button 
              onClick={upgradeMultiplier} 
              style={styles.upgradeButton} 
              disabled={count < multiplierCost}
            >
              Upgrade Multiplier (Cost: {multiplierCost})
            </button>
            <p>Current Multiplier: +{multiplier}</p>

            {/* Auto-clicker purchase */}
            <button 
              onClick={buyAutoClicker} 
              style={styles.upgradeButton} 
              disabled={count < autoClickerCost}
            >
              Buy Auto Clicker (Cost: {autoClickerCost})
            </button>
            <p>Auto Clickers: {autoClickers}</p>
          </div>
        )}
      </div>

      {/* Arrow button right next to the sidebar */}
      <button 
        onClick={toggleSidebar} 
        style={{ 
          ...styles.arrowButton, 
          right: isSidebarOpen ? '250px' : '0px' // Arrow moves with sidebar
        }}>
        {isSidebarOpen ? '◀' : '▶'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex' as const,
    height: '100vh',
    position: 'relative' as const,
    transition: 'background-color 0.3s ease', // Smooth background color transition
  },
  clickArea: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  sidebar: {
    position: 'absolute' as const,
    right: '0px',
    top: '0px',
    height: '100%',
    width: '250px',
    transition: 'transform 0.3s ease', // Smooth sidebar sliding animation
    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)', // Small shadow for depth effect
    zIndex: 10,
  },
  sidebarContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
  },
  imageButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    transition: 'transform 0.3s ease', // Smooth scaling transition for bop
  },
  bop: {
    transform: 'scale(1.2)', // Scale the image to 120% size during bop
  },
  score: {
    marginTop: '20px',
    fontSize: '24px',
  },
  upgradeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    marginTop: '20px',
    backgroundColor: 'lightblue',
    cursor: 'pointer',
  },
  arrowButton: {
    position: 'absolute' as const, // Fixed relative to container
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'lightgray',
    border: '1px solid #ccc',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1, // Ensures button is on top
    transition: 'right 0.3s ease', // Smooth arrow transition 
  },  
};

export default App;
