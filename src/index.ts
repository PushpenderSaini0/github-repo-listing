import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));


const filterData = (data: any[], offset: number) => {
  const totalRepo = data.length;
  const upper_b = offset * 5;
  const lower_b = upper_b - 5 + 1;
  const repoArr: { name: any; description: any; language: any; }[] = [];
  const fData = {
    "message": "Ok",
    "error": false,
    "totalRepo": totalRepo,
    "data": repoArr
  };
  if (totalRepo < lower_b) return fData;
  data.slice(lower_b - 1, upper_b).forEach((repo) => {
    const obj = {
      "name": repo.name,
      "description": repo.description || "-",
      "language": repo.language || "text"
    };
    repoArr.push(obj);
  });

  return fData;
}

const getData = async (username: string, offset: number) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (response.status == 404) {
    return { 'message': "User Not Found", "error": true }
  }
  if (response.status != 200) {
    return { 'message': "Unknown Server Error", "error": true }
  }
  const data = await response.json();
  return filterData(data, offset);;
}


app.get('/api/repo/:username/:offset', async (req: Request, res: Response) => {
  const username = req.params.username;
  const offset = parseInt(req.params.offset);
  const myObj = {
    username,
    offset
  }
  const data = await getData(username, offset);
  res.json(data);
  //res.send('MAKE API CALL TO ' + offset);
});


app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
