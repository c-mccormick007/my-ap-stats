

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="container max-w-screen-2xl flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center">
            <div className="pr-4 rounded-full">
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a href="https://www.linkedin.com/in/cmccormick--us/" class="fa fa-linkedin" title="LinkedIn"></a>
              <a href="https://github.com/c-mccormick007" class="fa fa-github" title="Github"></a>
              <a href="mailto:chris.mccormick1295@gmail.com" class="fa fa-paper-plane" title="Email me"></a>
            </nav>
          </div>
        </div>
      </header>
      
    );
  };
  
  export default Header;