import axios from "axios"
import useSWR from "swr"
import { useState, useEffect } from "react"

export interface JobOptions {
  page: number 
  description?: string 
  full_time?: boolean
  location?: string
}

export interface Job {
  id: string
  type: string,
  url: string
  created_at: Date
  company: string
  company_url: string | null,
  location: string,
  title: string
  description: string
  how_to_apply: string
  company_logo: string
}

interface GetJobsResponse {
  page: number 
  jobs: Job[]
}

export async function getJob(id: string) {
  const url = `https://jobs.github.com/positions/${id}.json`
  const response = await axios.get<Job>(url)

  return response.data
}

export async function getJobs(options: JobOptions) {
  const response = await axios.get<GetJobsResponse>("/api/jobs", {
    params: options
  })

  return response.data
}

export function useJobs(options: JobOptions) {
  const params = (options as unknown) as Record<string, string>
  const key = new URLSearchParams(params).toString()
  console.log(key)

  const { data, error } = useSWR(key, async () => {
    return await getJobs(options)
  })

  return {
    data,
    error,
    loading: !data && !error,
    
  }
}