import { useEffect, useMemo, useState } from 'react';
import defaultProjects from './assets/project';
import defaultSkills from './assets/skills';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
// import AdminLogin from './admin/AdminLogin';
// import AdminDashboard from './admin/AdminDashboard';
import {
  getStoredProjects,
  getStoredSkills,
  isAdminAuthenticated,
  saveProjects,
  saveSkills,
  verifyAdminSession,
} from './utils/storage';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to, replace = false) => {
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPathname(to);
  };

  return { pathname, navigate };
}

export default function App() {
  const { pathname, navigate } = usePathname();
  const [skills, setSkills] = useState(defaultSkills);
  const [projects, setProjects] = useState(defaultProjects);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      const [skillsData, projectsData] = await Promise.all([getStoredSkills(), getStoredProjects()]);
      if (ignore) return;
      setSkills(skillsData);
      setProjects(projectsData);
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function checkAuth() {
      if (!isAdminAuthenticated()) {
        if (!ignore) {
          setIsAuthenticated(false);
          setAuthChecked(true);
        }
        return;
      }

      const valid = await verifyAdminSession();
      if (ignore) return;

      setIsAuthenticated(valid);
      setAuthChecked(true);

      if (!valid && pathname.startsWith('/admin')) {
        navigate('/admin', true);
      }
    }

    checkAuth();

    return () => {
      ignore = true;
    };
  }, [navigate, pathname]);

  useEffect(() => {
    if (pathname === '/admin/dashboard' && !isAuthenticated) {
      navigate('/admin', true);
    }
  }, [isAuthenticated, navigate, pathname]);

  const onSaveSkills = async (nextSkills) => {
    try {
      const saved = await saveSkills(nextSkills);
      setSkills(saved);
    } catch (error) {
      alert(error.message || 'Failed to save skills');
    }
  };

  const onSaveProjects = async (nextProjects) => {
    try {
      const saved = await saveProjects(nextProjects);
      setProjects(saved);
    } catch (error) {
      alert(error.message || 'Failed to save projects');
    }
  };

  // const onLogout = async () => {
  //   await logoutAdmin();
  //   setIsAuthenticated(false);
  //   navigate('/admin', true);
  // };

  const publicPage = useMemo(
    () => (
      <div className="font-sans text-slate-100">
        <Navbar />
        <HeroSection />
        <AboutSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </div>
    ),
    [projects, skills],
  );

  // if (pathname === '/admin') {
  //   return (
  //     <AdminLogin
  //       onSuccess={() => {
  //         setIsAuthenticated(true);
  //         navigate('/admin/dashboard', true);
  //       }}
  //     />
  //   );
  // }

  // if (pathname === '/admin/dashboard') {
  //   if (!authChecked) return null;
  //   if (!isAuthenticated) return null;

  //   return (
  //     <AdminDashboard
  //       skills={skills}
  //       projects={projects}
  //       onSaveSkills={onSaveSkills}
  //       onSaveProjects={onSaveProjects}
  //       onLogout={onLogout}
  //     />
  //   );
  // }

  return publicPage;
}
