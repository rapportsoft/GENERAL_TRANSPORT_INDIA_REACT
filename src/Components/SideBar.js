// import React, { useState, useContext, useEffect } from 'react';
// import AuthContext from './AuthProvider';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
// import image from '../Images/RapportSoftlogo.png';
// import './Style.css';
// import ipaddress from './IpAddress';
// import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
// import { AiOutlineMenu } from 'react-icons/ai';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';

// export default function SideBar({ toggleSidebarWidth, width }) {


//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     userType,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);


//   console.log("*********User Type *********" + userType);


//   const [parentMenus, setParentMenus] = useState([]);
//   const [collapsed, setCollapsed] = useState(false);
//   const [toggled, setToggled] = useState(false);
//   const navigate = useNavigate();
//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const [menu, setMenu] = useState([]);
//   const [parent, setParent] = useState([]);
//   const reactPageName = 'Sidebar';
//   const [processId, setProcessId] = useState(null);
//   const [pprocessId, setPprocessId] = useState('');
//   const [pid, setPid] = useState([]);
//   const [pid2, setPid2] = useState('');
//   const [menudata, setMenudata] = useState([]);
//   const [urights, setUrights] = useState([]);

//   const [ToggleKey, SetToggleKey] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [parent1, setParent1] = useState([]);
//   const [allowedProcessIds1, setAllowedProcessIds1] = useState([]);
//   const [urights1, setUrights1] = useState([]);
//   const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(true);


//   const toggleChildMenu = () => {

//     if (collapsed) {
//       setIsAnyDropdownOpen(false);

//     }
//     setTimeout(() => {
//       setIsAnyDropdownOpen(true);
//     }, 100);

//   };
//   // Define a functional component to handle the hover effect

//   const [isHovered, setIsHovered] = useState(false);


//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);


//   const handleCollapsedChange = async () => {


//     setCollapsed(!collapsed);
//     SetToggleKey(!collapsed);
//     toggleSidebarWidth();

//   };

//   const handleToggleSidebar = (value) => {
//     setToggled(value);
//   };

//   // const myStyle = {
//   //   height: '40px',
//   // };

//   useEffect(() => {

//     if (role === 'ROLE_ADMIN') {
//       axios
//         .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}`)
//         .then((response) => {
//           setParentMenus(response.data);
//           // console.log(response);
//         })
//         .catch((error) => {
//           console.error('Error fetching parent menus:', error);
//         });
//     }

//     if (logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') {
//       axios
//         .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}/${logintype}/loginType`)
//         .then((response) => {
//           setParentMenus(response.data);
//           // console.log(response);
//         })
//         .catch((error) => {
//           console.error('Error fetching parent menus:', error);
//         });
//     }



//     // (userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party'
//     console.log("Calling API 11");
//     if (userType && userType.trim() !== '' && userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party' || userType === 'Accounts User') {
//       // console.log("User Ids ParentMenus");
//       console.log("Calling API 22");

//       axios.get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}/${userType}/byUserType`,)
//         .then((response) => {
//           setParentMenus(response.data);
//           // console.log("User Ids ParentMenus");

//           // console.log(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching parent menus:', error);
//         });

//       console.log("API Called");
//     }

//   }, [companyid, branchId]);


//   return (
//     <>
//       {(userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party' || userType === 'Accounts User') && (

//         <Sidebar
//           className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
//           style={{
//             height: "100%",
//             position: 'absolute',
//             width: width,
//             background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//           }}
//           collapsed={collapsed}
//           toggled={toggled}
//           handleToggleSidebar={handleToggleSidebar}
//           handleCollapsedChange={handleCollapsedChange}

//         >
//           <main className='bc2'>
//             <Menu>
//               {collapsed ? (
//                 <MenuItem
//                   icon={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange', }}
//                 ></MenuItem>
//               ) : (
//                 <MenuItem
//                   suffix={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange' }}
//                 >
//                   <div
//                     style={{
//                       padding: "5px",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                       letterSpacing: "1px",

