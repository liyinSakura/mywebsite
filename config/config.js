export default {
    plugins: [
        ['umi-plugin-react',{
            antd: true,
            dva: true
        }]
    ],
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            {
                path: '/',
                component: 'Home',
            },
            {
                path: '/helloworld',
                component: 'Helloworld'
            },
            { path: 'puzzlecards', component: './Puzzlecards' },
            { path: 'list', component: '../page/list' },
            {
                path: '/dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }

                ]
            },{
                path: '/demo',
                routes: [
                    { path: '/demo/drawandguess', component: 'demo/Draw' },
                    { path: '/demo/colorofimg', component: 'demo/color' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }

                ]
            },
        ]
    }],
    proxy: {
        '/dev': {
            target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
        },
    },
};