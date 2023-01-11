import {API_KEY_LIST, API_URL} from "../utils/Constants";
import axios from "axios";

export const getResponseChat = async (message: string): Promise<string> => {
  const API_KEY = API_KEY_LIST[Math.floor(Math.random() * API_KEY_LIST.length)];
  const params = JSON.stringify({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 4000,
    temperature: 0
  })
  return await axios.post(API_URL, params, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }).then(jsonData => {
    const data = jsonData.data;
    const responseText = data?.choices[0]?.text;
    return responseText.toString().trim().replaceAll("\n", "<br />");
  }).catch(e => {
    console.log(e);
    return e.message;
  });
}
