import Head from 'next/head'
import Layout from 'components/Layout'
import { 
  Container, 
  Flex, 
  Heading, 
  Input, 
  Spinner, 
  Stack, 
  Switch, 
  useToast, 
  FormLabel,
  Button
} from '@chakra-ui/react'
import { JobOptions, useJobs } from "services/jobs"
import JobCard from 'components/JobCard'
import { FormEvent, useState } from 'react'

const Home: React.FC = () => {
  const toast = useToast()
  const [ description, setDescription ] = useState("")
  const [ location, setLocation ] = useState("")
  const [ fullTimeOnly, setFullTimeOnly ] = useState<boolean>(false)
  const [ jobsOptions, setJobsOptions ] = useState<JobOptions>({ page: 1 })
  const { data, loading, error } = useJobs(jobsOptions)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setJobsOptions({
      page: 1,
      description,
      location,
      full_time: fullTimeOnly
    })
  }

  if (error)
    toast({
      status: 'error',
      isClosable: true,
      duration: 3800,
      description: "Unable to fetch the jobs. Try again later."
    })

  return (
    <Layout>
      <Head>
        <title>Available Jobs | DevJobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="6xl" py={10}>
        {/* <Heading textAlign="center">Available Jobs</Heading> */}
        <Flex justifyContent="space-between" flexWrap="wrap-reverse" mt={10}>
          { loading ? <Spinner /> : (
            <Stack spacing={4} maxW="2xl">
              {data.jobs.map(job => (
                <JobCard key={job.id} jobData={job} />
              ))}
            </Stack> 
          )}
          <Stack 
            onSubmit={onSubmit} 
            as="form" 
            spacing={3}
            w="full"
            maxW="sm"
           /*  position="sticky"
            top={0} */
          >
            <Input 
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Input
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <Stack isInline spacing={1} alignItems="center">
              <FormLabel htmlFor="full-time-switch">Full Time Only</FormLabel>
              <Switch onChange={e => setFullTimeOnly(!fullTimeOnly)}/>
            </Stack>
            <Button type="submit" bg="blue.500">Search</Button>
          </Stack>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Home