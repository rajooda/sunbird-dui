var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var EditText = require('@juspay/mystique-backend').androidViews.EditText;
var TextInputView = require('./core/TextInputView');
var Spinner = require('../Sunbird/core/Spinner');
var RadioButton = require('../Sunbird/core/RadioButton');
var CheckBox = require("@juspay/mystique-backend").androidViews.CheckBox;
var callbackMapper = require("@juspay/mystique-backend/").helpers.android.callbackMapper;
var Styles = require("../../res/Styles");
let IconStyle = Styles.Params.IconStyle;



class ExperiencePopUp extends View{
  constructor(props,childern){
    super(props,childern);
    this.setIds([
      "experiencePopUpParent",
      "joiningDateText",
      "joiningDateLayout",
      "closingDateText",
      "closingDateLayout",
      "scrollView",
      "saveButton",
      "saveButtonParent",
      "jobText",
      "positionText",
      "organizationText"

    ]);
    window.__ExperiencePopUp = this;
    this.props=props;
    this.subjects=[];
    this.jobName="";
    this.Organization="";
    this.Position="";
    this.joiningDate="";
    this.endDate="";

    this.jobProfile=[];

    this.prevData={};

 }

 show = () => {
   console.log(window.__ExperiencePopUp.data , "data Experience Popup");


   var cmd=this.set({
     id: this.idSet.saveButtonParent,
     background: window.__Colors.FADE_BLUE
   })
   Android.runInUI(cmd, 0)

   this.replaceChild(this.idSet.experiencePopUpParent,this.getUi().render(),0);
   this.setVisibility("visible");


  this.initializeData();
  this.populateData();


 }

 hide = () => {
   this.setVisibility("gone");
   JBridge.hideKeyboard();
 }

 setVisibility = (data) => {
   var cmd = this.set({
     id: this.idSet.experiencePopUpParent,
     visibility: data
   })

   Android.runInUI(cmd, 0)
 }


 initializeData = () =>{
   this.prevData.subjects=[];
   this.prevData.jobName="";
   this.prevData.Organization="";
   this.prevData.Position="";
   this.prevData.joiningDate="";
   this.prevData.endDate="";
   this.jobProfile = [];
   if(window.__ExperiencePopUp.data!=undefined)
   {
     this.prevData.jobName = window.__ExperiencePopUp.data.jobName;
     this.prevData.Organization = window.__ExperiencePopUp.data.orgName;
     this.prevData.Position = window.__ExperiencePopUp.data.role;
     this.prevData.joiningDate=window.__ExperiencePopUp.data.joiningDate;
     this.prevData.endDate=window.__ExperiencePopUp.data.endDate;
     this.prevData.subjects = window.__ExperiencePopUp.data.subject;

   }

 }

 populateData = () =>{
   this.subjects=this.prevData.subjects;
   this.jobName=this.prevData.jobName;
   this.Organization=this.prevData.Organization;
   this.Position=this.prevData.Position;
   this.joiningDate=this.prevData.joiningDate;
   this.endDate=this.prevData.endDate;

   console.log("populating");
   var cmd=this.set({
     id: this.idSet.jobText,
     text: this.prevData.jobName
   })

   cmd+=this.set({
     id: this.idSet.organizationText,
     text: this.prevData.Organization
   })

   cmd+=this.set({
     id: this.idSet.positionText,
     text: this.prevData.Position
   })

   cmd+=this.set({
     id: this.idSet.joiningDateText,
     text: this.prevData.joiningDate
   })

   cmd+=this.set({
     id: this.idSet.closingDateText,
     text: this.prevData.endDate
   })


   Android.runInUI(cmd, 0)
 }


 getToolbar  = () =>{
   return( <LinearLayout
           height="56"
           padding="0,0,0,2"
           gravity="center_vertical"
           background={window.__Colors.PRIMARY_BLACK_22}
           width="match_parent" >
               <LinearLayout
                 height="56"
                 padding="0,0,0,0"
                 gravity="center_vertical"
                 background={window.__Colors.WHITE}
                 width="match_parent" >

                   {this.getBack()}
                   {this.getTitle()}
               </LinearLayout>
           </LinearLayout>

     );
 }

