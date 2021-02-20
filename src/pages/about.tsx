import { Heading, Container } from "@chakra-ui/react"
import Layout from "components/Layout"

const About: React.FC = () => {
  return (
    <Layout>
      <Container maxW="4xl">
        <Heading>About this project</Heading>
      </Container>
    </Layout>
  )
}

export default About