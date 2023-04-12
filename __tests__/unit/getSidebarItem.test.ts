import {getSidebarItem} from "../../src/shopware/utils/sidebar";

const baseSidebar = {
    '/one-level-no-items/': [{
        text: 'Level 1 no items',
        link: '/one-level-no-items/'
    }],
    '/one-level/': [{
        items: [],
        text: 'Level 1',
        link: '/one-level/'
    }],
    '/two-levels/': [{
        items: [
            {
                text: 'Level 2.1',
                link: '/two-levels/level-2-1',
            },
            {
                text: 'Level 2.2 root',
                link: '/two-levels/level-2-2/',
            },
            {
                text: 'Level 2.2',
                link: '/two-levels/level-2-2',
            },
            {
                text: 'Level 2.1 root',
                link: '/two-levels/level-2-1/',
            }
        ],
        text: 'Level 2',
        link: '/two-levels/'
    }],
    '/three-levels/': [{
        items: [
            {
                text: 'Level 3.1',
                link: '/three-levels/level-3-1',
                items: [
                    {
                        text: 'Level 3.1.1',
                        link: '/three-levels/level-3-1/level-3-1-1',
                    },
                    {
                        text: 'Level 3.1.2',
                        link: '/three-levels/level-3-1/level-3-1-2',
                    },
                    {
                        text: 'Level 3.1.3',
                        link: '/three-levels/level-3-1/level-3-1-3',
                    },
                    {
                        text: 'Level 3.1.1 root',
                        link: '/three-levels/level-3-1/level-3-1-1/',
                    },
                    {
                        text: 'Level 3.1.2 root',
                        link: '/three-levels/level-3-1/level-3-1-2/',
                    },
                    {
                        text: 'Level 3.1.3 root',
                        link: '/three-levels/level-3-1/level-3-1-3/',
                    }
                ]
            },
            {
                text: 'Level 3.2 root',
                link: '/three-levels/level-3-2/',
                items: [
                    {
                        text: 'Level 3.2.1',
                        link: '/three-levels/level-3-2/level-3-2-1',
                    },
                    {
                        text: 'Level 3.2.2',
                        link: '/three-levels/level-3-2/level-3-2-2',
                    },
                    {
                        text: 'Level 3.2.3',
                        link: '/three-levels/level-3-2/level-3-2-3',
                    },
                    {
                        text: 'Level 3.2.1 root',
                        link: '/three-levels/level-3-2/level-3-2-1/',
                    },
                    {
                        text: 'Level 3.2.2 root',
                        link: '/three-levels/level-3-2/level-3-2-2/',
                    },
                    {
                        text: 'Level 3.2.3 root',
                        link: '/three-levels/level-3-2/level-3-2-3/',
                    },
                    {
                        text: 'Level 3.2.4 root',
                        link: '/three-levels/level-3-2/level-3-2-4/',
                    },
                    {
                        text: 'Level 3.2.4',
                        link: '/three-levels/level-3-2/level-3-2-4',
                    },
                    // mixed root
                ]
            },
            {
                text: 'Level 3.3',
                link: '/three-levels/level-3-3',
            },
            {
                text: 'Level 3.3 root',
                link: '/three-levels/level-3-3/',
            }
        ],
        text: 'Level 3',
        link: '/three-levels/'
    }]
};

const rootRoute = {
    path: '/',
    data: {},
    component: ''
};

describe('render correct content', async () => {
    test('empty sidebar', async () => {
        const link = getSidebarItem({}, rootRoute, {}, 'title');
        expect(link).to.be.undefined;
    })

    test('non existent', async () => {
        const link = getSidebarItem(baseSidebar, {
            path: '/',
            data: {},
            component: ''
        }, {page: '/non-existent'}, 'title');
        expect(link).to.be.null;
    })

    test('one-level-no-items', async () => {
        const pages = [
            '/one-level-no-items/',
            //'/one-level-no-items'
        ];
        for (const page of pages) {
            const link = getSidebarItem(baseSidebar, rootRoute, {page}, 'title');
            expect(link).to.equal('Level 1 no items');
        }
    })

    test('two levels', async () => {
        let link = getSidebarItem(baseSidebar, rootRoute, {page: '/two-levels/'}, 'title');
        expect(link).to.equal('Level 2');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/two-levels/level-2-1'}, 'title');
        expect(link).to.equal('Level 2.1');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/two-levels/level-2-1/'}, 'title');
        expect(link).to.equal('Level 2.1 root');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/two-levels/level-2-2'}, 'title');
        expect(link).to.equal('Level 2.2');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/two-levels/level-2-2/'}, 'title');
        expect(link).to.equal('Level 2.2 root');
    })

    test('three levels', async () => {
        let link;
        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/'}, 'title');
        expect(link).to.equal('Level 3');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-2/'}, 'title');
        expect(link).to.equal('Level 3.2 root');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-3'}, 'title');
        expect(link).to.equal('Level 3.3');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-2/level-3-2-3'}, 'title');
        expect(link).to.equal('Level 3.2.3');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-2/level-3-2-3/'}, 'title');
        expect(link).to.equal('Level 3.2.3 root');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-2/level-3-2-4'}, 'title');
        expect(link).to.equal('Level 3.2.4');

        link = getSidebarItem(baseSidebar, rootRoute, {page: '/three-levels/level-3-2/level-3-2-4/'}, 'title');
        expect(link).to.equal('Level 3.2.4 root');
    })
})