 getBack = () => {
   return (
     <ImageView
     margin="0,0,10,0"
     style={IconStyle}
     height="48"
     width="48"
     onClick={this.hide}
     imageUrl = {"ic_action_arrow_left"}/>);
 }

 getTitle = () => {
   return (<LinearLayout
           height="match_parent"
           width="wrap_content"
           gravity="center_vertical">

             <TextView
                 height="match_parent"
                 width="match_parent"
                 gravity="center_vertical"
                 background="#ffffff"
                 text="Experience"
                 style={window.__TextStyle.textStyle.TOOLBAR.HEADING}/>


         </LinearLayout>);

 }

 getScrollView(){
   return(
     <LinearLayout
     height = "match_parent"
     width = "match_parent"
     orientation="vertical"
     background="#ffffff"
     id={this.idSet.scrollView}
     padding="15,15,15,15">


        <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vertical">
          <TextView
           height="wrap_content"
           width="wrap_content"
           text=" JOB NAME"
           textStyle={window.__TextStyle.textStyle.HINT.SEMI}
           margin="0,0,0,3"/>
           <EditText
           width="match_parent"
           height="wrap_content"
           id = {this.idSet.jobText}
           onChange={this.setJobName}
           style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>
           <LinearLayout
           height="34"
           width="1"/>
        </LinearLayout>

        <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vertical">
          <TextView
           height="wrap_content"
           width="wrap_content"
           text=" ORGANIZATION"
           textStyle={window.__TextStyle.textStyle.HINT.SEMI}
           margin="0,0,0,3"/>
           <EditText
           width="match_parent"
           height="wrap_content"
           onChange={this.setOrganization}
           id = {this.idSet.organizationText}
           style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>
           <LinearLayout
           height="34"
           width="1"/>
        </LinearLayout>

        <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vertical">
          <TextView
           height="wrap_content"
           width="wrap_content"
           text=" POSITION"
           textStyle={window.__TextStyle.textStyle.HINT.SEMI}
           margin="0,0,0,3"/>
           <EditText
           width="match_parent"
           height="wrap_content"
           onChange={this.setPosition}
           id = {this.idSet.positionText}
           style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>
           <LinearLayout
           height="34"
           width="1"/>
        </LinearLayout>

        <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="vertical">
          <TextView
           height="wrap_content"
           width="wrap_content"
           text="SUBJECTS"
           textStyle={window.__TextStyle.textStyle.HINT.SEMI}
           margin="0,0,0,3"/>
           <LinearLayout
           width="match_parent"
           height="wrap_content"
           stroke={"2,"+window.__Colors.PRIMARY_BLACK_66}
           padding="8,8,8,8"
           cornerRadius="4,4,4,4">
             {this.loadSpinner()}
           </LinearLayout>
           <LinearLayout
           height="34"
           width="1"/>
        </LinearLayout>

        <LinearLayout
        height="wrap_content"
        width="match_parent">
            <TextView
            height="wrap_content"
            width="wrap_content"
            margin="0,0,30,0"
            style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
            text="Is this your current job?"
            />

            <RadioButton
             height="wrap_content"
             width="wrap_content"
             gravity="center_vertical"
             items={[{name:"Yes",select:"0",icon:"ic_check_circle"},{name:"No",select:"0",icon:"ic_check_circle"}]}
             onClick={this.handleRadioButtonClick}/>


        </LinearLayout>

        <LinearLayout
        height="34"
        width="1"/>


        <LinearLayout
        height="wrap_content"
        width="match_parent"
        orientation="horizontal">

                <LinearLayout
                height="wrap_content"
                width="150"
                orientation="vertical"
                margin="0,0,20,0"
                id={this.idSet.joiningDateLayout}>
                  <TextView
                   height="wrap_content"
                   width="wrap_content"
                   text="FROM"
                   textStyle={window.__TextStyle.textStyle.HINT.SEMI}
                   margin="0,0,0,4"/>
                   <LinearLayout
                   width="match_parent"
                   height="wrap_content"
                   padding="4,18,12,12">
                       <ImageView
                       height="16"
                       width="16"
                       gravity="center"
                       margin="4,3,7,0"
                       imageUrl="ic_action_calendar_grey"
                       onClick={this.startCalendar}/>
                       <TextView
                       width="match_parent"
                       height="wrap_content"
                       id= {this.idSet.joiningDateText}
                       style={window.__TextStyle.textStyle.CARD.BODY.DARK.FADED}
                       text="Select Date"
                       onClick={this.startCalendar}/>

                   </LinearLayout>
                   <LinearLayout
                     width="match_parent"
                     height="1"
                     background={window.__Colors.PRIMARY_BLACK_66}/>
                </LinearLayout>

                <ViewWidget
                weight="1"
                height="0"
                width="0"/>

                <LinearLayout
                height="wrap_content"
                width="150"
                orientation="vertical"
                id={this.idSet.closingDateLayout}>
                  <TextView
                   height="wrap_content"
                   width="wrap_content"
                   text="TO"
                   textStyle={window.__TextStyle.textStyle.HINT.SEMI}
                   margin="0,0,0,4"/>
                   <LinearLayout
                   width="match_parent"
                   height="wrap_content"
                   padding="4,18,12,12">
                       <ImageView
                       height="16"
                       width="16"
                       gravity="center"
                       margin="4,3,7,0"
                       imageUrl="ic_action_calendar_grey"
                       onClick={this.endCalendar} />
                       <TextView
                       width="match_parent"
                       height="wrap_content"
                       id= {this.idSet.closingDateText}
                       onClick={this.endCalendar}
                       text="Select Date"
                       style={window.__TextStyle.textStyle.CARD.BODY.DARK.FADED}/>
                   </LinearLayout>
                   <LinearLayout
                     width="match_parent"
                     height="1"
                     background={window.__Colors.PRIMARY_BLACK_66}/>
                 </LinearLayout>

         </LinearLayout>

         <LinearLayout
         height="34"
         width="1"/>





      </LinearLayout>
   );
 }
getUi(){
  return(
    <LinearLayout
    height="match_parent"
    width="match_parent"
    root="true"
    orientation="vertical">
    {this.getToolbar()}

    <RelativeLayout
    height="match_parent"
    width="match_parent"
    background="#ffffff">
      <ScrollView
      height="479"
      width="match_parent">
           {this.getScrollView()}
      </ScrollView>

       <LinearLayout
         height="match_parent"
         width="match_parent"
         orientation="vertical" >
            <LinearLayout
            height="479"
            width="match_parent"
            />
            {this.getLineSeperator()}

            <LinearLayout
             height="match_parent"
             width="match_parent"
             padding="12,12,12,12"
             background="#ffffff"
             orientation="horizontal"
             id={this.idSet.saveButtonParent}>
                <LinearLayout
                cornerRadius="5,5,5,5"
                height="match_parent"
                width="match_parent"
                onClick={ this.sendJSON }>
                    <LinearLayout
                    height="match_parent"
                    width="match_parent"
                    gravity="center"
                    background={window.__Colors.FADE_BLUE}
                    id={this.idSet.saveButton}>
                        <TextView
                        text="Save"
                        gravity="center"
                        style={window.__TextStyle.textStyle.CARD.TITLE.LIGHT}/>
                    </LinearLayout>
                </LinearLayout>
              </LinearLayout>


            </LinearLayout>


    </RelativeLayout>
  </LinearLayout>
  )
}
 render(){
   this.layout=(
     <LinearLayout
     orientation="vertical"
     height="match_parent"
     width="match_parent"
     id={this.idSet.experiencePopUpParent}
     visibility="gone"
     gravity="center">

    {this.getUi()}
    </LinearLayout>

     );
        return this.layout.render();
     }

