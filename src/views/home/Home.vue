<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"
             :style="{height:scrollerHeight}">
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
        </Menu>

      </Sider>
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
            <div class="layout-header-bar-down" style="{height: 28px}" v-if="headTags.length!==0">
              <div v-for="(item,index) in headTags" :key="index" class="headTags">
                <Tag :name="item.name" closable
                     size='medium' color="success" checkable @on-close="onCloseHeardTag"
                     @on-change="onChangeHeadTag" :checked="item.checked">
                  {{item.name}}
                </Tag>
              </div>
            </div>
          </div>

        </Header>
        <content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
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
                headTags: [],
                headTagChecked: Boolean,
                sharedState: store.state,
                contentScollerHeight: (window.innerHeight - 140)
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
                  return (window.innerHeight - 1) + 'px'
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
                        console.log("-----home-------")
                        console.log(this.sharedState.categoryRootId)
                        this.$router.push({path: '/subCategoryList', query: {id: this.sharedState.categoryRootId}})
                        break
                }
            },
            isHome(route) {
                return route.name === "home";
            },
            getBreadcrumb() {
                let concat = false;
                let matched = this.$route.matched;
                if (!this.isHome(matched[0])) {
                    matched = [{path: "/home", meta: {title: "首页"}}].concat(matched);
                }
                this.breadList = matched;
                for (let i = 0; i < this.headTags.length; i++) {
                    this.headTags[i].checked = false;
                    let tem = this.headTags[i].name === (matched[matched.length - 1].meta.title);
                    if (tem) {
                        concat = true
                        this.headTags[i].checked = true
                    }

                }
                if (!concat) {
                    let tagObj = {
                        name: String,
                        checked: Boolean
                    }
                    if (matched.length - 1 != 0) {
                        tagObj.name = matched[matched.length - 1].meta.title;
                        tagObj.checked = true;
                        this.headTags.push(tagObj);
                    }

                }
            },
            onCloseHeardTag(event, name) {
                console.log(this.headTags)
                let index=0 ;
                for (let i=0;i<this.headTags.length;i++){
                    if(this.headTags[i].name == name){
                        index = i
                    }
                }
                console.log(index)
                this.headTags.splice(index, 1);
                if (this.headTags.length !== 0) {
                    this.headTags[this.headTags.length - 1].checked = true
                }
                this.onChangeHeadTag(true,this.headTags[this.headTags.length - 1].name)

            },
            onChangeHeadTag(checked, name) {
                console.log(name)
                console.log(checked)
                this.onClickBannerList(name)
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

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
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
</style>
