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
import HomeSpu from "./views/spu/HomeSpu";
import SpuList from "./views/spu/SpuList";
import EditSpu from "./views/spu/EditSpu";
import HomeSpecKey from "./views/spec-key/HomeSpecKey";
import SpecKeyList from "./views/spec-key/SpecKeyList";
import AddSpecKey from "./views/spec-key/AddSpecKey";
import EditSpecKey from "./views/spec-key/EditSpecKey";
import AddOrUpdateSpecValue from "./views/spec-key/AddOrUpdateSpecValue";
import EditOrAddSku from "./views/sku/EditOrAddSku";
import HomeSku from "./views/sku/HomeSku";
import SkuList from "./views/sku/SkuList";

const routers = [
    {
        path: '',
        name: 'home',
        component: Home,
        meta: {title: '首页'},
        children: [
            {
                path: '/bannerList',
                name: 'bannerList',
                meta: {title: 'Banner列表'},
                component: BannerList
            },
            {
                path: '/addBanner',
                name: 'addBanner',
                meta: {title: '添加Banner'},
                component: AddBanner
            },
            {
                path: '/bannerDetail',
                name: 'bannerDetail',
                meta: {title: 'Banner详情'},
                component: BannerDetail
            },
            {
                path: '/bannerItemDetail',
                name: 'bannerItemDetail',
                meta: {title: 'BannerItem详情'},
                component: BannerItemDetail
            },
            {
                path: '/categoryList',
                name: 'categoryList',
                meta: {title: '分类列表'},
                component: CategoryList
            },
            {
                path: '/addBannerItem',
                name: 'addBannerItem',
                meta: {title: '添加BannerItem'},
                component: AddBannerItem
            },
            {
                path: '/subCategoryList',
                name: 'subCategoryList',
                meta: {title: '子分类列表'},
                component: SubCategoryList
            },
            {
                path: '/subCategoryDetail',
                name: 'subCategoryDetail',
                meta: {title: '编辑分类列表'},
                component: SubCategoryDetail
            },
            {
                path: '/addCategory',
                name: 'addCategory',
                meta: {title: '添加子分类'},
                component: AddCategory
            },
            {
                path: '/homeGridCategory',
                name: 'homeGridCategory',
                meta: {title: '六宫格管理'},
                component: HomeGridCategory,
                children: [
                    {
                        path: '/gridCategoryList',
                        name: 'gridCategoryList',
                        meta: {title: '六宫格列表'},
                        component: GridCategoryList,
                    },
                    {
                        path: '/editGridCategory',
                        name: 'editGridCategory',
                        meta: {title: '更新六宫格'},
                        component: EditGridCategotry
                    },
                    {
                        path: '/addGridCategory',
                        name: 'addGridCategory',
                        meta: {title: '添加六宫格'},
                        component: EditGridCategotry
                    },
                ]
            },
            {
                path: '/homeSpu',
                name: 'homeSpu',
                meta: {title: 'SPU管理'},
                component: HomeSpu,
                children: [
                    {
                        path: '/spuList',
                        name: 'spuList',
                        meta: {title: 'SPU列表'},
                        component: SpuList
                    },
                    {
                        path: '/editSpu',
                        name: 'editSpu',
                        meta: {title: '更新SPU'},
                        component: EditSpu
                    },
                    {
                        path: '/addSpu',
                        name: 'addSpu',
                        meta: {title: '添加SPU'},
                        component: EditSpu
                    }
                ]
            },
            {
                path: '/homeSpec',
                name: 'homeSpec',
                meta: {title: '规格管理'},
                component: HomeSpecKey,
                children: [
                    {
                        path: '/addSpecKey',
                        name: 'addSpecKey',
                        meta: {title: '添加规格名'},
                        component: AddSpecKey
                    },
                    {
                        path: '/specKeyList',
                        name: 'specKeyList',
                        meta: {title: '规格名列表'},
                        component: SpecKeyList
                    },
                    {
                        path: '/editSpecKey',
                        name: 'editSpecKey',
                        meta: {title: '修改规格名'},
                        component: EditSpecKey
                    },
                    {
                        path: '/addSpecValue',
                        name: 'addSpecValue',
                        meta: {title: '添加规格值'},
                        component: AddOrUpdateSpecValue
                    },
                    {
                        path: '/updateSpecValue',
                        name: 'updateSpecValue',
                        meta: {title: '修改规格值'},
                        component: AddOrUpdateSpecValue
                    },
                ]
            },
            {
                path: '/homeSpu',
                name: 'homeSpu',
                meta: {title: 'SKU管理'},
                component: HomeSku,
                children:[
                    {
                        path: '/skuList',
                        name: 'skuList',
                        meta: {title: 'SKU列表'},
                        component: SkuList,
                    },
                    {
                        path: '/editSku',
                        name: 'editSku',
                        meta: {title: '更新Sku'},
                        component: EditOrAddSku,
                    }
                ]
            }
        ]
    },
];
export default routers;
