

var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var ScrollView = require("@juspay/mystique-backend/src/android_views/ScrollView");
var SimpleToolbar = require('../Sunbird/core/SimpleToolbar');
var ChooseItem = require('../Sunbird/ChooseItem');
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var Space = require("@juspay/mystique-backend/src/android_views/Space");
var FeedComponent = require('./FeedComponent');
var CommunityEventsContainer = require('./CommunityEventsContainer');


var _this;
class CommunityDefault extends View {
  constructor(props, children) {
    super(props, children);
    this.setIds([
      'filterCount',
      'bodyContainer'
    ]);
    _this=this;

    this.feedData=[
      {
      	answerTitle : "Answer written in Chemistry",
      	question : "This is a 2-liner question in place. Can you tell which kind is it?",
      	answer : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."+
         "Lorem Ipsum has been the industry's "+
        "standard dummy text ever since the 1500s, when an unknown printer took a galley"+
        "I will write after this. This is the 2nd paragraph, which can lead to a long answer like it is… $#More#$",
      	imageUrl : "http://www.mens-hairstylists.com/wp-content/uploads/2015/10/Faux-Hawk-hairstyles-for-boys.jpg",
      	profileName : "Phani Bhushan Banerjee",
      	subject : "Level III Chemistry",
      	time : "23h ago",
      	votes : "163 votes"

      }]


  }



  getPinnedLabel(){
    return (<LinearLayout
             width="match_parent"
             height="33"
             gravity="center_vertical"
             orientation="horizontal">
                 <LinearLayout
                 width="match_parent"
                 height="1"
                 weight="1"
                 background={window.__Colors.PRIMARY_BLACK_22}/>

                 <LinearLayout
                 width="match_parent"
                 height="wrap_content"
                 gravity="center_vertical"
                 weight="1">

                     <ImageView
                     width="13"
                     height="13"
                     imageUrl="ic_action_pin"/>

                     <TextView
                     width="wrap_content"
                     height="wrap_content"
                     margin="5,0,0,0"
                     text= "Pinned by Admin"
                     style={window.__TextStyle.textStyle.HINT.REGULAR}/>

                 </LinearLayout>

                 <LinearLayout
                 width="match_parent"
                 height="1"
                 weight="1"
                 background={window.__Colors.PRIMARY_BLACK_22}/>

             </LinearLayout>
           )
  }


  handleAnswerClick = () =>{
    console.log("answer clicked")
  }

  handleVoteClick = () =>{
    console.log("vote clicked")
  }

  handleBookmarkClick = () =>{
    console.log("bookmark clicked")
  }

  getRestrictedBody(){
    return (<LinearLayout
              width="wrap_content"
              height="match_parent"
              gravity="center_horizontal"
              padding="0,100,0,0"
              orientation="vertical">
                <ImageView
                width="36"
                height="48"
                gravity="center_horizontal"
                imageUrl="ic_action_lock"/>

                <TextView
                width="wrap_content"
                height="wrap_content"
                gravity="center_horizontal"
                text="This is a restricted community."
                style={window.__TextStyle.textStyle.CARD.BODY.FADED}/>

                <TextView
                width="wrap_content"
                height="wrap_content"
                margin="30,20,30,0"
                gravity="center_horizontal"
                textFromHtml ="Send a <b>request to join</b> and the admin will allow you access the content in this community."
                style={window.__TextStyle.textStyle.CARD.BODY.FADED}/>
          </LinearLayout>)
  }

  getDefaultBody(){
    return (<LinearLayout
              width="wrap_content"
              height="match_parent"
              orientation="vertical">

                  {_this.getPinnedLabel()}

                  <FeedComponent
                  feedData = {_this.feedData}
                  voteClick = {_this.handleVoteClick}
                  answerClick={_this.handleAnswerClick}
                  bookmarkClick={_this.handleBookmarkClick}
                  />
                  <CommunityEventsContainer/>

          </LinearLayout>)
  }

  afterRender(){
    var layout;
      if(_this.props.isRestricted == "true"){
        layout = _this.getRestrictedBody();
      }
      else{
      layout = _this.getDefaultBody();
      }
      _this.replaceChild(_this.idSet.bodyContainer,layout.render(),0);

  }



  render() {
    this.layout = (
                <LinearLayout
                width="match_parent"
                height="wrap_content"
                gravity="center"
                afterRender={this.afterRender}
                orientation="vertical">

                <LinearLayout
                width="match_parent"
                height="wrap_content"
                gravity="center_horizontal"
                id={_this.idSet.bodyContainer}/>

              </LinearLayout>

    )
    return this.layout.render();
  }
}

module.exports = CommunityDefault;
