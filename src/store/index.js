let store = {
    state: {
        bannerId: Number,
        bannerItemId:Number,
        categoryRootId:Number
    },
    setBannerId (newValue) {
        this.state.bannerId = newValue
    },
    setBannerItemId(newValue){
        this.state.bannerItemId = newValue
    },
    setCategoryRootId(newValue){
        this.state.categoryRootId = newValue
    }
}
export default store
