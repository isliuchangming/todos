// pages/todos/todos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:'',
    todos:[],
    leftCount:1,
    forceAll:false
  },
  save:function(){
    wx.setStorageSync('todos_storage', this.data.todos)
  },
  inputHandle:function(e){
    this.setData({
      searchContent: e.detail.value      
    });
  },
  addHandle:function(e){
    var todos=this.data.todos;
    if (!this.data.searchContent) return;
    todos.push({
      name: this.data.searchContent,
      completed:false
    });
    this.setData({
      todos:todos,
      searchContent: '',
      leftCount:this.data.leftCount+1
    });
    this.data.save();
  },
  toggleHandle:function(e){
    var item = this.data.todos[e.currentTarget.dataset.index];
    item.completed=!item.completed;
    this.data.leftCount+= item.completed?-1:1;
    this.setData({
      todos:this.data.todos,
      leftCount:this.data.leftCount
    });
    this.data.save();
  },
  removeHandle:function(e){
    var todos=this.data.todos;
    todos.splice(e.currentTarget.dataset.index,1);
    this.setData({
      todos:todos
    });
    this.data.save();
  },
  forceHandle:function(){
    this.data.forceAll=!this.data.forceAll;
    var todos=this.data.todos;
    for(var i=0;i<todos.length;i++){
      todos[i].completed=this.data.forceAll;
    }
    this.setData({
      todos:todos
    });
    this.data.save();
  },
  removeAllHandle:function(){
    var todos=[];
    var todo=this.data.todos;
    for(var i=0;i<todo.length;i++){
      if(!todo[i].completed){
        todos.push(todo[i]);
      }
    }
    this.setData({
      todos:todos
    });
    this.data.save();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      todos:wx.getStorageSync('todos_storage')||[]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})