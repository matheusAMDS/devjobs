import { Box, Heading, Container, Stack, Link, Flex, useColorMode } from "@chakra-ui/react"
import NextLink from "next/link"
import ThemeModeButton from "components/ColorModeButton"

const Layout: React.FC = ({ children }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Box p={5} bg={colorMode === 'light' ? "gray.100" : "gray.900"}>
        <Container maxW="4xl" >
          <Flex alignItems="center" justifyContent="space-between">
            <NextLink href="/">
              <Heading cursor="pointer">DevJobs</Heading>
            </NextLink>
            <Stack isInline alignItems="center" spacing={3}>
              <NextLink href="/about">
                <Link fontWeight="semibold" fontSize={17}>About</Link>
              </NextLink>
              <ThemeModeButton />
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Box as="main" minH="95vh">
        {children}
      </Box>
    </>
  )
}

export default Layout