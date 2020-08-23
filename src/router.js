import Home from "./views/home/Home";
import BannerList from "./views/banner/BannerList";
import AddBanner from "./views/banner/AddBanner";
import CategoryList from "./views/category/CategoryList";
import BannerDetail from "./views/banner/BannerDetail";
import BannerItemDetail from "./views/banner/BannerItemDetail";
import AddBannerItem from "./views/banner/AddBannerItem";
import SubCategoryList from "./views/category/SubCategoryList";
import SubCategoryDetail from "./views/category/SubCategoryDetail";
import AddCategory from "./views/category/AddCategory";
import GridCategoryList from "./views/grid-category/GridCategoryList";
import EditGridCategotry from "./views/grid-category/EditGridCategotry";
import HomeGridCategory from "./views/grid-category/HomeGridCategory";
const routers = [
    {
        path: '/',
        name:'home',
        component: Home,
        meta:{title:'首页'},
        children:[
            {
                path: '/bannerList',
                name:'bannerList',
                meta:{title:'Banner列表'},
                component: BannerList
            },
            {
                path:'/addBanner',
                name:'addBanner',
                meta:{title:'添加Banner'},
                component:AddBanner
            },
            {
                path:'/bannerDetail',
                name:'bannerDetail',
                meta:{title:'Banner详情'},
                component:BannerDetail
            },
            {
                path:'/bannerItemDetail',
                name:'bannerItemDetail',
                meta:{title:'BannerItem详情'},
                component:BannerItemDetail
            },
            {
                path:'/categoryList',
                name:'categoryList',
                meta:{title:'分类列表'},
                component:CategoryList
            },
            {
                path:'/addBannerItem',
                name:'addBannerItem',
                meta:{title:'添加BannerItem'},
                component:AddBannerItem
            },
            {
                path:'/subCategoryList',
                name:'subCategoryList',
                meta:{title:'子分类列表'},
                component:SubCategoryList
            },
            {
                path:'/subCategoryDetail',
                name:'subCategoryDetail',
                meta:{title:'编辑分类列表'},
                component:SubCategoryDetail
            },
            {
                path:'/addCategory',
                name:'addCategory',
                meta:{title:'添加子分类'},
                component:AddCategory
            },
            {
                path:'/homeGridCategory',
                name:'homeGridCategory',
                meta:{title:'六宫格管理'},
                component:HomeGridCategory,
                children:[
                    {
                        path:'/gridCategoryList',
                        name:'gridCategoryList',
                        meta:{title:'六宫格列表'},
                        component:GridCategoryList,
                    },
                    {
                        path:'/editGridCategory',
                        name:'editGridCategory',
                        meta:{title:'更新六宫格'},
                        component:EditGridCategotry
                    },
                    {
                        path:'/addGridCategory',
                        name:'addGridCategory',
                        meta:{title:'添加六宫格'},
                        component:EditGridCategotry
                    },
                ]
            },
        ]
    },

];
export default routers;
