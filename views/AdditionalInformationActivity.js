var dom = require("@juspay/mystique-backend").doms.android;
var Connector = require("@juspay/mystique-backend").connector;
var LinearLayout = require("@juspay/mystique-backend").androidViews.LinearLayout;
var RelativeLayout = require("@juspay/mystique-backend").androidViews.RelativeLayout;
var View = require("@juspay/mystique-backend").baseViews.AndroidBaseView;
var HorizontalScrollView = require("@juspay/mystique-backend").androidViews.HorizontalScrollView;
var ViewWidget = require("@juspay/mystique-backend").androidViews.ViewWidget;
var TextView = require("@juspay/mystique-backend").androidViews.TextView;
var EditText = require('@juspay/mystique-backend').androidViews.EditText;
var ImageView = require("@juspay/mystique-backend").androidViews.ImageView;
var ScrollView = require("@juspay/mystique-backend").androidViews.ScrollView;
var Space = require('@juspay/mystique-backend').androidViews.Space;
var callbackMapper = require("@juspay/mystique-backend/").helpers.android.callbackMapper;

var TextInputView = require('../components/Sunbird/core/TextInputView');
var Spinner = require('../components/Sunbird/core/Spinner');
var SimpleToolbar = require('../components/Sunbird/core/SimpleToolbar');
var ProfileHeader = require('../components/Sunbird/ProfileHeader');
var ComingSoonComponent = require('../components/Sunbird/ComingSoonComponent');
var PersonalDetails = require('../components/Sunbird/PersonalDetails');
var ProfileExperiences = require('../components/Sunbird/ProfileExperiences');
var ProfileSkillTags = require('../components/Sunbird/ProfileSkillTags');
var ProfileAccomplishments = require('../components/Sunbird/ProfileAccomplishments');
var ProfileCreations = require('../components/Sunbird/ProfileCreations');
var ProfileBadges = require('../components/Sunbird/ProfileBadges');
var ProfileAdditionalInfo = require('../components/Sunbird/ProfileAdditionalInfo');
var Styles = require("../res/Styles");
let IconStyle = Styles.Params.IconStyle;

class AdditionalInformationActivity extends View{

  constructor(props, children,state) {
    super(props, children,state);
    this.setIds([
      "predictionLanguageLayout",
      "LanguageLayout",
      "HobbiesLayout",
      "predictionHobbiesLayout",
      "languageSpinner",
      "genderSpinner",
      "saveButton",
      "saveButtonContainer",
      "emailText",
      "phoneText",
      "locationText",
      "dobText",
      "gradeSpinnerContainer",
      "gradeContainer",
      "nameText",
      "adharText"
    ]);
    this.shouldCacheScreen = false;
    this.state=state;
    this.screenName="AdditionalInformationActivity"
    this.languageDictionary=["english","hindi","marathi","telugu","kannada","punjabi","bhojpuri","bengali"];
    this.selectedLanguages=[];
    this.hobbieDictionary=["cycling","swimming","singing","travelling","playing","dancing"];
    this.selectedHobbies=[];
    this.email = null;
    this.mobile = null;
    this.location = null;
    this.grade=null;
    this.name= null;
    this.language=null;
    this.adhar=null;
    this.gender=null;
    this.dob=null;
    this.responseCame=false;

    this.genderArray= "Select,Male,Female,Transgender";
    this.GenderArray=["Select","Male","Female","Transgender"];
    this.languageArray= "Select,Bengali,English,Gujarati,Hindi,Kannada,Marathi,Punjabi,Tamil";
    this.LanguageArray=["Select","Bengali","English","Gujarati","Hindi","Kannada","Marathi","Punjabi","Tamil"];
    this.gradeArray= "Select,Kindergarten,Grade 1,Grade 2,Grade 3,Grade 4,Grade 5,Grade 6,Grade 7";
    this.GradeArray=["Select","Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7"];

    this.data = JSON.parse(this.state.data.value0.profile);
    console.log("Info State", this.data);
  }


