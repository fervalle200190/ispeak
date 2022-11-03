import SideNavItem from "../SideNavItem";
import SideNavIcons from "../SideNavIcons";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';

const NAV_ITEMS = {
  student: [
    {
      id: 0,
      title: "Dashboard",
      icon: <SideNavIcons name="dashboard" />,
      url: "/",
    },
    {
      id: 1,
      title: "Learning Path",
      icon: <CastForEducationIcon sx={{mr: 1, ':hover': {color: '#5df99c'}}} />,
      url: "/courses",
    },
    {
      id: 2,
      title: "Self-paced",
      icon: <ConnectedTvIcon sx={{mr: 1, ':hover': {color: '#5df99c'}}} />,
      url: "/courses-paced",
    },
    {
      id: 3,
      title: "Material",
      icon: <SideNavIcons name="material" />,
      url: "/refuerzo",
    },
    // {
    //   title: "Matches",
    //   icon: (
    //     <SideNavIcons name='matches' />
    //   ),
    //   url: "",
    // },
    {
      id: 4,
      title: "Profile",
      icon: <SideNavIcons name="profile" />,
      url: "/profile",
    },
    {
      id:5,
      title: 'Calendar',
      icon: <SideNavIcons name='videocall' />,
      url: '/calendar'
    }
  ],
  professor: [
    {
      id: 0,
      title: "Dashboard",
      icon: <SideNavIcons name="dashboard" />,
      url: "/",
    },
    {
      id: 1,
      title: "Students",
      icon: <SideNavIcons name="students" />,
      url: "/students",
    },
    {
      id: 2,
      title: "Courses",
      icon: <SideNavIcons name="courses" />,
      url: "/courses",
    },
    {
      id: 3,
      title: "Assistance",
      icon: <SideNavIcons name="assistance" />,
      url: "/assistance",
    },
    {
      id: 4,
      title: "Follow Up",
      icon: <SideNavIcons name="followup" />,
      url: "/followup",
    },
    {
      id: 5,
      title: "Progress",
      icon: <SideNavIcons name="progress" />,
      url: "/progress",
    },
    // {
    //   id: 6,
    //   title: "My Community",
    //   icon: <SideNavIcons name="community" />,
    //   url: "/community",
    // },
    {
      id: 7,
      title: "Community",
      icon: <SideNavIcons name="community" />,
      url: "/course-community",
    },
  ],
};

export default function SideNav() {
  const userInfo = JSON.parse(localStorage.getItem("loggedAppUser"));
  const navItems =
    userInfo.rol === "Profesor" ? NAV_ITEMS.professor : NAV_ITEMS.student;
  return (
    <>
      <nav className="flex flex-col">
        {navItems.map(({ id, title, icon, url }) => (
          <SideNavItem key={id} title={title} icon={icon} url={url} />
        ))}
      </nav>
    </>
  );
}
