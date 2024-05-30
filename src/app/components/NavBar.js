import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBook, faCogs, faBars } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = ({ isWhite }) => {
  const [showMenu, setShowMenu] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className={`text-3xl font-bold rounded-font ${isWhite ? "text-white" : "text-black"} md:ml-20`}>
          <a href="/">Mindfulness Timer</a>
        </div>

        <div className="relative">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${isWhite ? "text-white" : "text-black"} focus:outline-none`}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>
          </div>
          

          {/* Popup Menu */}
          {showMenu ? (
            <div ref={popupRef} className={`absolute top-12 right-0 mt-2 ${!isWhite ? "bg-white" : "bg-black"} p-4 rounded-lg shadow-lg bg-opacity-80`}>
              <ul className="text-center">
                <li className="py-2">
                  <a href="/mindfulness-timer/stats" className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                    Statistics
                  </a>
                </li>
                <li className="py-2">
                  <a href="/resources" className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    Resources
                  </a>
                </li>
                <li className="py-2">
                  <a href="/settings" className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faCogs} className="mr-2" />
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          ):(
          <div className={`md:flex ${showMenu ? "block" : "hidden"} md:items-center space-x-6 mt-4 md:mt-0`}>
            <a href="/mindfulness-timer/stats" className={!isWhite ? "text-white hover:text-gray-300" : "text-black hover:text-gray-800"}>
              <FontAwesomeIcon icon={faChartLine} size="2x" className={isWhite ? "text-white m-5" : "text-black m-5"} />
            </a>
            <a href="/resources" className={!isWhite ? "text-white hover:text-gray-300" : "text-black hover:text-gray-800"}>
              <FontAwesomeIcon icon={faBook} size="2x" className={isWhite ? "text-white m-5" : "text-black m-5"} />
            </a>
            <a href="/settings" className={!isWhite ? "text-white hover:text-gray-300" : "text-black hover:text-gray-800"}>
              <FontAwesomeIcon icon={faCogs} size="2x" className={isWhite ? "text-white m-5" : "text-black m-5"} />
            </a>
          </div>)}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
