import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBook, faCogs } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
      <div className="ml-20 text-white text-3xl font-bold rounded-font">Mindfulness Timer</div>

        <div className="flex mr-10 items-center space-x-6">
          <a href="/stats" className="text-white hover:text-gray-300">
            <FontAwesomeIcon icon={faChartLine} size="2x" className="text-white m-5" />
          </a>
          <a href="/resources" className="text-white hover:text-gray-300">
            <FontAwesomeIcon icon={faBook} size="2x" className="text-white m-5" />
          </a>
          <a href="/settings" className="text-white hover:text-gray-300">
            <FontAwesomeIcon icon={faCogs} size="2x" className="text-white m-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
