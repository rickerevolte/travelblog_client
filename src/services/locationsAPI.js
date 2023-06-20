const serverURL = "https://travelblog-server-heroku-22.herokuapp.com";


async function getAllLocations() {
    const url = serverURL + "/"; // "/anything" as long as it matches with server app.js: app.get("/anything", (req,res)=>{})
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result = await response.json();
    const dataArray = result.result;
    return dataArray;
}
async function getLocationById(id) {
    const url = serverURL + `/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    const locationArray = result.result;
    return locationArray;
}
async function addLocation(newLocation) {
    const url = serverURL + "/";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation) // = req.body
    });
    const result = await response.json();
    return result;
}
async function editLocation(editedPost) {
    const id = String(editedPost.id)
    const url = serverURL + `/${id}`;
    const dataToSend = { index: editedPost.id, editedPost }
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    });
    const result = await response.json();
    return result;

}
async function deleteLocation(id) {
    const url = serverURL + "/";
    const dataToSend = { index: id }
    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    });
    const result = await response.json();
    return result;
}
export default {
    addLocation,
    getAllLocations,
    deleteLocation,
    getLocationById,
    editLocation
}