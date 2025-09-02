import { createContext, useEffect, useState } from "react";
import axios from 'axios';
// import certificate from "../../Backend/models/certificate";

export const AppContext = createContext();

const Backend_url = `${import.meta.env.VITE_BACKEND_URL}`;

const Context = ({ children }) => {
    const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [certificate, setCertificate] = useState([])

    // Fetch services
    const callservices = async () => {
        try {
            const response = await axios.get(`${Backend_url}/user/getservices`);
            console.log(response.data)
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
        }
    };

    // Fetch blogs
    const callblogs = async () => {
        try {
            const response = await axios.get(`${Backend_url}/user/getblogs`);
            console.log(response.data)
            setBlogs(response.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    const callcertificates = async () => {
        try {
            const response = await axios.get(`${Backend_url}/user/getcertificates`);
            setCertificate(response.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    // Initial load
    useEffect(() => {
        callservices();
        callblogs();
        callcertificates()
    }, []);

    return (
        <AppContext.Provider value={{ services, callservices, blogs, callblogs, certificate, callcertificates }}>
            {children}
        </AppContext.Provider>
    );
};

export default Context;
