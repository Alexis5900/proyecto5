import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function useFetch(endpoint) {
  const cache = useRef({}); // Cache para evitar solicitudes repetidas
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) {
      setError(new Error("La URL de la API no está definida en .env"));
      setLoading(false);
      return;
    }

    if (cache.current[endpoint]) {
      setData(cache.current[endpoint]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${endpoint.replace(/^\//, "")}`, {
          signal: controller.signal,
        });
        setData(response.data);
        cache.current[endpoint] = response.data; // Guardar en cache
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(new Error("No se pudieron obtener los datos. Intenta más tarde."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [endpoint]);

  return { data: data || {}, loading, error };
}
