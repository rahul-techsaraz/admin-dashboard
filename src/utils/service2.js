import axios from "axios";

export const httpCall2 = async (url, body) => {
    if (!url) {
        throw Error("Please pass the valid url");
    }
    // if (!headers) {
    //     throw Error("Please pass the valid url");
    // }
    // if (!method) {
    //     throw Error("Please pass the valid url");
    // }
    // const options = await prepareOption(headers, method, body);
    const data = await axios.post(url, body);
    const json = {}

    return {...json, data:data.data, status:data.status};
}
const prepareOption = (headers, method, body) => {
      const options = {
        method,
        headers
    }
    if (body) {
        return {...options, body : body}
    }
    return options;
 }