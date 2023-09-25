import axios from "axios";

const BASE_URL = "http://localhost:5001/api/";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDZkMzk4NWI5MzJkYjA0YWIyNWNiNyIsImlzQWRtaW4iOiJhZG1pbiIsImlhdCI6MTY5NTM3OTkzOCwiZXhwIjoxNjk1NjM5MTM4fQ.9TGh8PSM5T4pEYleBuc3xClBG_aFVIsaTPX49JPZtWQ"
export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });