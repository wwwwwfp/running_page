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

const data: ISiteMetadataResult = {
  siteTitle: 'Running Page',
  siteUrl: 'https://run.5iwork.com',
  logo: 'https://github.com/wwwwwfp/running_page/blob/master/src/images/head.jpg',
  description: 'Personal site and blog',
  navLinks: [
    {
      name: 'Blog',
      url: 'https://blog.5iwork.com',
    },
    {
      name: 'Domain',
      url: 'http://domain.5iwork.com/',
    },
  ],
};

export default data;
