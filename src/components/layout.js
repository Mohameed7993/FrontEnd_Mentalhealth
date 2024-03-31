import React, { useEffect } from 'react';
import '../styles/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';


const NavLink = ({ href, children }) => (
  <a href={href} onClick={Hiddenmenunav} className="font-extrabold dark:text-gray-900 hover:underline no-underline text-xl p-2 block">
    {children}
  </a>
 
);

const Hiddenmenunav=()=>{
  const menedropdown = document.getElementById('menu');
  if (menedropdown) {
    menedropdown.classList.toggle('hidden');
  }
}
const DropdownItem = ({ href, children, onClick }) => (
  <li>
    <a href={href} onClick={onClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      {children}
    </a>
  </li>
);

const Layouts = () => {


  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use the useTheme hook here
  useEffect(() => {
    // This useEffect is to handle the theme toggling
    const handleThemeToggle = () => {
      toggleTheme(); // Use toggleTheme from your theme context
      const icon = document.querySelector("#btnThemeMode i");
      icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
     
    };
 
    const btnThemeMode = document.getElementById("btnThemeMode");
    btnThemeMode?.addEventListener("click", handleThemeToggle);

    return () => {
      btnThemeMode?.removeEventListener("click", handleThemeToggle);
    };
  }, [toggleTheme,theme]);




   useEffect(() => {
    const handleUserIconClick = () => {
      if (!user) {
        navigate('/login');
      } else {
        const dropdown = document.getElementById('iconuserdropdown');
        if (dropdown) {
          dropdown.classList.toggle('hidden');
        }
      }
    };
    const userIcon = document.getElementById("usericon");
    userIcon?.addEventListener("click", handleUserIconClick);
    return () => {
      userIcon?.removeEventListener("click", handleUserIconClick);
    };
  }, [user, navigate]);

  return (
    <>
      <div className="max-w mx-auto flex flex-col gap-2 bg-white dark:bg-gray-900 border">
        <div className="p-4 dark:bg-white bg-gray-900 flex justify-between">
          <button id="menuBtn" className="md:hidden block bg-white border border-gray-900 rounded py-1 px-3">
            <i className="fas fa-bars"></i>
          </button>

          <div id="menu" className="absolute left-2 top-[15%]  hidden   text-white dark:bg-white bg-gray-900 md:flex md:flex-row md:relative md:top-auto md:w-auto">
            <div className='flex text-xl p-2 font-extrabold dark:text-gray-900 space-x-2' id='default'>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/signup">Sign-up</NavLink>
              <NavLink href="/login">Log-In</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
            <div className=' hidden flex text-xl p-2 font-extrabold dark:text-gray-900 space-x-2' id='adminActions'>
              <NavLink href="/master">Dashboard</NavLink>
              <NavLink href="/master_User">Users</NavLink>
              <NavLink href="/support_groups">links</NavLink>
              <NavLink href="/selfhelparticles">Articles</NavLink>
              <NavLink href="/mangmenttols">Video Exercise</NavLink>
            </div>
            <div className='hidden flex text-xl p-2 font-extrabold dark:text-gray-900 space-x-2' id='userActions'>
              <NavLink href="/customers">Dashboard</NavLink>
              <NavLink href="/selfhelparticles">Self-help</NavLink>
              <NavLink href="/mangmenttols">Stress-MangTools</NavLink>
              <NavLink href="/prohelpcontact">Pro-helpContact</NavLink>
              <NavLink href="/support_groups">Support-groups</NavLink>
              <NavLink href="/vipgroups">Vip-groups</NavLink>
            </div>


          </div>

          <div className="space-x-2">
            <button id="usericon" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-full">
              <i className="fas fa-user"></i>
            </button>
            <div id='iconuserdropdown' className="hidden bg-white z-10 divide-y rounded-lg shadow w-44 absolute top-[80px] right-5">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-600" aria-labelledby="usericon">
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem href="/login" onClick={logout}>Log out</DropdownItem>
              </ul>
            </div>
            <button id="btnThemeMode" className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-full">
              <i  className ={ theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Layouts;
