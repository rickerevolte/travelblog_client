// const serverURL = "http://localhost:8080";
const serverURL = "https://travelblog-server-heroku-22.herokuapp.com";


async function getAllLocations() {
    // const url = serverURL;
    const url = serverURL + "/"; // "/anything" as long as it matches with server app.js: app.get("/anything", (req,res)=>{})
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const result = await response.json();
    const dataArray = result.result;
    // console.log(dataArray);
    return dataArray;
}
async function getLocationById(id) {
    console.log(`getLocationById called ${id}`);
    const url = serverURL + `/${id}`;
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    const locationArray = result.result;
    console.log(locationArray);
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
    return result.result;
}
async function editLocation(editedPost) {
    console.log(`locationsAPI editLocation ${editedPost.city} called`);
    const id = String(editedPost.id)
    console.log(id)
    const url = serverURL + `/${id}`;
    // console.log(url)
    const dataToSend = { index: editedPost.id, editedPost }
    // console.log(dataToSend);
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    });
    const result = await response.json();
    // alert("result");
    return result;

}
async function deleteLocation(id) {
    // console.log(`deleting ${id}`)
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