     loadSpinner = () => {
       this.spinnerArray = ["Select","Hindi","English","Math","Physics","Chemistry","Economics"];
       this.array="Select,Hindi,English,Math,Physics,Chemistry,Economics";
       return(<Spinner
               width="match_parent"
               height="34"
               style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
               margin="0,0,5,6"
               onItemClick = {this.handleSpinnerItemClick}
               values={this.array}
               />)
     }

     handleSpinnerItemClick = (...params) => {

       console.log("SPINNER CLICKED",params);
       console.log(this.spinnerArray[parseInt(params[2])] , "spinner val");
       if(parseInt(params[2])>0)
       this.subjects.push(this.spinnerArray[parseInt(params[2])]);
       if(this.checkCompleteStatus())
       {
         this.enableSaveButton();
       }
     }


     getLineSeperator = () => {
       return (<LinearLayout
               width="match_parent"
               height="2"
               margin="0,0,0,0"
               background={window.__Colors.PRIMARY_BLACK_22}/>)
     }


     startCalendar =() =>{
       this.showCalendar(1);

     }

     endCalendar =() =>{
       this.showCalendar(2);

     }

     showCalendar = (index) =>{
       var _this = this;
       var callback = callbackMapper.map(
         function (data){
             console.log(data[0],"calender");

              if(index==1){
                _this.joiningDate=data[0];

                 var cmd = _this.set({
                   id: _this.idSet.joiningDateText,
                   text: data[0],
                   style: window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK
                 });
                 Android.runInUI(cmd, 0);


            }
            else{
              _this.endDate=data[0];
              var cmd = _this.set({
                id: _this.idSet.closingDateText,
                text: data[0],
                style: window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK

              });
              Android.runInUI(cmd, 0);
            }

            if(_this.checkCompleteStatus())
            {
              _this.enableSaveButton();
            }else {
              _this.disableSaveButton();
            }
       });


       try{
       JBridge.showCalender(callback);
       }
       catch(err)
       {
         console.log(err , "date err");
       }
     }