  initData = () => {

    console.log(this.data, "jsontosens");
    window.__patchCallback = this.getPatchCallback ;

    this.email = this.data.email;
    this.phone = this.data.phone;
    this.name = this.data.firstName;
    this.adhar = this.data.aadhaarNo;
    this.location = this.data.location;
    this.language = this.data.language;
    this.dob = this.data.dob;
    this.gender = this.data.gender;

    var cmd = this.set({
      id: this.idSet.emailText,
      text: this.email
    })

    cmd += this.set({
      id: this.idSet.phoneText,
      text: this.phone
    })

    cmd += this.set({
      id: this.idSet.locationText,
      text: this.location
    })

    cmd += this.set({
      id: this.idSet.nameText,
      text: this.name
    })

    cmd += this.set({
      id: this.idSet.dobText,
      text: this.dob
    })

    cmd += this.set({
      id: this.idSet.adharText,
      text: this.adhar
    })

    Android.runInUI(cmd, 0);

    for (var i = 0; i < this.data.subject.length; i++) {
      var value = this.data.subject[i].toLowerCase();
      this.selectLanguageItem(value);
    }

    this.data.grade.map((data)=>{
      this.addGrade(data);
    });

    JBridge.selectSpinnerItem(this.idSet.languageSpinner,this.LanguageArray.indexOf(this.language[0]));
    var gender = this.gender.substr(0,1).toUpperCase()+this.gender.substr(1);
    JBridge.selectSpinnerItem(this.idSet.genderSpinner,gender);

  }


  afterRender = () => {
    this.initData();
    this.updateSaveButtonStatus(this.checkCompleteStatus());
  }



  getTail = () => {
    return (
      <LinearLayout
      height="match_parent"
      width="match_parent"
      orientation="vertical">
          <LinearLayout
          height="match_parent"
          width="match_parent"
          weight="1"
          orientation="vertical"/>
          <LinearLayout
          width="match_parent"
          height="match_parent"
          padding="0,2,0,0"
          weight="6"
          orientation="vertical"
          background={window.__Colors.PRIMARY_BLACK_22}>
              <LinearLayout
              width="match_parent"
              height="match_parent"
              padding="8,8,8,8"
              background={window.__Colors.WHITE}>
                  <LinearLayout
                  onClick={this.handleSaveClick}
                  height="match_parent"
                  width="match_parent"
                  cornerRadius="4,4,4,4"
                  gravity="center"
                  id={this.idSet.saveButtonContainer}>
                      <LinearLayout
                      height="match_parent"
                      width="match_parent"
                      gravity="center"
                      background={window.__Colors.LIGHT_BLUE}
                      id={this.idSet.saveButton}>
                          <TextView
                          text="FINISH EDITING"
                          height="wrap_content"
                          width="wrap_content"
                          style={window.__TextStyle.textStyle.CARD.ACTION.LIGHT}/>
                      </LinearLayout>
                  </LinearLayout>
              </LinearLayout>
          </LinearLayout>
        </LinearLayout>
    );
  }

  getSingleSelectSpinner = (id,label,optional,callSpinner) => {
    return(
      <LinearLayout
      width="match_parent"
      height="wrap_content"
      orientation="vertical"
      margin="0,0,0,17">

       {this.getLabel(label,optional)}
         <LinearLayout
           width="match_parent"
           height="wrap_content"
           stroke={"2,"+window.__Colors.PRIMARY_BLACK_66}
           padding="8,8,8,8"
           cornerRadius="4,4,4,4"
           id={id}>
            {callSpinner()}
         </LinearLayout>
       </LinearLayout>
    )
  }

