import { useState, useEffect } from 'react';
    import { format } from 'date-fns';
    import clsx from 'clsx';

    function App() {
      const [time, setTime] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [isDarkMode, setIsDarkMode] = useState(false);

      useEffect(() => {
        const timer = setTimeout(() => {
          setTime(new Date());
          setIsLoading(false);
        }, 1500); // Simulate loading delay

        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        const interval = setInterval(() => {
          if (!isLoading) {
            setTime(new Date());
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [isLoading]);

      const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };

      if (isLoading) {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        );
      }

      return (
        <div className={`min-h-screen transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Clock App</h1>
              <div className="text-2xl transition-opacity duration-500 ease-in-out opacity-100">
                {format(time, 'HH:mm')}
                <span className="animate-pulse text-blue-500 ml-2">
                  {format(time, 'ss')}
                </span>
              </div>

              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={toggleDarkMode}
              >
                Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default App;
