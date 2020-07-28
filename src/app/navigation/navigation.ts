export const navigation = [
    {
        'id'       : 'applications',
        'title'    : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'     : 'group',
        'icon'     : 'apps',
        'children' : [
            {
                'id'       : 'dashboards',
                'title'    : 'Dashboards',
                'translate': 'NAV.DASHBOARDS',
                'type'     : 'collapse',
                'icon'     : 'dashboard',
                'children' : [
                    {
                        'id'   : 'analytics',
                        'title': 'Analytics',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'project',
                        'title': 'Project',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'       : 'master-data',
                'title'    : 'Master Data',
                'translate': 'NAV.MASTERDATA',
                'type'     : 'collapse',
                'icon'     : 'border_all',
                'children' : [
                    {
                        'id'   : 'UsersList',
                        'title': 'Users',
                        'type' : 'item',
                        'url'  : '/apps/master-data/users'
                    },
                    {
                        'id'   : 'CustomersList',
                        'title': 'Customers',
                        'type' : 'item',
                        'url'  : '/apps/master-data/customers'
                    },
                    {
                        'id'   : 'CustomerServiceListComponent',
                        'title': 'Customers Service',
                        'type' : 'item',
                        'url'  : '/apps/master-data/customers-service'
                    },
                    {
                        'id'   : 'CountriesList',
                        'title': 'Countries',
                        'type' : 'item',
                        'url'  : '/apps/master-data/countries'
                    },
                    {
                        'id'   : 'CountriesZoneList',
                        'title': 'Countries Zone',
                        'type' : 'item',
                        'url'  : '/apps/master-data/countries-zone'
                    },
                    {
                        'id'   : 'ServiceList',
                        'title': 'Service',
                        'type' : 'item',
                        'url'  : '/apps/master-data/service'
                    },
                    {
                        'id'   : 'PriceList',
                        'title': 'Price',
                        'type' : 'item',
                        'url'  : '/apps/master-data/price'
                    },
                    {
                        'id'   : 'RangePriceList',
                        'title': 'Range Price',
                        'type' : 'item',
                        'url'  : '/apps/master-data/range-price'
                    }
                ]
            },
            {
                'id'       : 'inbound',
                'title'    : 'Inbound',
                'translate': 'NAV.INBOUND',
                'type'     : 'collapse',
                'icon'     : 'label_outline',
                'children' : [
                    {
                        'id'   : 'AWBList',
                        'title': 'AWB',
                        'type' : 'item',
                        'url'  : '/apps/inbound/awb',
                        'exactMatch': true
                    },
                    // {
                    //     'id'   : 'AWBListForCus',
                    //     'title': 'AWB Customer',
                    //     'type' : 'item',
                    //     'url'  : '/apps/inbound/awb/create-for-cus',
                    //     'exactMatch': true
                    // }
                ]
            },
          {
              'id'       : 'outbound',
              'title'    : 'Outbound',
              'translate': 'NAV.OUTBOUND',
              'type'     : 'collapse',
              'icon'     : 'label_outline',
              'children' : [
                  {
                      'id'   : 'order',
                      'title': 'Order',
                      'type' : 'item',
                      'url'  : '/apps/outbound/order',
                      'exactMatch': true
                  },
              ]
            },
            {
                'id'       : 'utility',
                'title'    : 'Utility',
                'translate': 'NAV.UTILITY',
                'type'     : 'collapse',
                'icon'     : 'lightbulb_outline',
                'children' : [
                    {
                        'id'   : 'quicksearch',
                        'title': 'Quick Search',
                        'type' : 'item',
                        'url'  : '/apps/utility/quick-search',
                        'exactMatch': true
                    },
                    {
                        'id'   : 'calculateMoney',
                        'title': 'Calculate Money',
                        'type' : 'item',
                        'url'  : '/apps/utility/calculate-money',
                        'exactMatch': true
                    }
                ]
            },
            {
              'id'       : 'administration',
              'title'    : 'Administration',
              'translate': 'NAV.ADMINISTRATION',
              'type'     : 'collapse',
              'icon'     : 'person_outline',
              'children' : [
                  {
                      'id'   : 'roles',
                      'title': 'Roles',
                      'type' : 'item',
                      'url'  : '/apps/administration/roles',
                      'exactMatch': true
                  },
              ]
            },
            {
              'id'       : 'import',
              'title'    : 'Import',
              'translate': 'NAV.IMPORT',
              'type'     : 'collapse',
              'icon'     : 'import_export',
              'children' : [
                  {
                      'id'   : 'service',
                      'title': 'Import Service',
                      'type' : 'item',
                      'url'  : '/apps/import/service',
                      'exactMatch': true
                  },
              ]
            },
            {
                'id'       : 'calendar',
                'title'    : 'Calendar',
                'translate': 'NAV.CALENDAR',
                'type'     : 'item',
                'icon'     : 'today',
                'url'      : '/apps/calendar'
            },
            // {
            //     'id'       : 'e-commerce',
            //     'title'    : 'E-Commerce',
            //     'translate': 'NAV.ECOMMERCE',
            //     'type'     : 'collapse',
            //     'icon'     : 'shopping_cart',
            //     'children' : [
            //         {
            //             'id'   : 'dashboard',
            //             'title': 'Dashboard',
            //             'type' : 'item',
            //             'url'  : '/apps/e-commerce/dashboard'
            //         },
            //         {
            //             'id'        : 'products',
            //             'title'     : 'Products',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/products',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'productDetail',
            //             'title'     : 'Product Detail',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/products/1/printed-dress',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'orders',
            //             'title'     : 'Orders',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/orders',
            //             'exactMatch': true
            //         },
            //         {
            //             'id'        : 'orderDetail',
            //             'title'     : 'Order Detail',
            //             'type'      : 'item',
            //             'url'       : '/apps/e-commerce/orders/1',
            //             'exactMatch': true
            //         }
            //     ]
            // },
        //     {
        //         'id'       : 'academy',
        //         'title'    : 'Academy',
        //         'translate': 'NAV.ACADEMY',
        //         'type'     : 'item',
        //         'icon'     : 'school',
        //         'url'      : '/apps/academy'
        //     },
        //     {
        //         'id'       : 'mail',
        //         'title'    : 'Mail',
        //         'translate': 'NAV.MAIL.TITLE',
        //         'type'     : 'item',
        //         'icon'     : 'email',
        //         'url'      : '/apps/mail',
        //         'badge'    : {
        //             'title'    : 25,
        //             'translate': 'NAV.MAIL.BADGE',
        //             'bg'       : '#F44336',
        //             'fg'       : '#FFFFFF'
        //         }
        //     },
        //     {
        //         'id'       : 'mail-ngrx',
        //         'title'    : 'Mail Ngrx',
        //         'translate': 'NAV.MAIL_NGRX.TITLE',
        //         'type'     : 'item',
        //         'icon'     : 'email',
        //         'url'      : '/apps/mail-ngrx',
        //         'badge'    : {
        //             'title'    : 13,
        //             'translate': 'NAV.MAIL_NGRX.BADGE',
        //             'bg'       : '#EC0C8E',
        //             'fg'       : '#FFFFFF'
        //         }
        //     },
        //     {
        //         'id'       : 'chat',
        //         'title'    : 'Chat',
        //         'translate': 'NAV.CHAT',
        //         'type'     : 'item',
        //         'icon'     : 'chat',
        //         'url'      : '/apps/chat',
        //         'badge'    : {
        //             'title': 13,
        //             'bg'   : '#09d261',
        //             'fg'   : '#FFFFFF'
        //         }
        //     },
        //     {
        //         'id'       : 'file-manager',
        //         'title'    : 'File Manager',
        //         'translate': 'NAV.FILE_MANAGER',
        //         'type'     : 'item',
        //         'icon'     : 'folder',
        //         'url'      : '/apps/file-manager'
        //     },
        //     {
        //         'id'       : 'contacts',
        //         'title'    : 'Contacts',
        //         'translate': 'NAV.CONTACTS',
        //         'type'     : 'item',
        //         'icon'     : 'account_box',
        //         'url'      : '/apps/contacts'
        //     },
        //     {
        //         'id'       : 'to-do',
        //         'title'    : 'To-Do',
        //         'translate': 'NAV.TODO',
        //         'type'     : 'item',
        //         'icon'     : 'check_box',
        //         'url'      : '/apps/todo',
        //         'badge'    : {
        //             'title': 3,
        //             'bg'   : '#FF6F00',
        //             'fg'   : '#FFFFFF'
        //         }
        //     },
        //     {
        //         'id'       : 'scrumboard',
        //         'title'    : 'Scrumboard',
        //         'translate': 'NAV.SCRUMBOARD',
        //         'type'     : 'item',
        //         'icon'     : 'assessment',
        //         'url'      : '/apps/scrumboard'
        //     }
        ]
    },
    // {
    //     'id'      : 'pages',
    //     'title'   : 'Pages',
    //     'type'    : 'group',
    //     'icon'    : 'pages',
    //     'children': [
    //         {
    //             'id'      : 'authentication',
    //             'title'   : 'Authentication',
    //             'type'    : 'collapse',
    //             'icon'    : 'lock',
    //             'badge'   : {
    //                 'title': 10,
    //                 'bg'   : '#525e8a',
    //                 'fg'   : '#FFFFFF'
    //             },
    //             'children': [
    //                 {
    //                     'id'   : 'login',
    //                     'title': 'Login',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/login'
    //                 },
    //                 {
    //                     'id'   : 'login-v2',
    //                     'title': 'Login v2',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/login-2'
    //                 },
    //                 {
    //                     'id'   : 'register',
    //                     'title': 'Register',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/register'
    //                 },
    //                 {
    //                     'id'   : 'register-v2',
    //                     'title': 'Register v2',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/register-2'
    //                 },
    //                 {
    //                     'id'   : 'forgot-password',
    //                     'title': 'Forgot Password',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/forgot-password'
    //                 },
    //                 {
    //                     'id'   : 'forgot-password-v2',
    //                     'title': 'Forgot Password v2',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/forgot-password-2'
    //                 },
    //                 {
    //                     'id'   : 'reset-password',
    //                     'title': 'Reset Password',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/reset-password'
    //                 },
    //                 {
    //                     'id'   : 'reset-password-v2',
    //                     'title': 'Reset Password v2',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/reset-password-2'
    //                 },
    //                 {
    //                     'id'   : 'lock-screen',
    //                     'title': 'Lock Screen',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/lock'
    //                 },
    //                 {
    //                     'id'   : 'mail-confirmation',
    //                     'title': 'Mail Confirmation',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/auth/mail-confirm'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'coming-soon',
    //             'title': 'Coming Soon',
    //             'type' : 'item',
    //             'icon' : 'alarm',
    //             'url'  : '/apps/pages/coming-soon'
    //         },
    //         {
    //             'id'      : 'errors',
    //             'title'   : 'Errors',
    //             'type'    : 'collapse',
    //             'icon'    : 'error',
    //             'children': [
    //                 {
    //                     'id'   : '404',
    //                     'title': '404',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/errors/error-404'
    //                 },
    //                 {
    //                     'id'   : '500',
    //                     'title': '500',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/errors/error-500'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'      : 'invoice',
    //             'title'   : 'Invoice',
    //             'type'    : 'collapse',
    //             'icon'    : 'receipt',
    //             'children': [
    //                 {
    //                     'id'   : 'modern',
    //                     'title': 'Modern',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/invoices/modern'
    //                 },
    //                 {
    //                     'id'   : 'compact',
    //                     'title': 'Compact',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/invoices/compact'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'maintenance',
    //             'title': 'Maintenance',
    //             'type' : 'item',
    //             'icon' : 'build',
    //             'url'  : '/apps/pages/maintenance'
    //         },
    //         {
    //             'id'      : 'pricing',
    //             'title'   : 'Pricing',
    //             'type'    : 'collapse',
    //             'icon'    : 'attach_money',
    //             'children': [
    //                 {
    //                     'id'   : 'style-1',
    //                     'title': 'Style 1',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/pricing/style-1'
    //                 },
    //                 {
    //                     'id'   : 'style-2',
    //                     'title': 'Style 2',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/pricing/style-2'
    //                 },
    //                 {
    //                     'id'   : 'style-3',
    //                     'title': 'Style 3',
    //                     'type' : 'item',
    //                     'url'  : '/apps/pages/pricing/style-3'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'profile',
    //             'title': 'Profile',
    //             'type' : 'item',
    //             'icon' : 'person',
    //             'url'  : '/apps/pages/profile'
    //         },
    //         {
    //             'id'   : 'search',
    //             'title': 'Search',
    //             'type' : 'item',
    //             'icon' : 'search',
    //             'url'  : '/apps/pages/search'
    //         },
    //         {
    //             'title': 'Faq',
    //             'type' : 'item',
    //             'icon' : 'help',
    //             'url'  : '/apps/pages/faq'
    //         },
    //         {
    //             'title': 'Landding',
    //             'type' : 'item',
    //             'icon' : 'help',
    //             'url'  : '/apps/pages/landing'
    //         },
    //         {
    //             'title': 'Knowledge Base',
    //             'type' : 'item',
    //             'icon' : 'import_contacts',
    //             'url'  : '/apps/pages/knowledge-base'
    //         }
    //     ]
    // },
    // {
    //     'id'      : 'user-interface',
    //     'title'   : 'User Interface',
    //     'type'    : 'group',
    //     'icon'    : 'web',
    //     'children': [
    //         {
    //             'id'   : 'forms',
    //             'title': 'Forms',
    //             'type' : 'item',
    //             'icon' : 'web_asset',
    //             'url'  : '/apps/ui/forms'
    //         },
    //         {
    //             'id'   : 'icons',
    //             'title': 'Icons',
    //             'type' : 'item',
    //             'icon' : 'photo',
    //             'url'  : '/apps/ui/icons'
    //         },
    //         {
    //             'id'   : 'typography',
    //             'title': 'Typography',
    //             'type' : 'item',
    //             'icon' : 'text_fields',
    //             'url'  : '/apps/ui/typography'
    //         },
    //         {
    //             'id'   : 'helper-classes',
    //             'title': 'Helper Classes',
    //             'type' : 'item',
    //             'icon' : 'help',
    //             'url'  : '/apps/ui/helper-classes'
    //         },
    //         {
    //             'id'      : 'page-layouts',
    //             'title'   : 'Page Layouts',
    //             'type'    : 'collapse',
    //             'icon'    : 'view_quilt',
    //             'children': [
    //                 {
    //                     'id'      : 'carded',
    //                     'title'   : 'Carded',
    //                     'type'    : 'collapse',
    //                     'badge'   : {
    //                         'title': 10,
    //                         'bg'   : '#525e8a',
    //                         'fg'   : '#FFFFFF'
    //                     },
    //                     'children': [
    //                         {
    //                             'id'   : 'full-width',
    //                             'title': 'Full Width',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/full-width'
    //                         },
    //                         {
    //                             'id'   : 'full-width-2',
    //                             'title': 'Full Width 2',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/full-width-2'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav',
    //                             'title': 'Left Sidenav',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/left-sidenav'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav-tabbed',
    //                             'title': 'Left Sidenav Tabbed',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/left-sidenav-tabbed'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav-2',
    //                             'title': 'Left Sidenav 2',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/left-sidenav-2'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav-2-tabbed',
    //                             'title': 'Left Sidenav 2 Tabbed',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/left-sidenav-2-tabbed'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav',
    //                             'title': 'Right Sidenav',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/right-sidenav'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav-tabbed',
    //                             'title': 'Right Sidenav Tabbed',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/right-sidenav-tabbed'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav-2',
    //                             'title': 'Right Sidenav 2',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/right-sidenav-2'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav-2-tabbed',
    //                             'title': 'Right Sidenav 2 Tabbed',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/carded/right-sidenav-2-tabbed'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'simple',
    //                     'title'   : 'Simple',
    //                     'type'    : 'collapse',
    //                     'badge'   : {
    //                         'title': 8,
    //                         'bg'   : '#525e8a',
    //                         'fg'   : '#FFFFFF'
    //                     },
    //                     'children': [
    //                         {
    //                             'id'   : 'full-width',
    //                             'title': 'Full Width',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/full-width'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav',
    //                             'title': 'Left Sidenav',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/left-sidenav'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav-2',
    //                             'title': 'Left Sidenav 2',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/left-sidenav-2'
    //                         },
    //                         {
    //                             'id'   : 'left-sidenav-3',
    //                             'title': 'Left Sidenav 3',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/left-sidenav-3'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav',
    //                             'title': 'Right Sidenav',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/right-sidenav'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav-2',
    //                             'title': 'Right Sidenav 2',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/right-sidenav-2'
    //                         },
    //                         {
    //                             'id'   : 'right-sidenav-3',
    //                             'title': 'Right Sidenav 3',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/right-sidenav-3'
    //                         },
    //                         {
    //                             'id'   : 'tabbed',
    //                             'title': 'Tabbed',
    //                             'type' : 'item',
    //                             'url'  : '/apps/ui/page-layouts/simple/tabbed'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'   : 'blank',
    //                     'title': 'Blank',
    //                     'type' : 'item',
    //                     'url'  : '/apps/ui/page-layouts/blank'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'colors',
    //             'title': 'Colors',
    //             'type' : 'item',
    //             'icon' : 'color_lens',
    //             'url'  : '/apps/ui/colors'
    //         }
    //     ]
    // },
    // {
    //     'id'      : 'services',
    //     'title'   : 'Services',
    //     'type'    : 'group',
    //     'icon'    : 'settings',
    //     'children': [
    //         {
    //             'id'   : 'config',
    //             'title': 'Config',
    //             'type' : 'item',
    //             'icon' : 'settings',
    //             'url'  : '/apps/services/config'
    //         },
    //         {
    //             'id'   : 'splash-screen',
    //             'title': 'Splash Screen',
    //             'type' : 'item',
    //             'icon' : 'settings',
    //             'url'  : '/apps/services/splash-screen'
    //         }
    //     ]
    // },
    // {
    //     'id'      : 'components',
    //     'title'   : 'Components',
    //     'type'    : 'group',
    //     'icon'    : 'settings_input_component',
    //     'children': [
    //         {
    //             'id'      : 'angular-material-elements',
    //             'title'   : 'Angular Material Elements',
    //             'type'    : 'collapse',
    //             'icon'    : 'layers',
    //             'children': [
    //                 {
    //                     'id'      : 'form-controls',
    //                     'title'   : 'Form Controls',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'autocomplete',
    //                             'title': 'Autocomplete',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/autocomplete'
    //                         },
    //                         {
    //                             'id'   : 'checkbox',
    //                             'title': 'Checkbox',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/checkbox'
    //                         },
    //                         {
    //                             'id'   : 'datepicker',
    //                             'title': 'Datepicker',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/datepicker'
    //                         },
    //                         {
    //                             'id'   : 'form-field',
    //                             'title': 'Form field',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/form-field'
    //                         },
    //                         {
    //                             'id'   : 'input',
    //                             'title': 'Input',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/input'
    //                         },
    //                         {
    //                             'id'   : 'radio-button',
    //                             'title': 'Radio button',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/radio-button'
    //                         },
    //                         {
    //                             'id'   : 'select',
    //                             'title': 'Select',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/select'
    //                         },
    //                         {
    //                             'id'   : 'slider',
    //                             'title': 'Slider',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/slider'
    //                         },
    //                         {
    //                             'id'   : 'slide-toggle',
    //                             'title': 'Slide toggle',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/slide-toggle'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'navigation',
    //                     'title'   : 'Navigation',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'menu',
    //                             'title': 'Menu',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/menu'
    //                         },
    //                         {
    //                             'id'   : 'sidenav',
    //                             'title': 'Sidenav',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/sidenav'
    //                         },
    //                         {
    //                             'id'   : 'toolbar',
    //                             'title': 'Toolbar',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/toolbar'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'layout',
    //                     'title'   : 'Layout',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'list',
    //                             'title': 'List',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/list'
    //                         },
    //                         {
    //                             'id'   : 'grid-list',
    //                             'title': 'Grid list',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/grid-list'
    //                         },
    //                         {
    //                             'id'   : 'card',
    //                             'title': 'Card',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/card'
    //                         },
    //                         {
    //                             'id'   : 'divider',
    //                             'title': 'Divider',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/divider'
    //                         },
    //                         {
    //                             'id'   : 'stepper',
    //                             'title': 'Stepper',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/stepper'
    //                         },
    //                         {
    //                             'id'   : 'tabs',
    //                             'title': 'Tabs',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/tabs'
    //                         },
    //                         {
    //                             'id'   : 'elevation',
    //                             'title': 'Elevation',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/elevation'
    //                         },
    //                         {
    //                             'id'   : 'expansion-panel',
    //                             'title': 'Expansion Panel',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/expansion-panel'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'buttons-indicators',
    //                     'title'   : 'Buttons & Indicators',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'button',
    //                             'title': 'Button',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/button'
    //                         },
    //                         {
    //                             'id'   : 'button-toggle',
    //                             'title': 'Button toggle',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/button-toggle'
    //                         },
    //                         {
    //                             'id'   : 'chips',
    //                             'title': 'Chips',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/chips'
    //                         },
    //                         {
    //                             'id'   : 'icon',
    //                             'title': 'Icon',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/icon'
    //                         },
    //                         {
    //                             'id'   : 'progress-spinner',
    //                             'title': 'Progress spinner',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/progress-spinner'
    //                         },
    //                         {
    //                             'id'   : 'progress-bar',
    //                             'title': 'Progress bar',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/progress-bar'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'popups-modals',
    //                     'title'   : 'Popups & Modals',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'dialog',
    //                             'title': 'Dialog',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/dialog'
    //                         },
    //                         {
    //                             'id'   : 'tooltip',
    //                             'title': 'Tooltip',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/tooltip'
    //                         },
    //                         {
    //                             'id'   : 'snackbar',
    //                             'title': 'Snackbar',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/snackbar'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     'id'      : 'data-table',
    //                     'title'   : 'Data table',
    //                     'type'    : 'group',
    //                     'children': [
    //                         {
    //                             'id'   : 'table',
    //                             'title': 'Table',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/data-table'
    //                         },
    //                         {
    //                             'id'   : 'sort-header',
    //                             'title': 'Sort header',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/sort-header'
    //                         },
    //                         {
    //                             'id'   : 'paginator',
    //                             'title': 'Paginator',
    //                             'type' : 'item',
    //                             'url'  : '/apps/components/angular-material/paginator'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'cards',
    //             'title': 'Cards',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/cards'
    //         },
    //         {
    //             'id'   : 'countdown',
    //             'title': 'Countdown',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/countdown'
    //         },
    //         {
    //             'id'   : 'highlight',
    //             'title': 'Highlight',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/highlight'
    //         },
    //         {
    //             'id'   : 'material-color-picker',
    //             'title': 'Material Color Picker',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/material-color-picker'
    //         },
    //         {
    //             'id'   : 'multi-language',
    //             'title': 'Multi Language',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/multi-language'
    //         },
    //         {
    //             'id'   : 'navigation',
    //             'title': 'Navigation',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/navigation'
    //         },
    //         {
    //             'id'   : 'search-bar',
    //             'title': 'Search Bar',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/search-bar'
    //         },
    //         {
    //             'id'   : 'sidebar',
    //             'title': 'Sidebar',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/sidebar'
    //         },
    //         {
    //             'id'   : 'shortcuts',
    //             'title': 'Shortcuts',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/shortcuts'
    //         },
    //         {
    //             'id'   : 'widget',
    //             'title': 'Widget',
    //             'type' : 'item',
    //             'icon' : 'settings_input_component',
    //             'url'  : '/apps/components/widget'
    //         }
    //     ]
    // },
    // {
    //     'id'      : '3rd-party-components',
    //     'title'   : '3rd Party components',
    //     'type'    : 'group',
    //     'icon'    : 'settings_input_component',
    //     'children': [
    //         {
    //             'id'      : 'datatables',
    //             'title'   : 'Datatables',
    //             'type'    : 'collapse',
    //             'icon'    : 'border_all',
    //             'children': [
    //                 {
    //                     'id'   : 'ngxdatatable',
    //                     'title': 'ngx-datatable',
    //                     'type' : 'item',
    //                     'url'  : '/apps/components-third-party/datatables/ngx-datatable'
    //                 }
    //             ]
    //         },
    //         {
    //             'id'   : 'google-maps',
    //             'title': 'Google Maps',
    //             'type' : 'item',
    //             'icon' : 'place',
    //             'url'  : '/apps/components-third-party/google-maps'
    //         }
    //     ]
    // }
];