//                     }}
//                   >
//                   </div>
//                 </MenuItem>
//               )}
//             </Menu>
//             <Menu>

//               {parentMenus.map((pm, index) => (
//                 (pm.child_Menu_Status === 'N' && (
//                   <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
//                   >
//                     <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
//                       setIsHovered(true);
//                     }}
//                       onMouseLeave={() => {
//                         setIsHovered(false);
//                       }}  >

//                       {pm.pmenu_Name}
//                     </MenuItem>
//                   </Link>
//                 )) || (
//                   pm.child_Menu_Status === 'Y' && (
//                     <div className="submenu" style={{

//                     }}
//                     >
//                       <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

//                       >
//                         {isAnyDropdownOpen ? (
//                           <DropdownUserType
//                             toggleChildMenu={toggleChildMenu}
//                             parentMenuId={pm.processId} />
//                         ) : null}
//                       </SubMenu>

//                     </div>

//                   )
//                 )
//               ))}
//             </Menu>

//           </main>

//         </Sidebar>

//       )}



















//       {role === 'ROLE_ADMIN' && (

//         <Sidebar
//           className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
//           style={{
//             height: "100%",
//             position: 'absolute',
//             width: width,
//             background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//           }}
//           collapsed={collapsed}
//           toggled={toggled}
//           handleToggleSidebar={handleToggleSidebar}
//           handleCollapsedChange={handleCollapsedChange}

//         >
//           <main className='bc2'>
//             <Menu>
//               {collapsed ? (
//                 <MenuItem
//                   icon={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange', }}
//                 ></MenuItem>
//               ) : (
//                 <MenuItem
//                   suffix={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange' }}
//                 >
//                   <div
//                     style={{
//                       padding: "5px",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                       letterSpacing: "1px",

//                     }}
//                   >
//                   </div>
//                 </MenuItem>
//               )}
//             </Menu>
//             <Menu>

//               {parentMenus.map((pm, index) => (
//                 (pm.child_Menu_Status === 'N' && (
//                   <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
//                   >
//                     <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
//                       setIsHovered(true);


//                     }}

//                       onMouseLeave={() => {
//                         setIsHovered(false);

//                       }}  >

//                       {pm.pmenu_Name}
//                     </MenuItem>
//                   </Link>
//                 )) || (
//                   pm.child_Menu_Status === 'Y' && (
//                     <div className="submenu" style={{

//                     }}


//                     >


//                       <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

//                       >
//                         {isAnyDropdownOpen ? (
//                           <Dropdown
//                             toggleChildMenu={toggleChildMenu}
//                             parentMenuId={pm.processId} />
//                         ) : null}
//                       </SubMenu>

//                     </div>

//                   )
//                 )
//               ))}
//             </Menu>

//           </main>

//         </Sidebar>

//       )}





// {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') && (

// <Sidebar
//   className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
//   style={{
//     height: "100%",
//     position: 'absolute',
//     width: width,
//     background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//   }}
//   collapsed={collapsed}
//   toggled={toggled}
//   handleToggleSidebar={handleToggleSidebar}
//   handleCollapsedChange={handleCollapsedChange}

// >
//   <main className='bc2'>
//     <Menu>
//       {collapsed ? (
//         <MenuItem
//           icon={<AiOutlineMenu />}
//           onClick={handleCollapsedChange}
//           style={{ color: 'orange', }}
//         ></MenuItem>
//       ) : (
//         <MenuItem
//           suffix={<AiOutlineMenu />}
//           onClick={handleCollapsedChange}
//           style={{ color: 'orange' }}
//         >
//           <div
//             style={{
//               padding: "5px",
//               fontWeight: "bold",
//               fontSize: 14,
//               letterSpacing: "1px",

//             }}
//           >
//           </div>
//         </MenuItem>
//       )}
//     </Menu>
//     <Menu>

