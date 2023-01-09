import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "https://paradive.onrender.com/api"

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                const res = process.env.REACT_APP_MODE === "development"? (await axios.get(url)) : (await axios.get(`${API_URL}${url}`))
                
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = process.env.REACT_APP_MODE === "development"? (await axios.get(url)) : (await axios.get(`${API_URL}${url}`))

            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;