  getEditTextView = (id, label, hint , optional , onChange, inputType) =>{
    return(
      <TextInputView
        id = {id}
        height="wrap_content"
        width="match_parent"
        hintText={hint + (optional ? " (Optional)" : "")}
        labelText={label + " <font color = 'red'>" + (optional ? "" : "*") + "</font>"}
        margin = "0,0,0,12"
        _onChange={onChange}
        text = ""
        textStyle = {window.__TextStyle.textStyle.HINT.SEMI}
        editTextStyle = {window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
        inputType = {inputType ? inputType : "text"}/>
    )
  }

  getLabel = (label,optional) =>{
     if(optional)
         return(
           <TextView
          width="match_parent"
          height="20"
          style={window.__TextStyle.textStyle.HINT.BOLD}
          text={label}
          margin="0,0,0,8"/>
         );

     return (
       <LinearLayout
       height="wrap_content"
       width="wrap_content"
       orientation="horizontal"
       margin ="0,0,0,8">
       <TextView
        width="match_parent"
        height="20"
        style={window.__TextStyle.textStyle.HINT.BOLD}
        text={label}/>
       <TextView
       height="wrap_content"
       width="wrap_content"
       text=" *"
       color="#FF0000"/>
       </LinearLayout>
     );
  }

  getBody = () =>{
    return (
    <LinearLayout
    height="match_parent"
    width="match_parent"
    orientation="vertical">
      <ScrollView
       width="match_parent"
       height="match_parent"
       weight="1"
       padding="15,25,15,0">
        <LinearLayout
        width="match_parent"
        height="match_parent"
        orientation="vertical">
               <LinearLayout
               width="match_parent"
               height="wrap_content"
               orientation="vertical">

                  {this.getEditTextView(this.idSet.nameText,"NAME","Enter your name",false,this.setName)}
                  {this.getSingleSelectSpinner(this.idSet.languageSpinnerContainer,"LANGUAGE",false,this.loadLanguageSpinner)}

                 <TextView
                  width="match_parent"
                  height="20"
                  style={window.__TextStyle.textStyle.HINT.BOLD}
                  text="SUBJECTS"
                  margin="0,0,0,8"/>
                  <EditText
                  width="match_parent"
                  height="wrap_content"
                  maxLines="1"
                  style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
                  onChange={this.getLanguagePredictions}
                  hint="Start typing to add a subject"
                  />
              </LinearLayout>

                <RelativeLayout
                 width="match_parent"
                 height="wrap_content">
                   <LinearLayout
                   height="wrap_content"
                   width="match_parent"
                   orientation="vertical">

                        <LinearLayout
                        height="wrap_content"
                        width="wrap_content"
                        orientation="horizontal"
                        id={this.idSet.LanguageLayout}
                        margin="0,4,0,17"/>

                       {this.getEditTextView(this.idSet.emailText,"E-MAIL","Enter your email",false,this.setEmail)}
                       {this.getEditTextView(this.idSet.phoneText,"PHONE","Enter your phone number",false,this.setPhone,"number")}
                       {this.getSingleSelectSpinner(this.idSet.spinnerContainer,"GENDER",true,this.loadGenderSpinner)}

                       <LinearLayout
                       width="match_parent"
                       height="wrap_content"
                       orientation="vertical"
                       margin="0,0,0,17">
                         <TextView
                          width="match_parent"
                          height="20"
                          style={window.__TextStyle.textStyle.HINT.BOLD}
                          text="DATE OF BIRTH"/>
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
                                onClick={this.showCalendar}/>

                              <TextView
                                width="match_parent"
                                height="wrap_content"
                                id= {this.idSet.dobText}
                                style={window.__TextStyle.textStyle.CARD.BODY.DARK.FADED}
                                text="Select Date"
                                onClick={this.showCalendar}/>

                          </LinearLayout>
                        </LinearLayout>
                        {this.getEditTextView(this.idSet.adharText,"ADHAR NUMBER","",true,this.setAdhar,"number")}
                        {this.getEditTextView(this.idSet.locationText,"CURRENT LOCATION","Enter your location",true,this.setLocation)}

                         <LinearLayout
                         width="match_parent"
                         height="wrap_content"
                         orientation="vertical"
                         margin="0,0,0,17">
                           <TextView
                            width="match_parent"
                            height="20"
                            style={window.__TextStyle.textStyle.HINT.BOLD}
                            text="GRADES"
                            margin="0,0,0,8"/>
                            <LinearLayout
                              width="match_parent"
                              height="wrap_content"
                              stroke={"2,"+window.__Colors.PRIMARY_BLACK_66}
                              padding="8,8,8,8"
                              cornerRadius="4,4,4,4"
                              id={this.idSet.gradeSpinnerContainer}>
                               {this.loadGradeSpinner()}
                            </LinearLayout>
                            <HorizontalScrollView
                              height = "wrap_content"
                              width = "match_parent"
                              id={this.idSet.gradeContainer}
                              margin = "0,10,0,0"/>
                          </LinearLayout>

                         {
                          // <LinearLayout
                          // width="match_parent"
                          // height="wrap_content"
                          // orientation="vertical">
                          //   <TextView
                          //    width="match_parent"
                          //    height="20"
                          //    style={window.__TextStyle.textStyle.HINT.BOLD}
                          //    text="HOBBIES"/>
                          //    <LinearLayout
                          //    height="8"
                          //    orientation="horizontal"
                          //    width="match_parent"
                          //    />
                          //    <EditText
                          //    width="match_parent"
                          //    height="wrap_content"
                          //    maxLines="1"
                          //    style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
                          //    hint="Start typing to add a hobby"
                          //    onChange={this.getHobbiePredictions}
                          //    />
                          //    <RelativeLayout
                          //     width="match_parent"
                          //     height="wrap_content">
                          //         <LinearLayout
                          //         height="wrap_content"
                          //         width="wrap_content"
                          //         orientation="horizontal"
                          //         id={this.idSet.HobbiesLayout}
                          //         margin="0,4,0,8"/>
                          //
                          //         <LinearLayout
                          //         height="wrap_content"
                          //         width="328"
                          //         background={window.__Colors.PRIMARY_BLACK_22}>
                          //            <ScrollView
                          //            height="wrap_content"
                          //            width="match_parent"
                          //            margin="2,0,2,0">
                          //                <LinearLayout
                          //                height="wrap_content"
                          //                width="match_parent"
                          //                margin="2,0,2,0"
                          //                id={this.idSet.predictionHobbiesLayout}
                          //                background="#ffffff">
                          //                </LinearLayout>
                          //            </ScrollView>
                          //         </LinearLayout>
                          //
                          //    </RelativeLayout>
                          //
                          //  </LinearLayout>
                         }
                    </LinearLayout>
                    <LinearLayout
                    height="wrap_content"
                    width="328"
                    background={window.__Colors.PRIMARY_BLACK_22}>
                       <ScrollView
                       height="wrap_content"
                       width="match_parent"
                       margin="2,0,2,0">
                           <LinearLayout
                           height="wrap_content"
                           width="match_parent"
                           margin="2,0,2,0"
                           id={this.idSet.predictionLanguageLayout}
                           background="#ffffff">
                           </LinearLayout>
                       </ScrollView>
                    </LinearLayout>
                 </RelativeLayout>
        </LinearLayout>
       </ScrollView>
       <LinearLayout
       height="match_parent"
       width="match_parent"
       weight="6"/>
      </LinearLayout>
    )
  }

  getBack = () => {
    return (
      <ImageView
      margin="0,0,10,0"
      style={IconStyle}
      height="48"
      width="48"
      onClick={this.onBackPressed}
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
                  background={window.__Colors.WHITE}
                  text="Additional Information"
                  style={window.__TextStyle.textStyle.TOOLBAR.HEADING}/>


          </LinearLayout>);

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


  render(){
      console.log("render");
      this.layout=(
        <LinearLayout
          orientation="vertical"
          root="true"
          background={window.__Colors.WHITE}
          width="match_parent"
          height="match_parent">

           {this.getToolbar()}
           <RelativeLayout
           width="match_parent"
           height="match_parent">
               {this.getBody()}
               {this.getTail()}
           </RelativeLayout>
       </LinearLayout>
      );
    return this.layout.render();
  }

  loadGradeSpinner = () => {
      return(<Spinner
              width="match_parent"
              height="34"
              style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
              margin="0,0,5,6"
              onItemClick = {this.handleGradeSpinnerItemClick}
              values={this.gradeArray}
              />)
    }

    handleGradeSpinnerItemClick = (...params) => {

      if(parseInt(params[2])>0)
      this.addGrade(this.GradeArray[parseInt(params[2])]);

    }

    removeGrade = (data) => {
         this.grade.splice(this.grade.indexOf(data),1);
           this.gradeArray=this.gradeArray+","+data;
           this.GradeArray.push(data);
           this.gradeSpinnerLayout= (
             <LinearLayout
               root="true"
               height="wrap_content"
               width="match_parent">

               {this.loadGradeSpinner()}

             </LinearLayout>);
           this.replaceChild(this.idSet.gradeSpinnerContainer,this.gradeSpinnerLayout.render(),0);
           this.showSelectedGrades();
         }

         addGrade = (data) =>{
           if(this.grade==null)
           this.grade=[];
           this.grade.unshift(data);
           if(this.gradeArray.indexOf(data+",")>-1){
             this.gradeArray = this.gradeArray.replace(data+",","");
           }else{
             this.gradeArray = this.gradeArray.replace(","+data, "");
           }
           this.GradeArray.splice(this.GradeArray.indexOf(data),1);
           this.gradeSpinnerLayout= (
             <LinearLayout
             root="true"
             height="wrap_content"
             width="match_parent">

              {this.loadGradeSpinner()}

             </LinearLayout>);
           this.replaceChild(this.idSet.gradeSpinnerContainer,this.gradeSpinnerLayout.render(),0);
           this.showSelectedGrades();
         }

         showSelectedGrades = () =>{
           var items = this.grade.map((data)=>{
               return(
                 <LinearLayout
                    height="wrap_content"
                    width="wrap_content"
                    padding="6,4,6,4"
                    margin="0,0,10,0"
                    cornerRadius="10,10,10,10"
                    background={window.__Colors.DARK_GRAY_44}
                    gravity="center">

                     <TextView
                       height="wrap_content"
                       width="wrap_content"
                       text={data}
                       margin="0,0,4,0"
                       textStyle={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}/>

                     <ImageView
                       height="15"
                       width="15"
                       imageUrl="ic_action_close"
                       margin="0,1,0,0"
                       onClick={()=>{this.removeGrade(data)}}/>
                  </LinearLayout>
               )
           });


        this.gradeCards =(
          <LinearLayout
            width="match_parent"
            height="match_parent"
            root="true">

            {items}

          </LinearLayout>
        )

        this.replaceChild(this.idSet.gradeContainer,this.gradeCards.render(),0);
       }


   loadLanguageSpinner = () => {
     return(<Spinner
             width="match_parent"
             height="34"
             style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
             margin="0,0,5,6"
             id={this.idSet.languageSpinner}
             onItemClick = {this.handleLanguageSpinnerItemClick}
             values={this.languageArray}
             />)
   }

   handleLanguageSpinnerItemClick = (...params) => {
        console.log("12345");

        if(params[2]>0)
        {this.language=[this.LanguageArray[params[2]]]}
   }

  loadGenderSpinner = () => {
    return(<Spinner
            width="match_parent"
            height="34"
            style={window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK}
            margin="0,0,5,6"
            onItemClick = {this.handleGenderSpinnerItemClick}
            id={this.idSet.genderSpinner}
            values={this.genderArray}
            />)
  }

  handleGenderSpinnerItemClick = (...params) => {
       if(params[2]>0)
       {this.gender=this.GenderArray[params[2]]}
  }

  showCalendar = () =>{
    var _this = this;
    var callback = callbackMapper.map(
      function (data){

            data[0]=_this.formatDate(data[0]);

             _this.dob=data[0];

              var cmd = _this.set({
                id: _this.idSet.dobText,
                text: data[0],
                style: window.__TextStyle.textStyle.CARD.BODY.DARK.REGULAR_BLACK
              });
              Android.runInUI(cmd, 0);
    });


      JBridge.showCalender(callback,"","","");

  }

  formatDate = (date) =>{
      date = date.substr(0,4)+"-"+date.substr(5);
      if(date.charAt(7)!='-'){
         date = date.substr(0,5)+"0"+date.substr(5);
       }

      date = date.substr(0,7)+"-"+date.substr(8);
      if(date.length<10)
        date = date.substr(0,8)+"0"+date.substr(8);
        return date;

      }


  getLanguagePredictions = (data) => {

    console.log(this.languageDictionary, " languageDictionarycitionary");
    data=data.toLowerCase();
      var predictions=[];
      var i;

      if(data!=""){
         for(i=0; i < this.languageDictionary.length;i++)
         {
           if(this.languageDictionary[i].startsWith(data))
              predictions.unshift(this.languageDictionary[i]);
         }
         console.log(predictions, "LangPredi");
         if(predictions!=[])
         this.populateLanguagePredictions(predictions,data);
     }
     else {
       {
         this.predictLanguageLayout =(<LinearLayout
            height="wrap_content"
            width="wrap_content"/>);

         this.replaceChild(this.idSet.predictionLanguageLayout, this.predictLanguageLayout.render(), 0);
       }
     }

  }

  populateLanguagePredictions = (predictions,data) =>{

    var predictionContent = predictions.map((item) => {
      return (this.getLanguagePredictionCard(item))
    });

    var addDictionaryString="Add \"String\"";
    addDictionaryString = addDictionaryString.replace("String", data);
    this.predictLanguageLayout =(<LinearLayout
       height="match_parent"
       width="wrap_content"
       orientation="vertical"
       margin="16,0,16,0"
       >

         {predictionContent}
         <LinearLayout
         height="match_parent"
         width="match_parent">
           <TextView
            height="wrap_content"
            width="match_parent"
            padding="16,17,0,17"
            textSize="15"
            onClick={()=>{this.addLanguageItem(data)}}
            text={addDictionaryString}
            textColor="#FF333333"/>
         </LinearLayout>
         <LinearLayout
         height="3"
         width="328"
         background="#E0E0E0">
         </LinearLayout>
       </LinearLayout>);

    this.replaceChild(this.idSet.predictionLanguageLayout, this.predictLanguageLayout.render(), 0);

  }

  getLanguagePredictionCard = (item)=>{
    console.log(item, "iitm")
    return (
      <LinearLayout
      height="wrap_content"
      width="match_parent"

      orientation="vertical">
          <TextView
           height="wrap_content"
           width="match_parent"
           padding="16,17,0,17"
           textSize="15"
           onClick={()=>{this.selectLanguageItem(item)}}
           text= {item}
           textColor="#FF333333"
          />
          <LinearLayout
          height="1"
          width="328"
          background={window.__Colors.PRIMARY_BLACK_66}>
          </LinearLayout>
      </LinearLayout>
    );
  }

  selectLanguageItem =(data) =>{
    console.log(data, "selectItem");
    var index=this.languageDictionary.indexOf(data);
    if(index >-1){
      JBridge.hideKeyboard();

      this.predictLanguageLayout =(<LinearLayout
         height="wrap_content"
         width="wrap_content"/>);

      this.replaceChild(this.idSet.predictionLanguageLayout, this.predictLanguageLayout.render(), 0);

     this.languageDictionary.splice(index,1);
     this.selectedLanguages.unshift(data);


     var skills = this.selectedLanguages.map((item) => {
       return (this.languageItemLayout(item));
     });

    console.log(this.selectedLanguages," skiilhere");
    this.updatedLanguages=(
      <HorizontalScrollView
      height="wrap_content"
      width="match_parent">
          <LinearLayout
          height="match_parent"
          width="match_parent"
          orientation="horizontal">
             {skills}
          </LinearLayout>
    </HorizontalScrollView>);

      this.replaceChild(this.idSet.LanguageLayout,this.updatedLanguages.render(),0);

   }

  }

  addLanguageItem = (data) =>{
    if(this.languageDictionary.indexOf(data)==-1 && this.selectedLanguages.indexOf(data)==-1)
    {
      this.languageDictionary.unshift(data);
      this.selectLanguageItem(data);
    }
    else {
      JBridge.hideKeyboard();
      JBridge.showSnackBar("Language Already Added");
    }
  }




  languageItemLayout = (item)=> {
    return (
      <LinearLayout
      height="wrap_content"
      width="wrap_content"
      >
            <LinearLayout
            height="32"
            width="wrap_content"
            background="#66D8D8D8"
            cornerRadius="12,12,12,12"
            >
                <TextView
                height="28"
                width="wrap_content"
                textColor="#ffffff"
                text={item}
                margin="12,0,0,0"
                gravity="center"
                />
                <ImageView
                margin="4,8,4,8"
                height="12"
                width="12"
                imageUrl="ic_action_close"
                onClick={()=>{this.removeLanguage(item)}}
                />
            </LinearLayout>
            <LinearLayout
            height="wrap_content"
            width="10"/>

    </LinearLayout>
  );
  }

  removeLanguage= (item) =>{
    var index= this.selectedLanguages.indexOf(item);
    if(index>-1){
      this.selectedLanguages.splice(index,1);
      this.languageDictionary.unshift(item);

      var languages = this.selectedLanguages.map((data) => {
        return (this.languageItemLayout(data));
      });

      console.log(this.selectedLanguages," skiilll");
      this.updatedLanguages=(
        <HorizontalScrollView
        height="wrap_content"
        width="match_parent">
           <LinearLayout
           height="match_parent"
           width="match_parent"
           orientation="horizontal">
              {languages}
           </LinearLayout>
         </HorizontalScrollView>)


       this.replaceChild(this.idSet.LanguageLayout,this.updatedLanguages.render(),0);

    }
  }

  getHobbiePredictions = (data) => {

    console.log(this.hobbieDictionary, " hobbieDictionary");
    data=data.toLowerCase();
      var predictions=[];
      var i;

      if(data!=""){
         for(i=0; i < this.hobbieDictionary.length;i++)
         {
           if(this.hobbieDictionary[i].startsWith(data))
              predictions.unshift(this.hobbieDictionary[i]);
         }
         console.log(predictions, "HobbPredi");
         if(predictions!=[])
         this.populateHobbiePredictions(predictions,data);
     }
     else {
       {
         this.predictHobbieLayout =(<LinearLayout
            height="wrap_content"
            width="wrap_content"/>);

         this.replaceChild(this.idSet.predictionHobbiesLayout, this.predictHobbieLayout.render(), 0);
       }
     }

  }

  populateHobbiePredictions = (predictions,data) =>{

    var predictionContent = predictions.map((item) => {
      return (this.getHobbiePredictionCard(item))
    });

    var addDictionaryString="Add \"String\"";
    addDictionaryString = addDictionaryString.replace("String", data);
    this.predictHobbieLayout =(<LinearLayout
       height="match_parent"
       width="wrap_content"
       orientation="vertical"
       margin="16,0,16,0"
       >

         {predictionContent}
         <LinearLayout
         height="match_parent"
         width="match_parent">
           <TextView
            height="wrap_content"
            width="match_parent"
            padding="16,17,0,17"
            textSize="15"
            onClick={()=>{this.addHobbieItem(data)}}
            text={addDictionaryString}
            textColor="#FF333333"/>
         </LinearLayout>
         <LinearLayout
         height="3"
         width="328"
         background="#E0E0E0">
         </LinearLayout>
       </LinearLayout>);

    this.replaceChild(this.idSet.predictionHobbiesLayout, this.predictHobbieLayout.render(), 0);


  }

  getHobbiePredictionCard = (item)=>{
    console.log(item, "iitm")
    return (
      <LinearLayout
      height="wrap_content"
      width="match_parent"

      orientation="vertical">
          <TextView
           height="wrap_content"
           width="match_parent"
           padding="16,17,0,17"
           textSize="15"
           onClick={()=>{this.selectHobbieItem(item)}}
           text= {item}
           textColor="#FF333333"
          />
          <LinearLayout
          height="1"
          width="328"
          background={window.__Colors.PRIMARY_BLACK_66}>
          </LinearLayout>
      </LinearLayout>
    );
  }

  selectHobbieItem =(data) =>{
    console.log(data, "selectItem");
    var index=this.hobbieDictionary.indexOf(data);
    if(index >-1){
      JBridge.hideKeyboard();

      this.predictHobbieLayout =(<LinearLayout
         height="wrap_content"
         width="wrap_content"/>);

      this.replaceChild(this.idSet.predictionHobbiesLayout, this.predictHobbieLayout.render(), 0);

     this.hobbieDictionary.splice(index,1);
     this.selectedHobbies.unshift(data);


     var skills = this.selectedHobbies.map((item) => {
       return (this.hobbieItemLayout(item));
     });

    console.log(this.selectedHobbies," skiilhere");
    this.updatedHobbies=(
      <HorizontalScrollView
      height="wrap_content"
      width="match_parent">
            <LinearLayout
            height="match_parent"
            width="match_parent"
            orientation="horizontal">
               {skills}
            </LinearLayout>
      </HorizontalScrollView>);

      this.replaceChild(this.idSet.HobbiesLayout,this.updatedHobbies.render(),0);

   }

  }

  addHobbieItem = (data) =>{
    if(this.hobbieDictionary.indexOf(data)==-1 && this.selectedHobbies.indexOf(data)==-1)
    {
      this.hobbieDictionary.unshift(data);
      this.selectHobbieItem(data);
    }
    else {
      JBridge.hideKeyboard();
      JBridge.showSnackBar("Hobbie Already Added");
    }
  }




  hobbieItemLayout = (item)=> {
    return (
      <LinearLayout
      height="wrap_content"
      width="wrap_content"
      >
            <LinearLayout
            height="32"
            width="wrap_content"
            background="#66D8D8D8"
            cornerRadius="12,12,12,12"
            >
                <TextView
                height="28"
                width="wrap_content"
                textColor="#ffffff"
                text={item}
                margin="12,0,0,0"
                gravity="center"
                />
                <ImageView
                margin="11,8,11,8"
                height="match_parent"
                width="match_parent"
                imageUrl="ic_action_close"
                onClick={()=>{this.removeHobbie(item)}}
                />
            </LinearLayout>
            <LinearLayout
            height="wrap_content"
            width="10"/>

    </LinearLayout>
  );
  }

  removeHobbie= (item) =>{
    var index= this.selectedHobbies.indexOf(item);
    if(index>-1){
      this.selectedHobbies.splice(index,1);
      this.hobbieDictionary.unshift(item);

      var Hobbies = this.selectedHobbies.map((data) => {
        return (this.hobbieItemLayout(data));
      });

      console.log(this.selectedHobbies," skiilll");
      this.updatedHobbies=(
        <HorizontalScrollView
        height="wrap_content"
        width="match_parent">
           <LinearLayout
           height="match_parent"
           width="match_parent"
           orientation="horizontal">
              {Hobbies}
           </LinearLayout>
         </HorizontalScrollView>);

       this.replaceChild(this.idSet.HobbiesLayout,this.updatedHobbies.render(),0);

    }
  }

  onBackPressed = () => {
    var whatToSend = []
    var event = { tag: "BACK_AdditionalInformationActivity", contents: whatToSend};
    window.__runDuiCallback(event);
  }

  handleSaveClick = () => {
    var json=  {};


    json.firstName=this.name;
    json.language=this.language;
    json.email=this.email;
    json.phone=this.mobile;

    if(this.adhar!=null)
    json.location=this.location;

    if(this.adhar!=null)
    json.aadhaarNo=this.adhar;

    if(this.dob!=null)
    json.dob= this.dob;

    if(this.grade!=null && this.grade!=[] )
    json.grade=this.grade;

    if(this.gender!=null)
      json.gender=this.gender.toLowerCase();

      json.subject=this.selectedLanguages.length>0 ? this.selectedLanguages : null;


   json.userId=window.__userToken;

   var url=window.__apiUrl + "/api/user/v1/update"


   var body = {
             "id":"unique API ID",
             "ts":"response timestamp YYYY-MM-DDThh:mm:ss+/-nn:nn (timezone defaulted to +5.30)",
               "params": {

                 },
             "request":json
             }

  console.log(JSON.stringify(body),"sendingJson");

  this.responseCame=false;

  if(JBridge.isNetworkAvailable()){
      JBridge.patchApi(url,JSON.stringify(body),window.__userToken,window.__apiToken);
      window.__LoaderDialog.show();

     setTimeout(() => {
         if(this.responseCame){
           return;
         }
         JBridge.showSnackBar(window.__S.ERROR_SERVER_CONNECTION);
         window.__LoaderDialog.hide();
         this.responseCame=false;
     },window.__API_TIMEOUT);
 }else {
   JBridge.showSnackBar(window.__S.NO_INTERNET);
 }

 //  window.__LoaderDialog.show();
 //
 // setTimeout(() => {
 //     if(_this.responseCame){
 //       return;
 //     }
 //     JBridge.showSnackBar(window.__S.ERROR_SERVER_CONNECTION);
 //     window.__LoaderDialog.hide();
 //     _this.responseCame=false;
 // },window.__API_TIMEOUT);

  }

  getPatchCallback = (data) =>{
    data=JSON.parse(data);
    if(this.responseCame){

      return;
    }

   window.__LoaderDialog.hide();
   this.responseCame=true;
   console.log(data)
   if(data.result.response=="SUCCESS"){
     window.__BNavFlowRestart();
     this.onBackPressed();
   }else{
     JBridge.showSnackBar(data.params.errmsg);
   }

  }

  checkCompleteStatus = () =>{

    if(this.name==null || this.language==null || this.email==null || this.mobile==null)
      {console.log(this.name + " "+ this.language + " " + this.email + " " + this.mobile);
      return false;
      }
    return true;
  }

  updateSaveButtonStatus = (enabled) => {
    var backgroundColor;
    var isClickable;

    if (enabled) {
      backgroundColor = window.__Colors.LIGHT_BLUE;
      isClickable = "true"
    } else {
      backgroundColor = window.__Colors.FADE_BLUE;
      isClickable = "false"
    }

    var cmd = this.set({
      id: this.idSet.saveButton,
      background: backgroundColor
    })

    cmd += this.set({
      id: this.idSet.saveButtonContainer,
      clickable: isClickable
    })

    Android.runInUI(cmd, 0);
  }

  setName = (data) =>{
    this.name= data=="" ? null : data;
    this.updateSaveButtonStatus(this.checkCompleteStatus());
  }

  setLanuage = (data) =>{
    this.language=data;
    this.updateSaveButtonStatus(this.checkCompleteStatus());

  }

  setEmail = (data) =>{
    this.email=data=="" ? null : data;
    this.updateSaveButtonStatus(this.checkCompleteStatus());

  }
  setPhone = (data) =>{
    this.mobile=data=="" ? null : data;
    this.updateSaveButtonStatus(this.checkCompleteStatus());

  }

  setAdhar= (data) => {
    this.adhar=data=="" ? null :data;
  }

  setLocation = (data) => {
    this.location=data=="" ? null :data;

  }


}
module.exports = Connector(AdditionalInformationActivity);
