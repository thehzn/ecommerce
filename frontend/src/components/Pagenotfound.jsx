import React from 'react'
import { Link } from 'react-router-dom';

function Pagenotfound() {
  return (
   <div style={{ textAlign: "center", padding: "60px" }}>
      {/* <h1>404</h1> */}
      <h2>Page Not Found</h2>
      <p>The product or page you are looking for does not exist.</p>

      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  )
}

export default Pagenotfound
