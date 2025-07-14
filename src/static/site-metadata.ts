interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

const data: ISiteMetadataResult = {
  siteTitle: 'Running',
  siteUrl: 'https://run.5iwork.com',
  logo: '/images/head.png',
  description: 'Personal site and blog',
  navLinks: [
    {
      name: 'Summary',
      url: `${getBasePath()}/summary`,
    },
    {
      name: 'Blog',
      url: 'https://blog.5iwork.com',
    },
    {
      name: 'Tools',
      url: 'https://it.5iwork.com',
    },
    {
      name: 'Domain',
      url: 'http://domain.5iwork.com/',
    },
  ],
};

export default data;
