import { Avatar, Badge, Box, Heading, Icon, Stack, Text } from "@chakra-ui/react"
import { Job } from "services/jobs"
import { getDaysDistance } from "utils/getDaysDistance"
import { MdLocationCity } from "react-icons/md"
import NextLink from "next/link"

interface Props {
  jobData: Job
}

const JobCard: React.FC<Props> = ({ jobData }) => {
  return (
    <Box p={4} borderTopWidth={1}>
      <Text color="gray.400" fontWeight="semibold">
        {getDaysDistance(new Date(jobData.created_at))}
      </Text>
      <NextLink href={`/jobs/[id]`} as={`/jobs/${jobData.id}`}>
        <Heading fontWeight="semibold" fontSize="2xl" as="h2" color="blue.400" cursor="pointer">
          {jobData.title}
        </Heading>
      </NextLink>
      <Stack isInline spacing={3} my={2}>
        <Stack isInline spacing={1}>
          <Icon as={MdLocationCity} w={6} h={6}/>
          <Text fontSize={17} fontWeight="semibold">
            {jobData.location}
          </Text>
        </Stack>
        <Badge fontSize={17} variant="solid" ml={1} colorScheme="green">
          {jobData.type}
        </Badge>
      </Stack>
      <Stack isInline spacing={3} alignItems="center" mt={5}>
        <Avatar src={jobData.company_logo} />
        <Text fontSize={17} fontWeight="semibold">
          {jobData.company}
        </Text>
      </Stack>
    </Box>
  )
}

export default JobCard