     handleRadioButtonClick = () =>{

       if(window.__RadioButton!=undefined && window.__RadioButton.currentIndex==0)
       {
         var cmd = this.set({
           id: this.idSet.closingDateLayout,
           visibility: "gone"
         });
         Android.runInUI(cmd, 0);
       }
       else {
         var cmd = this.set({
           id: this.idSet.closingDateLayout,
           visibility: "visible"
         });
         Android.runInUI(cmd, 0);
       }
     }

     sendJSON = () => {

       if(window.__ExperiencePopUp.data==undefined){
          this.json ={
            "jobName":this.jobName,
            "orgName":this.Organization,
            "role":this.Position,
            "joiningDate":this.joiningDate,
            "endDate":this.endDate,
            "subject":this.subjects
          }

          this.jobProfile.push(this.json);
        }
        else{
          var json=  window.__ExperiencePopUp.data;
          json.jobName=this.jobName;
          json.orgName=this.Organization;
          json.role=this.Position;
          json.joiningDate=this.joiningDate;
          json.endDate=this.endDate;
          json.subject=this.subjects;
          json.userId= window.__userToken;
          json.address.userId= window.__userToken;
          this.jobProfile.push(json);
        }

          var url=window.__apiUrl + "/api/user/v1/update"
          console.log("whole url" , url);

          var body = {
                    "id":"unique API ID",
                    "ts":"response timestamp YYYY-MM-DDThh:mm:ss+/-nn:nn (timezone defaulted to +5.30)",
                      "params": {

                        },
                    "request":{
                      "userId":window.__userToken,
                      "jobProfile": this.jobProfile
                     }
                    }
          console.log("whole body",JSON.stringify(body) );

          console.log("apiToken", window.__apiToken);
          console.log("userToken", window.__userToken);

       JBridge.patchApi(url,JSON.stringify(body),window.__userToken,window.__apiToken);
          console.log("JSON SENT");
          this.hide();
     }
     checkCompleteStatus = () =>{
       if(this.jobName == this.prevData.jobName && this.Organization == this.prevData.Organization  && this.Position== this.prevData.Position && this.subjects==this.prevData.subjects && this.joiningDate == this.prevData.joiningDate )
       {
         return false;
       }
       return true;
     }

