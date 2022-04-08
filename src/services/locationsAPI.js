const serverURL = "http://localhost:8080";

async function addLocation(newLocation) {

    const url = serverURL + "/newlocation";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
    });
    const result = await response.json();

    return result;
}

async function getAllLocations() {
    const url = serverURL + "/";
    const response = await fetch(url);
    const result = await response.json();

    return result;
}

async function deleteLocation() {
    const url = serverURL + "/deleteLocation";
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
    });
    const result = await response.json();

    return result;
}

export default {
    addLocation,
    getAllLocations
}