//       {parentMenus.map((pm, index) => (
//         (pm.child_Menu_Status === 'N' && (
//           <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
//           >
//             <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
//               setIsHovered(true);
//             }}
//               onMouseLeave={() => {
//                 setIsHovered(false);
//               }}  >

//               {pm.pmenu_Name}
//             </MenuItem>
//           </Link>
//         )) || (
//           pm.child_Menu_Status === 'Y' && (
//             <div className="submenu" style={{

//             }}
//             >
//               <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

//               >
//                 {isAnyDropdownOpen ? (
//                   <DropdownLoginType
//                     toggleChildMenu={toggleChildMenu}
//                     parentMenuId={pm.processId} />
//                 ) : null}
//               </SubMenu>

//             </div>

//           )
//         )
//       ))}
//     </Menu>

//   </main>

// </Sidebar>

// )}



//     </>
//   );
// }




// function DropdownLoginType({ parentMenuId, toggleChildMenu }) {


//   const [childMenus, setChildMenus] = useState([]);
//   const reactPageName = 'Sidebar';
//   const {
//     branchId,
//     companyid,
//     userType,
//     logintype
//   } = useContext(AuthContext);

//   console.log("Calling Child Menu API");


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}api/childMenus/${parentMenuId}/${companyid}/${branchId}/${logintype}/byLoginTypeType`)
//       .then((response) => {
//         setChildMenus(response.data);
//         console.log(response.data);
//         console.log("IN Child Menu API");
//       })
//       .catch((error) => {
//         console.error('Error fetching child menus:', error);
//       });
//   }, [parentMenuId, companyid, branchId]);



//   return (
//     <>
//       {childMenus.map((childMenu, index) => (

//         <Link
//           className="removestyle"
//           to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
//           onClick={() => {
//             toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           }}
//         >
//           <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
//             {childMenu.child_Menu_Name}
//           </MenuItem>
//         </Link>

//       ))}
//     </>
//   );
// }










// function DropdownUserType({ parentMenuId, toggleChildMenu }) {


//   const [childMenus, setChildMenus] = useState([]);
//   const reactPageName = 'Sidebar';
//   const {
//     branchId,
//     companyid,
//     userType,
//   } = useContext(AuthContext);

//   console.log("Calling Child Menu API");


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}api/childMenus/${parentMenuId}/${companyid}/${branchId}/${userType}/byUserType`)
//       .then((response) => {
//         setChildMenus(response.data);
//         console.log(response.data);
//         console.log("IN Child Menu API");
//       })
//       .catch((error) => {
//         console.error('Error fetching child menus:', error);
//       });
//   }, [parentMenuId, companyid, branchId]);



//   return (
//     <>
//       {childMenus.map((childMenu, index) => (

//         <Link
//           className="removestyle"
//           to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
//           onClick={() => {
//             toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           }}
//         >
//           <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
//             {childMenu.child_Menu_Name}
//           </MenuItem>
//         </Link>

//       ))}
//     </>
//   );
// }












// function Dropdown({ parentMenuId, toggleChildMenu }) {


//   const [childMenus, setChildMenus] = useState([]);
//   const reactPageName = 'Sidebar';
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     isAuthenticated,
//     role,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}api/cm/${parentMenuId}/${companyid}/${branchId}`)
//       .then((response) => {
//         setChildMenus(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching child menus:', error);
//       });
//   }, [parentMenuId, companyid, branchId]);

//   return (
//     <>
//       {childMenus.map((childMenu, index) => (

//         <Link
//           className="removestyle"
//           to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
//           onClick={() => {
//             toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           }}
//         >
//           <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
//             {childMenu.child_Menu_Name}
//           </MenuItem>
//         </Link>

//       ))}
//     </>
//   );
// }