     doNothing = () =>{
       console.log("Nothing");
     }

     enableSaveButton = () =>{
      //  var cmd = this.set({
      //    id: this.idSet.saveButton,
      //    clickable: "true"
      //  })
       //
      //  var cmd=this.set({
      //    id: this.idSet.saveButtonParent,
      //    background: window.__Colors.LIGHT_BLUE,
      //    gravity: "center"
      //  })
       //
      //  Android.runInUI(cmd, 0)

       this.saveButton =(
         <LinearLayout
          height="match_parent"
          width="match_parent"
          padding="4,4,4,4"
          background="#ffffff"
          root="true"
          orientation="horizontal"
          id={this.idSet.saveButtonParent}>
             <LinearLayout
             cornerRadius="5,5,5,5"
             height="match_parent"
             width="match_parent"
             onClick={ this.sendJSON }
             clickable="true">
                 <LinearLayout
                 height="match_parent"
                 width="match_parent"
                 gravity="center"
                 background={window.__Colors.LIGHT_BLUE}
                 id={this.idSet.saveButton}>
                     <TextView
                     text="Save"
                     gravity="center"
                     style={window.__TextStyle.textStyle.CARD.TITLE.LIGHT}/>
                 </LinearLayout>
             </LinearLayout>
           </LinearLayout>)

       this.replaceChild(this.idSet.saveButtonParent, this.saveButton.render(), 0);


     }

     disableSaveButton = () =>{
      //  var cmd = this.set({
      //    id: this.idSet.saveButton,
      //    clickable: "false"
      //  })
       //
      //  cmd+=this.set({
      //    id: this.idSet.saveButtonParent,
      //    background: window.__Colors.FADE_BLUE,
      //    gravity: "center"
      //  })
       //
       //
      //  Android.runInUI(cmd, 0)

      this.saveButton =(
        <LinearLayout
         height="match_parent"
         width="match_parent"
         padding="4,4,4,4"
         background="#ffffff"
         orientation="horizontal"
         root ="true"
         id={this.idSet.saveButtonParent}>
            <LinearLayout
            cornerRadius="5,5,5,5"
            height="match_parent"
            width="match_parent"
            onClick={ this.sendJSON }
            clickable="false">
                <LinearLayout
                height="match_parent"
                width="match_parent"
                gravity="center"
                background={window.__Colors.LIGHT_BLUE_22}
                id={this.idSet.saveButton}>
                    <TextView
                    text="Save"
                    gravity="center"
                    style={window.__TextStyle.textStyle.CARD.TITLE.LIGHT}/>
                </LinearLayout>
            </LinearLayout>
          </LinearLayout>)

      this.replaceChild(this.idSet.saveButtonParent, this.saveButton.render(), 0);

     }

     setJobName = (data) => {
        this.jobName=data;
        if(this.checkCompleteStatus())
        {
          this.enableSaveButton();
        }
        else {
          this.disableSaveButton();
        }

     }

     setOrganization = (data) => {
       this.Organization=data;
       if(this.checkCompleteStatus())
       {
         this.enableSaveButton();
       }else {
         this.disableSaveButton();
       }
     }

     setPosition = (data) => {
       this.Position=data;
       if(this.checkCompleteStatus())
       {
         this.enableSaveButton();
       }
       else {
         this.disableSaveButton();
       }
     }

  }

module.exports = ExperiencePopUp;
