import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export async function getData(endpoint: string, query: string | null) {
    let url = `${apiUrl}${endpoint}`;
    if (query) url += `${query}`;
    console.log(url);
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    if (!res.data) throw new Error("Failed to fetch data");

    return res.data;
}

export async function postData(endpoint: string, query: string | null, data: any) {
    let url = `${apiUrl}${endpoint}`;
    if (query) url += `${query}`;
    console.log(url);
    const res = await axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    return res.data;
}

export async function putData(endpoint: string, query: string | null, data: any) {
    let url = `${apiUrl}${endpoint}`;
    if (query) url += `${query}`;
    console.log(url);
    const res = await axios.put(url, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    return res.data;
}