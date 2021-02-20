import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { Job, JobOptions } from "services/jobs"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const options = (req.query as unknown) as JobOptions
  const url = 'https://jobs.github.com/positions.json'
  const response = await axios.get<Job[]>(url, {
    params: options
  })
  const jobs = response.data
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  return res.json({
    jobs,
    page: options.page
  })
}