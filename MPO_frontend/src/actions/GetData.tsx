import axios from "axios";

export async function getData(endpoint: string, query: string | null) {
    let url = `http://localhost:5201/api/${endpoint}`;
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