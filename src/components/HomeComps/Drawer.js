import React from "react";
import { Link } from "react-router-dom";


const Sidebar = props => {
   

    return (
        <>
    
            <nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
              <ul>
            <li>
                <Link to="/">Active</Link>
            </li>
            <li>
                <Link to="/">Link</Link>
            </li>
            <li>
                <Link to="/">Link</Link>
            </li>
            </ul>
            </nav>
          
        </>
        );
  };
  export default Sidebar