// import './Style.css';
// import React, { useState, useContext } from 'react';
// import AuthContext from './AuthProvider';
// import * as RiIcons from "react-icons/ri";
// import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
// import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// function SideBar({ collapsed, toggleSidebar }) {
//   const {
//     parentMenus,
//     childMenus,
//   } = useContext(AuthContext);

//   const getIcon = (iconName) => {
//     const IconComponent = RiIcons[iconName];
//     return IconComponent ? <IconComponent className="icon-style" /> : <RiIcons.RiFolder2Line className="icon-style" />;
//   };

//   const navbarStyle = {
//     backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',

//   };

//   return (
//     <div >
//       <Sidebar
//         className={`app ${collapsed ? "toggled" : ""}`}
//         style={navbarStyle}
//         collapsed={collapsed}
//       >
//         <main style={{ marginTop: '53px' }}>
//           <Menu>
//             {collapsed ? (
//               <MenuItem
//                 icon={<FiChevronsRight />}
//                 onClick={toggleSidebar}
//               ></MenuItem>
//             ) : (
//               <MenuItem
//                 suffix={<FiChevronsLeft />}
//                 onClick={toggleSidebar}
//               ></MenuItem>
//             )}
//             <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #000' }} />
//           </Menu>

//           <Menu>
//             {parentMenus.map((parentMenu) => (
//               <div key={parentMenu.processId}>
//                 {parentMenu.child_Menu_Status === 'Y' ? (
//                   <SubMenu label={<Link to={`${parentMenu.parent_page_links}?process_id=${parentMenu.processId}`} className="link-style">{parentMenu.pmenu_Name}</Link>} icon={getIcon(parentMenu.picons)}>
//                     {childMenus
//                       .filter(childMenu => childMenu.pprocess_Id === parentMenu.processId)
//                       .map((childMenu) => (
//                         <Link to={`${childMenu.child_page_links}?process_id=${childMenu.processId}`} className="link-style">
//                           <MenuItem key={childMenu.processId} icon={getIcon(childMenu.cicons)}>
//                             {childMenu.child_Menu_Name}
//                           </MenuItem>
//                         </Link>
//                       ))}
//                   </SubMenu>
//                 ) : (
//                   <Link to={`${parentMenu.parent_page_links}?process_id=${parentMenu.processId}`} className="link-style">
//                     <MenuItem icon={getIcon(parentMenu.picons)}>
//                       {parentMenu.pmenu_Name}
//                     </MenuItem>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </Menu>
//         </main>
//       </Sidebar>
//     </div>
//   );
// }
// export default SideBar;





