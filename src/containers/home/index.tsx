import Head from 'next/head'
import styled from 'styled-components';

import HeroText from './hero-text';
import Security from './security';
import Certificates from './certificates';
import Contact from './contact';
import ServicesList from './services-list';

const Main = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: auto;
`;

/**
* Visit https://schema.org/docs/full.html for a list of all types to put here
*/
// const JSONLD = `{
// 	"@context": "http://schema.org/",
// 	"@type": "Thing",
// 	"name": "your site thing",
// 	"image": "${ImageURLs.logoPng}"
// }`;

export default function Home() {
	return (
		<>
			<Head>
				<title>Sidharta's home page</title>
				<link rel="canonical" href="https://sidharta.xyz"/>

				{/* TODO - add json-ld when ready */}
				{/* <script type='application/ld+json'>{JSONLD}</script> */}
			</Head>
			<Main>
				<HeroText />
				<Certificates />
				<ServicesList />
				<Security />
				<Contact />
			</Main>
		</>
	)
}
