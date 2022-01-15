import axios from 'axios';
import {useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('Loading.....');
        setData(null);
        setError(null);

        const source = axios.CancelToken.source();
        axios.get(url, { cancelToken: source.token })
            .then(res => {
                setLoading(false);
                res && res.data && setData(res.data);
            })
            .catch(err => {
                setLoading(false);
                setError('An error occured. ', err)
            })
            return () => {
                source.cancel();
            }
    }, [url])
    return { data, loading, error }
}

export default useFetch;
