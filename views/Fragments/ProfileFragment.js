var dom = require("@juspay/mystique-backend/src/doms/android");
var Connector = require("@juspay/mystique-backend/src/connectors/screen_connector");
var LinearLayout = require("@juspay/mystique-backend/src/android_views/LinearLayout");
var RelativeLayout = require("@juspay/mystique-backend/src/android_views/RelativeLayout");
var View = require("@juspay/mystique-backend/src/base_views/AndroidBaseView");
var HorizontalScrollView = require("@juspay/mystique-backend/src/android_views/HorizontalScrollView");
var ViewWidget = require("@juspay/mystique-backend/src/android_views/ViewWidget");
var TextView = require("@juspay/mystique-backend/src/android_views/TextView");
var ImageView = require("@juspay/mystique-backend/src/android_views/ImageView");
var ScrollView = require("@juspay/mystique-backend/src/android_views/ScrollView");
var Space = require("@juspay/mystique-backend/src/android_views/Space");
var callbackMapper = require("@juspay/mystique-backend/src/helpers/android/callbackMapper");
var SimpleToolbar = require('../../components/Sunbird/core/SimpleToolbar');
var ProfileHeader = require('../../components/Sunbird/ProfileHeader');
var ComingSoonComponent = require('../../components/Sunbird/ComingSoonComponent');
var PersonalDetails = require('../../components/Sunbird/PersonalDetails');
var ProfileExperiences = require('../../components/Sunbird/ProfileExperiences');
var ProfileSkillTags = require('../../components/Sunbird/ProfileSkillTags');
var ProfileAccomplishments = require('../../components/Sunbird/ProfileAccomplishments');
var ProfileCreations = require('../../components/Sunbird/ProfileCreations');
var ProfileBadges = require('../../components/Sunbird/ProfileBadges');
var ProfileProgress = require('../../components/Sunbird/ProfileProgress');
var ProfileAdditionalInfo = require('../../components/Sunbird/ProfileAdditionalInfo');
var ProfilAffiliations = require('../../components/Sunbird/ProfileAffiliations');
var CropParagraph = require('../../components/Sunbird/CropParagraph');
var utils = require('../../utils/GenericFunctions');
const Str = require("../../res/Strings") ;


var _this;
class ProfileFragment extends View {
  constructor(props, children) {
    super(props, children);
    console.log(props, "this.props");

    this.props.appendText = this.props.appendText || "";
    this.setIds([

    ]);

    _this = this;
    this.isEditable = this.props.editable;
    this.menuData = {
      url: [
        { imageUrl: "ic_action_search" },
        { imageUrl: "ic_action_notification"},
        { imageUrl: "ic_action_overflow" }
      ]
    }
    // this.popupMenu=window.__S.CHANGE_LANGUAGE + "," + window.__S.LOGOUT;
    this.popupMenu=window.__S.LOGOUT;
    window.__LanguagePopup.props.buttonClick = this.handleChangeLang;

    this.handleResponse();
    JBridge.logTabScreenEvent("PROFILE");
  }


  handleChangeLang = (lang) => {
    window.__LoaderDialog.show()
     window.setLanguage(lang);
     window.__S = Str.strings();
     window.__LanguagePopup.hide();
     window.__renderBNavBar(4);
     window.__reRender();
  }

  logout = () =>{
    JBridge.logLogoutInitiate(window.__userToken);
    window.__Logout();
  }

  handleResponse = () => {
    console.log("this.props.response", this.props.response);
    if (this.props.response) {
      if (!this.props.response.sendBack){
        var whatToSend = {
          user_token: window.__userToken,
          api_token: window.__apiToken,
          sendBack : JSON.stringify(this.props.response),
          filters: JSON.stringify({"filters" : {
                     "createdBy": window.__userToken,
                     "status": ["Live"],
                     "contentType": ["Collection", "Story", "Worksheet", "TextBook", "Course", "LessonPlan"]
                 }
               })
         }
        var event = { tag: "API_CreatedBy", contents: whatToSend}
        if (JBridge.isNetworkAvailable()){
          window.__runDuiCallback(event);
        } else {
          this.props.response.sendBack = JSON.stringify(this.props.response);
        }
      }
      var profileData = JSON.parse(this.props.response.sendBack)
      this.details = profileData.result.response;
      this.description = this.details.profileSummary ? this.details.profileSummary : ""
      this.createdBy = this.props.response.result;
      this.jobProfile = this.details.jobProfile;
      this.education = this.details.education;
      this.address = this.details.address;
      console.log("this.createdBy", this.createdBy);
    } else {
      this.details = {};
      this.description = "";
      this.createdBy = {};
    }
  }

  getLineSeperator() {
    return (<LinearLayout
            width="match_parent"
            height="1"
            margin="0,16,0,16"
            background={window.__Colors.PRIMARY_BLACK_22}/>)
  }

  overFlowCallback = (params) => {
    if(params == 1){
      window.__LanguagePopup.show();
    } else if (params == 0) {
      this.logout();
    }
  }


  afterRender() {
    window.__ContentLoadingComponent.hideLoader();
    window.__LoaderDialog.hide();
  }

