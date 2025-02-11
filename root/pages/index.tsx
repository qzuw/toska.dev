import { Box, Flex, Image } from "@chakra-ui/core";
import toskaLogo from "assets/toskaLogo.svg";
import toskaMopo from "assets/toskaMopo.png";
import { Members } from "components/Members";
import { Projects } from "components/Projects";
import Section from "components/Section";
import fs from "fs";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { join } from "path";
import { FaGamepad, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { theme } from "utils/theme";

export const getStaticProps = async () => {
  const introText = await require("../content/intro.md");

  const projects = await Promise.all(
    fs
      .readdirSync(join(process.cwd(), "content", "projects"))
      .filter((file) => file.includes(".md"))
      .map((file) => file.replace(".md", ""))
      .map(async (p) => {
        const content = await import(`content/projects/${p}.md`);
        const parsed = matter(content.default);

        if (!parsed.data.github || !parsed.data.title) {
          throw Error("Markdown file doesn't have correct gray matter");
        }

        if (parsed.data.key && isNaN(Number(parsed.data.key))) {
          throw Error("Key provided has to be a number");
        }

        return {
          title: parsed.data.title as string,
          tags: parsed.data.tags ? (parsed.data.tags as string) : null,
          key: parsed.data.key ? Number(parsed.data.key) : null,
          content: parsed.content,
          name: p,
        };
      })
  );

  return { props: { introText: introText.default as string, projects } };
};

const IndexPage = ({
  introText,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Toska</title>
    </Head>
    <Section bg="WHITE">
      <Image src={toskaLogo} width="24rem" />
      <Box textAlign="center" letterSpacing={1} color={theme.textGrey}>
        Helsingin yliopiston tietojenkäsittelytieteen osaston
        sovelluskehitysakatemia
      </Box>
      <Box mt={12}>
        <ReactMarkdown source={introText} />
      </Box>
    </Section>
    <Section bg="BLACK" header="Projektit">
      <Projects projects={projects} />
    </Section>
    <Section bg="WHITE" header="Jäsenet" wide>
      <Members />
    </Section>
    <Section bg="BLACK">
      <>
        <Image src={toskaMopo} loading="lazy" w="4rem" mb="1rem" />
        <Flex color={theme.toskaYellow} fontSize="4rem">
          <a href="https://github.com/UniversityOfHelsinkiCS">
            <Box as={FaGithub} m="1rem" />
          </a>
          <a href="mailto:grp-toska@helsinki.fi">
            <Box as={MdEmail} m="1rem" />
          </a>
          <a href="https://doom.toska.dev">
            <Box as={FaGamepad} m="1rem" />
          </a>
        </Flex>
      </>
    </Section>
  </>
);

export default IndexPage;
