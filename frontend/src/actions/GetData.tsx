
export async function getData(query: string) {
    const url = `http://localhost:5201/api/${query}`;
    console.log(url);
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
}