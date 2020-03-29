// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const PAGE_URL = 'https://wms360.aspira.qc.seldatdirect.com';
const API_URL = 'https://apigw-live3.seldatdirect.com/qc/aspira/wms-core/api'; // use for Gateway if exist
const DOMAINS = ['wms360.aspira.qc.seldatdirect.com', 'apigw-live3.seldatdirect.com'];
const TOKEN = 'id_token';

export const environment = {
    production: false,
    hmr       : false,
    API: {
        'apiBase': API_URL,
        'apiMaster': API_URL + '/core/master-service/v1',
        'apiCommon': API_URL + '/core/common-service/v1',
        'apiAuthen': API_URL + '/core/authentication',
        'version': 'scannerVersion'
      },
      PAGE_URL: PAGE_URL,
      whitelistedDomains: DOMAINS,
      token: TOKEN
};