  getDescription = () => {
    console.log("this.details", this.details.profileSummary);
    if(this.details.profileSummary){
      console.log("inside getDescription");
      return(
        <LinearLayout
          orientation = "vertical"
          height = "wrap_content"
          margin="0,0,0,0"
          width = "match_parent">

          {this.getLineSeperator()}
          {
          // <TextView
          //   text = "Description"
          //   style={window.__TextStyle.textStyle.CARD.TITLE.DARK}/>
          }
            <CropParagraph
              height = "wrap_content"
              margin = "0,0,0,16"
              width = "match_parent"
              headText = { window.__S.DESCRIPTION }
              contentText = { this.details.profileSummary }/>

        </LinearLayout>
      )
    } else {
      return (
        <LinearLayout
          orientation = "vertical"
          height = "wrap_content"
          width = "match_parent">
        </LinearLayout>
      )
    }

  }

  setPermissions = () => {

   var callback = callbackMapper.map(function(data) {

      if (data == "android.permission.WRITE_EXTERNAL_STORAGE") {
        JBridge.setKey("isPermissionSetWriteExternalStorage", "true");
      }
      if(data == "DeniedPermanently"){
        console.log("DENIED DeniedPermanently");
        window.__PermissionDeniedDialog.show("ic_warning_grey",window.__S.STORAGE);
      }

    });

    JBridge.setPermissions(callback,"android.permission.WRITE_EXTERNAL_STORAGE");

  }

  handleMenuClick = (url) => {
    if (url == "ic_action_notification") {
      window.__Snackbar.show(window.__S.COMMING_SOON);
    } else if (url == "ic_action_search") {
      var searchDetails = { filterDetails: "", searchType: "Profile" }
      var whatToSend = { filterDetails: JSON.stringify(searchDetails) }
      var event = { tag: "OPEN_CommProfSearchActivity", contents: whatToSend}
      window.__runDuiCallback(event);
    }
  }

  handleCreatedCardClick = (item) => {
    item.isCreator = true;
    var itemDetails = JSON.stringify(item);
    if(item.contentType.toLowerCase() == "collection" || item.contentType.toLowerCase() == "textbook"){
      if (JBridge.getKey("isPermissionSetWriteExternalStorage", "false") == "true") {
        var whatToSend={course:itemDetails};
        var event={tag:"OPEN_EnrolledCourseActivity",contents:whatToSend}
        window.__runDuiCallback(event);
      }else{
        this.setPermissions();
      }
    }else if(item.contentType.toLowerCase() == "course"){
      if (JBridge.getKey("isPermissionSetWriteExternalStorage", "false") == "true") {
        var whatToSend={course:itemDetails};
        var event={tag:"OPEN_CourseInfoActivity",contents:whatToSend}
        window.__runDuiCallback(event);
      }else{
        this.setPermissions();
      }
    }
     else {
      var headFooterTitle = item.contentType + (item.hasOwnProperty("size") ? " ["+utils.formatBytes(item.size)+"]" : "");
      var resDetails = {};
      resDetails['imageUrl'] = item.appIcon;
      resDetails['title'] = item.name;
      resDetails['description'] = item.description;
      resDetails['headFooterTitle'] = headFooterTitle;
      resDetails['identifier'] = item.identifier;
      resDetails['screenshots'] = item.screenshots || [] ;
      resDetails['content'] = item;

      var whatToSend = {resourceDetails:JSON.stringify(resDetails)}
      var event= {tag:"OPEN_ResourceDetailActivity",contents:whatToSend}
      window.__runDuiCallback(event);
    }
  }

  render() {
    var popUpdata = {
      negButtonText : "Cancel",
      posButtonText : "Change"
    }
    this.layout = (

  <RelativeLayout
     height="match_parent"
     width="match_parent">
      <LinearLayout
        root="true"
        orientation="vertical"
        width="match_parent"
        afterRender={this.afterRender}
        height="match_parent">


          <SimpleToolbar
            title={window.__S.PROFILE_LW}
            width="match_parent"
            menuData={this.menuData}
            popupMenu={this.popupMenu}
            overFlowCallback = {this.overFlowCallback}
            onMenuItemClick={this.handleMenuClick}
            showMenu="true"
            hideBack="true"
            invert="true"/>


          <ScrollView
            height="0"
            weight="1"
            width="match_parent">

              <LinearLayout
                height="match_parent"
                width="match_parent"
                padding={"0,0,0,50"}
                padding="16,16,16,24"
                orientation="vertical">

                <ProfileHeader
                  data={this.details}
                  textStyle = {window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>

                {this.getDescription()}

                <ProfileExperiences
                  editable = {this.isEditable}
                  data = {this.education}
                  popUpType={window.__PROFILE_POP_UP_TYPE.EDUCATION}
                  heading = {window.__S.TITLE_EDUCATION} />

                <ProfileExperiences
                  editable = {this.isEditable}
                  data = {this.jobProfile}
                  popUpType={window.__PROFILE_POP_UP_TYPE.EXPERIENCE}
                  heading = {window.__S.TITLE_EXPERIENCES} />

                <ProfileExperiences
                  editable = {this.isEditable}
                  data = {this.address}
                  popUpType={window.__PROFILE_POP_UP_TYPE.ADDRESS}
                  heading = {window.__S.TITLE_ADDRESS} />

                <ProfileCreations
                  data = {this.createdBy}
                  editable = {this.editable}
                  onCardClick = {this.handleCreatedCardClick}/>


                <ProfileAdditionalInfo
                  data={this.details}
                  editable = {this.isEditable}/>

              </LinearLayout>

         </ScrollView>

        </LinearLayout>


   </RelativeLayout>


    )

    return this.layout.render();
  }
}

module.exports = ProfileFragment;
