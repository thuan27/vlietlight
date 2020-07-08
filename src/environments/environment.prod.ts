// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const PAGE_URL = 'http://vietlight.info';
// const API_URL = 'http://35.240.239.183/demoapi';
const API_URL = 'http://vietlight.vietlight.info';
const API_ADMIN_URL = 'http://35.240.239.183/demoapi';
const DOMAINS = ['vietlight.info'];
const TOKEN = 'id_token';
const USERNAME = 'username';
const PASSWORD = 'password';
const USERTYPE = '';

export const environment = {
    production: false,
    hmr       : false,
    API: {
        'apiBase': API_URL,
        'apiAdminBase': API_ADMIN_URL,
        'apiCommon': API_URL + '/core/common-service/v1',
        'apiAuthen': API_URL + '/core/authentication',
        // 'apiAuthen': API_URL + '/users',
        'apiMaster': API_URL + '/users',
        'version': 'scannerVersion'
      },
      PAGE_URL: PAGE_URL,
      whitelistedDomains: DOMAINS,
      token: TOKEN,
      username: USERNAME,
      password: PASSWORD,
      userType: USERTYPE
};
