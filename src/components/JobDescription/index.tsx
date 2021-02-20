import { Text, Box } from "@chakra-ui/react"

interface Props {
  html: string
}

const JobDescription: React.FC<Props> = ({ html }) => {
  return (
    <Box 
      className="job-description"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default JobDescription