import './Style.css';
import React, { useState, useContext } from 'react';
import AuthContext from './AuthProvider';
import * as RiIcons from "react-icons/ri";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function SideBar({ collapsed, toggleSidebar }) {
  const {
    parentMenus,
    childMenus,
  } = useContext(AuthContext);

  const getIcon = (iconName) => {
    const IconComponent = RiIcons[iconName];
    return IconComponent ? <IconComponent className="icon-style" /> : <RiIcons.RiFolder2Line className="icon-style" />;
  };

  const getIconChild = (iconName) => {
    const IconComponent = RiIcons[iconName];
    return IconComponent ? <IconComponent className="icon-style-child" /> : <RiIcons.RiFolder2Line className="icon-style" />;
  };



  // const navbarStyle = {
  //   // backgroundImage: 'linear-gradient(to top, #30CFD0 0%, #330867 100%)',
  //   backgroundRepeat: 'no-repeat',
  //   // position: 'fixed',
  //   left: 0,   
  //   backgroundSize: 'cover',
  //   height: '100vh', // Ensure full height
  //   color: 'white', // Text color for better contrast
  // };

  const navbarStyle = {
    position: 'fixed',     // Fixes the sidebar in place
    top: 0,                // Align to the top
    left: 0,               // Align to the left
    height: '100vh',       // Full viewport height
    // width: '250px',        // Set the width of your sidebar (adjust as needed)
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',        // Text color for better contrast
    overflowY: 'auto',     // Allows scrolling within the sidebar if content overflows
    zIndex: 1000,          // Keeps the sidebar on top of other elements
  };

  return (
    <div>
      <Sidebar
        className={`${collapsed ? "toggled sidebar-container" : ""} `}
        style={navbarStyle}
        collapsed={collapsed}
      >
        <main style={{ marginTop: '53px' }}>
          <Menu>
            {collapsed ? (
              <MenuItem
                icon={<FiChevronsRight style={{ color: 'blue', height: 40 }} />}
                onClick={toggleSidebar}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FiChevronsLeft style={{ color: 'blue', height: 40 }} />}
                onClick={toggleSidebar}
              ></MenuItem>
            )}
            <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #000' }} />
          </Menu>

          <Menu >
            {parentMenus.map((parentMenu) => (
              <div key={parentMenu.processId} className={`${parentMenu.processId}`}>
                {parentMenu.child_Menu_Status === 'Y' ? (
                  <SubMenu label={parentMenu.pmenu_Name}
                    // icon={getIcon(parentMenu.picons)}
                    icon={<span style={{ color: "black" }}>{getIcon(parentMenu.picons)}</span>}

                  >
                    {childMenus
                      .filter(childMenu => childMenu.pprocess_Id === parentMenu.processId)
                      .map((childMenu) => (
                        <Link to={`${childMenu.child_page_links}?process_id=${childMenu.processId}`}

                          className="submenu-link"
                        // className="d-flex align-items-center text-dark text-decoration-none my-2"
                        >
                          <MenuItem key={childMenu.processId}
                            // icon={getIconChild(childMenu.cicons)}
                            icon={<span style={{ color: "black" }}>{getIconChild(childMenu.cicons)}</span>}
                          >

                            <span className="ms-2" style={{ color: 'black' }}>{childMenu.child_Menu_Name}</span>

                          </MenuItem>
                        </Link>
                      ))}
                  </SubMenu>
                ) : (
                  <Link to={`${parentMenu.parent_page_links}?process_id=${parentMenu.processId}`}

                    className="d-flex align-items-center text-black text-decoration-none my-2"
                  >
                    <MenuItem icon={getIcon(parentMenu.picons)}>
                      {parentMenu.pmenu_Name}
                    </MenuItem>
                  </Link>
                )}
              </div>
            ))}
          </Menu>

          {/* <Menu>
  {parentMenus.map((parentMenu) => (
    <div key={parentMenu.processId} className="menu-item">
      {parentMenu.child_Menu_Status === "Y" ? (
        <SubMenu
          label={
            <Link
              to={`${parentMenu.parent_page_links}?process_id=${parentMenu.processId}`}
              className="menu-link"
            >
              {parentMenu.pmenu_Name}
            </Link>
          }
          icon={<span className="menu-icon">{getIcon(parentMenu.picons)}</span>}
        >
          {childMenus
            .filter((childMenu) => childMenu.pprocess_Id === parentMenu.processId)
            .map((childMenu) => (
              <Link
                to={`${childMenu.child_page_links}?process_id=${childMenu.processId}`}
                className="submenu-link"
                key={childMenu.processId}
              >
                <MenuItem
                  icon={<span className="menu-icon">{getIcon(childMenu.cicons)}</span>}
                >
                  {childMenu.child_Menu_Name}
                </MenuItem>
              </Link>
            ))}
        </SubMenu>
      ) : (
        <Link
          to={`${parentMenu.parent_page_links}?process_id=${parentMenu.processId}`}
          className="menu-link"
        >
          <MenuItem icon={<span className="menu-icon">{getIcon(parentMenu.picons)}</span>}>
            {parentMenu.pmenu_Name}
          </MenuItem>
        </Link>
      )}
    </div>
  ))}
</Menu> */}

        </main>
      </Sidebar>
    </div>

  );
}
export default SideBar;