<template>
  <div class="layout">
    <Layout class="h-1">
      <scroll :height="scrollerHeight">
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"
               :style="{height:scrollerHeight}" style="{padding-top: 0;padding-bottom:0}">
          <Menu theme="dark" width="auto" :class="menuitemClasses" @on-select="onClickBannerList">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper"/>
                Banner管理
              </template>
              <menu-item name="Banner列表">
                <Icon type="ios-link"/>
                Banner列表
              </menu-item>
              <menu-item name="添加Banner">
                <Icon type="md-leaf"/>
                添加Banner
              </menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-paper"/>
                分类管理
              </template>
              <menu-item name="分类列表">
                <Icon type="ios-link"/>
                分类列表
              </menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-paper"/>
                六宫格管理
              </template>
              <menu-item name="六宫格列表">
                <Icon type="ios-link"/>
                六宫格列表
              </menu-item>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-paper"/>
                规格管理
              </template>
              <menu-item name="添加规格名">
                <Icon type="ios-link"/>
                添加规格名
              </menu-item>
              <menu-item name="规格名列表">
                <Icon type="ios-link"/>
                规格名列表
              </menu-item>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-paper"/>
                SPU管理
              </template>
              <menu-item name="SPU列表">
                <Icon type="ios-link"/>
                SPU列表
              </menu-item>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-paper"/>
                SKU管理
              </template>
              <menu-item name="SKU列表">
                <Icon type="ios-link"/>
                SKU列表
              </menu-item>
            </Submenu>
          </Menu>
        </Sider>
      </scroll>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <div class="layout-header-bar-on">
            <div class="headOnComponet">
              <Icon @click.native="collapsedSider" :class="rotateIcon" class="i-icon" type="md-menu"
                    size="24">
              </Icon>
              <Breadcrumb>
                                <span v-for="(item,index) in breadList" :key="index">
                                  <BreadcrumbItem>{{item.meta.title}}</BreadcrumbItem>
                                </span>
              </Breadcrumb>
            </div>
          </div>
        </Header>
        <content class="c-1">
          <template>
            <Tabs type="card" @on-click="onChangeTabs" :value="tabName"
                  @on-tab-remove="handleTabRemove">
              <TabPane v-for="tab in tabs" :key="tab" :label='tab' type="card" closable :name="tab">
              </TabPane>
            </Tabs>
          </template>
          <Scroll :height="contentScollerHeight">
            <router-view></router-view>
          </Scroll>
        </content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
    import store from "../../store";

    export default {
        name: "Home",
        components: {},
        data() {
            return {
                isCollapsed: false,
                menuItemName: String,
                names: Array,
                breadList: Array,
                headTagChecked: Boolean,
                sharedState: store.state,
                contentScollerHeight: (window.innerHeight - 140),
                hHeight: window.outerHeight,
                tabs: [],
                tabName: '',
                mainRouter: ['六宫格列表', '添加规格名', '规格名列表', 'SPU列表']
            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            scrollerHeight() {
                return (document.documentElement.clientHeight || document.body.clientHeight) - 21 + 'px'
            },
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            onClickBannerList(name) {
                console.log(name)
                this.initTabs(name);
                switch (name) {
                    case 'Banner列表':
                        this.$router.push('/bannerList');
                        break
                    case '添加Banner':
                        this.$router.push('/addBanner');
                        break
                    case '分类列表':
                        this.$router.push('/categoryList')
                        break
                    case 'Banner详情':
                        this.$router.push({path: '/bannerDetail', query: {id: this.sharedState.bannerId}})
                        break
                    case 'BannerItem详情':
                        this.$router.push({path: '/bannerItemDetail', query: {id: this.sharedState.bannerItemId}})
                        break
                    case '添加BannerItem':
                        this.$router.push('/addBannerItem')
                        break
                    case '子分类列表':
                        this.$router.push({path: '/subCategoryList', query: {id: this.sharedState.categoryRootId}})
                        break
                    case '编辑分类列表':
                        this.$router.push({
                            path: '/subCategoryDetail',
                            query: {data: this.sharedState.subCategoryDetail}
                        })
                        break
                    case '添加子分类':
                        this.$router.push('/addSubCategory')
                        break
                    case '六宫格列表':
                        this.$router.push('/gridCategoryList')
                        break
                    case '添加规格名':
                        this.$router.push('/addSpecKey')
                        break
                    case '规格名列表':
                        this.$router.push('/specKeyList')
                        break
                    case 'SPU列表':
                        this.$router.push('/spuList')
                        break
                    case 'SKU列表':
                        this.$router.push('/skuList')
                        break
                    default:
                        this.$router.push('/')

                }
            },
            isHome(route) {
                return route.name === "home";
            },
            getBreadcrumb() {
                let matched = this.$route.matched;
                if (!this.isHome(matched[0])) {
                    matched = [{path: "/home", meta: {title: "首页"}}].concat(matched);
                }
                this.breadList = matched;
                if (!this.mainRouter.includes(matched[matched.length - 1].meta.title)) {
                    return
                }
                this.initTabs(matched[matched.length - 1].meta.title)
            },
            initTabs(name) {
                if (this.tabs.indexOf(name) == '-1') {
                    this.tabs.push(name)
                    this.tabName = name
                } else {
                    this.tabName = name
                }
            },
            onChangeTabs(name) {
                console.log(name)
                this.onClickBannerList(name)
            },
            handleTabRemove(name) {
                if (this.tabs.length == 1) {
                    this.tabName = ''
                    this.tabs = []
                    this.$router.push('/')
                    return
                }
                this.tabs.splice(this.tabs.indexOf(name), 1);
                //当选中的tab与要删除的tab时,切换到第一个tab
                if (this.tabName == name) {
                    this.onClickBannerList(this.tabs[0])
                }

                console.log('--------handleTabRemove--end---')
            }
        },
        created() {
            this.getBreadcrumb();
        }
    }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }

  .layout-header-bar {
    display: flex;
    flex-direction: column;
    height: auto;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-header-bar-on {
    display: flex;
    flex-direction: column;
    /*height: 96px;*/
  }

  .layout-header-bar-down {
    display: flex;
    flex-direction: row;
  }

  .h-1 {
    display: flex;
    flex-direction: row;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .i-icon {
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .headTags {
    display: flex;
    flex-direction: row;
  }

  .headOnComponet {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .c-1 {
    padding: 10px 10px 10px 10px;
  }

  .top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
