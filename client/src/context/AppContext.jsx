import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
// import generateToken from "../../../server/utils/generateJwt.js";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  // RecruiterLogin
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // for recruiter
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  //   for user data
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // function to fetch user data
  async function fetchUserData() {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/user/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", data);
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
        console.log(console.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // function to fetch jobs
  async function fetchJobs() {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");
      console.log("response:", data);
      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // funstio for fetch company data
  async function fetchCompanyData() {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to fetch user Applications data
  async function fetchUserApplications() {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/user/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
