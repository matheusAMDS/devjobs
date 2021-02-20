import Layout from "components/Layout"
import { GetServerSideProps } from "next"
import { getJob, Job } from "services/jobs"
import { Text, Container, Box, Stack, Heading, Badge, Icon, Link, Button } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import JobDescription from "components/JobDescription"
import { getDaysDistance } from "utils/getDaysDistance"
import { MdLocationCity } from "react-icons/md"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"

interface Props {
  job: Job
}

const JobDetails: React.FC<Props> = ({ job }) => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>{job.title} | DevJobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="6xl" py={10}>
        <Button 
          leftIcon={<ArrowBackIcon />} 
          variant="ghost" 
          colorScheme="blue"
          onClick={() => router.push("/")}
        >
          Go Back
        </Button>
        <Box p={5}>
          <Stack spacing={4} float="right" p={2}>
            <Image 
              src={job.company_logo} 
              width={220} 
              height={180} 
              //layout="responsive"
              alt={job.company}
            />
            <Box>
              <Text fontSize={20} fontWeight="semibold">
                {job.company}
              </Text>
              <Link href={job.company_url} color="blue.400" target="_blank">
                Visit website
              </Link>
            </Box>
          </Stack>
          <Text color="gray.400" fontWeight="semibold">
            {getDaysDistance(new Date(job.created_at))}
          </Text>
          <Heading fontWeight="bold" as="h1" color="blue.400">
            {job.title}
          </Heading>
          <Stack isInline spacing={3} my={2}>
            <Stack isInline spacing={1}>
              <Icon as={MdLocationCity} w={6} h={6}/>
              <Text fontSize={17} fontWeight="semibold">
                {job.location}
              </Text>
            </Stack>
            <Badge fontSize={17} variant="solid" ml={1} colorScheme="green">
              {job.type}
            </Badge>
          </Stack>
          
          <Heading fontSize="3xl" as="h2" mt={30}>Description</Heading>
          <JobDescription html={job.description} /> 
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const job = await getJob(params.id as string)

  return {
    props: {
      job
    }
  }
}

export default JobDetails