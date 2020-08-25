let store = {
    state: {
        bannerId: Number,
        bannerItemId:Number,
        categoryRootId:Number,
        subCategoryDetail:Object,
        gridCategoryDetail:Object,
        spuDetail:Object,
        specKeyDetail:Object
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
    },
    setTempGridCategoryData(newValue){
        this.state.gridCategoryDetail = newValue
    },
    setSpuDetail(newValue) {
        this.state.spuDetail = newValue
    },
    setSpecKeyDetail(newValue){
        this.state.specKeyDetail = newValue
    }
}
export default store
