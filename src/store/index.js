let store = {
    state: {
        bannerId: Number,
        bannerItemId:Number,
        categoryRootId:Number,
        subCategoryDetail:Object
    },
    setBannerId (newValue) {
        this.state.bannerId = newValue
    },
    setBannerItemId(newValue){
        this.state.bannerItemId = newValue
    },
    setCategoryRootId(newValue){
        this.state.categoryRootId = newValue
    },
    setSubCategoryDetail(newValue){
        this.state.subCategoryDetail = newValue
    }
}
export default store
