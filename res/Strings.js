const objectAssign = require('object-assign');
const stringsRes = {
	"en_US" : {
		ALREADY_HAVE_ACC : "Already have an Account? Sign in now",
		APPLY_FILTER : "APPLY FILTER",
		AS_FILE : "As File",
		AS_LINK : "As Link",
		BACK_TO_EXIT : "Press back again to exit app",
		CANCEL_DOWNLOAD : "CANCEL DOWNLOAD",
		COMING_SOON : "Coming soon..",
		COMMUNITIES : "Communities",
		CONFIRM : "Confirm",
		COURSE : "COURSE",
		COURSE_ENROLLED : "Course enrolled",
		COURSE_PROGRESS_COMPLETED : "%s % done",
		CONTENT_FLAGGED_MSG : "Content flagged successfully",
		CONTENT_FLAG_FAIL : "Content flagging failed",
		COURSES_BNAV : "COURSES",
		COURSES_IN_PROGRESS : "Courses In Progress",
		COURSES_LW : "Courses",
		CREATED_BY : "CREATED BY",
		DELETE : "Delete",
		DESCRIPTION : "Description",
		DOWNLOAD : "DOWNLOAD",
		DOWNLOADS : "downloads",
		EDIT : "Edit",
		EMAIL_ID : "Email ID",
		EMPTY_SEARCH_RESULTS : "No Search Results Found",
		ENROLL_COURSE : "ENROLL THIS COURSE",
		ERROR_CONTENT_NOT_AVAILABLE : "Content not available",
		ERROR_CONTENT_NOT_FOUND : "Contents not added yet",
		ERROR_DURATION_NOT_AVAILABLE : "Duration not available",
		ERROR_EMAIL_FORMAT : "Email format not correct",
		ERROR_EMPTY_EMAIL : "Please enter the email",
		ERROR_EMPTY_FIRSTNAME : "Please enter the name",
		ERROR_EMPTY_LANGUAGE : "Please choose atleast one language",
		ERROR_EMPTY_MOBILE : "Please enter the mobile number",
		ERROR_EMPTY_PASSWORD : "Please enter the password",
		ERROR_EMPTY_USERNAME : "Please enter the user name",
		ERROR_FETCHING_DATA : "Error Fetching Data",
		ERROR_NO_COURSES_ENROLLED : "No Courses enrolled yet",
		ERROR_NO_INTERNET_MESSAGE : "You’re not connected to the internet.",
		ERROR_NO_OFFLINE_RESOURCE : "No offline resource yet",
		ERROR_SERVER_CONNECTION : "Unable to connect to server",
		ERROR_SERVER_MESSAGE : "Error :",
		ERROR_SHORT_MOBILE : "Please check the mobile number format",
		ERROR_SHORT_PASSWORD : "Password cannot be shorter than 8 characters",
		FETCHING_CONTENTS : "Fetching Contents : %s %",
		FILE_SIZE : "Size [%s]",
		FILTER : "Filter",
		FILTER_BY : "FILTER BY",
		FIRST_NAME : "First Name",
		FIRST_NAME_HINT : "Enter your first name",
		GROUPS : "Groups",
		GROUPS_BNAV : "GROUPS",
		HINT_EMAIL_ID : "sample@test.com",
		HINT_LANGUAGE : "Choose preffered language",
		HINT_MOBILE_NUMBER : "Enter mobile number",
		HINT_PASSWORD : "Minimum 8 character password",
		HINT_USER_NAME : "Enter user name",
		HOME_BNAV : "HOME",
		JOIN : "JOIN",
		LATEST_COURSES : "Latest Courses",
		LOADING_CONTENT : "Loading content",
		LOGGED_OUT : "Logged out",
		MOBILE_NUMBER : "MOBILE NUMBER",
		MODULE_SIZE : "Module Size %s",
		MODULE_SIZE_UNAVAILABLE : "Module Size Unavailable",
		NEW : "New",
		NO_ACC_YET : "No Account yet? Sign up now",
		NO_PREVIEW : "No preview available",
		NUMBER_OF_VOTES : "Number of votes",
		OPEN : "OPEN",
		PASSWORD : "PASSWORD",
		PHONE : "PHONE",
		PLAY : "PLAY",
		POPULAR_COURSES : "Popular Courses",
		PREVIEWS : "PREVIEWS",
		PROFILE_BNAV : "PROFILE",
		PROFILE_DETAILS_TITLE : "Profile Details",
		PROFILE_LW : "Profile",
		PUBLISHED_DATE : "Published date",
		QUIZ : "QUIZ",
		RESOURCES_BNAV : "RESOURCES",
		RESOURCES_LW : "Resources",
		RESUME : "RESUME",
		RETRY_ACTION : "Please retry",
		SAVED_ON : "Saved on",
		SAVED_RESOURCES : "Saved Resources",
		SEARCH_HINT : "Search",
		SELECT : "SELECT",
		SELECT_A_REASON : "SELECT A REASON",
		SERVER_CONNECTION_ERROR : "Unable to connect to server",
		SHARE_THIS : "Share this",
		SIGN_IN : "SIGN IN",
		SIGN_UP : "SIGN UP",
		SORT_BY : "SORT BY",
		SPLASH_MESSAGE : "Project %s",
		STRUCTURE : "Structure",
		TO_DO : "To-Do",
		USER_NAME : "USER NAME",
		VIEW_ALL : "VIEW ALL",
		VIEW_ALL_COMMUNITIES : "Viewing all communities you’re a part of",
		VIEW_MORE : "VIEW MORE",
		WAIT_REQUEST : "Please Wait ...",
		WELCOME_BACK : "WELCOME BACK %s",
		WELCOME_M1 : "Welcome to NTP",
		WELCOME_M2 : "Structured education for the educators",
		WELCOME_ON_BOARD : "Welcome to NTP, %s ",
		WHAT_WENT_WRONG : "What went wrong?",
		YOUR_PROGRESS : "Your Progress: %s%",
		FLAG : "Flag / Report ",
		ERROR_EMPTY_RESULT : "No result available",
		ERROR_FLAG_CONTENT_MIN_REASON : "Please select atleast one reason for flag the content",
		ERROR_INVALID_EMAIL : "Invalid Email Id",
		MSG_RESOURCE_DELETED : "Content deleted from device",
		LOGOUT : "Logout",
		CREATOR_NAME_NOT_AVAILABLE : "Creator name not available",
		ENROLL : "ENROLL",
		VIEW_ONGOING_BATCHES : "View ongoing batches",
		VIEW_UPCOMING_BATCHES : "View upcoming batches",
		USER_NAME_PROFILE : "User Name",
		BATCHES_FOR_THIS_COURSE : "Batches for this course",
		ERROR_EMPTY_FIELDS : "Please enter the detials. ",
		TIME_OUT : "Server timeout, please try again later",
		OPTIONAL : "(Optional)",
		PERCENTAGE : "Percentage",
		SUBJECTS : "Subjects",
		FROM : "From",
		TO : "To",
		SELECT_DATE : "Select Date",
		SAVE : "Save",
		GRADE : "Grade",
		INSTITUION_NAME : "Instution Name",
		BOARD_UNIVERSITY : "Board/University",
		APPLY : "APPLY",
		MY_COMMUNITIES : "My Communities",
		AVAILABLE_FILTERS : "Available filters",
		DISMISS : "DISMISS",
		NO_FILTERS_SELECTED : "No filter selected",
		ACCOMPLISHMENTS : "Accomplishments",
		ADD : "Add",
		PERSONAL_DETAILS : "Personal Details",
		AFFILIATIONS : "Affiliations",
		SHOW_LESS : "Show Less",
		SHOW_MORE : "Show More",
		CREATOR_OF : "Creator of",
		USERNAME : "Username",
		YOUR_PROFILE_IS : "Your profile is ",
		FOLLOW : "Follow",
		PEOPLE_YOU_FOLLOW : "People you follow",
		GROUPS_YOU_FOLLOW : "Groups you follow",
		PEOPLE_WHO_FOLLOW_YOU : "People who follow you",
		SKILL_TAGS : "Skill Tags",
		ENDORSE : "Endorse",
		MODULE_NAME : "Module Name",
		NIL : "Nil",
		PINNED_BY_ADMIN : "Pinned by Admin",
		READ_MORE : "Read more",
		THIS_IS_A_RESTRICTED_COMMUNITY : "This is a restricted community",
		DOWNLOAD_CONFIRMATION_TEXT : "Do you want to download?",
		YES : "Yes",
		NO : "No",
		ABOUT_MODULE : "About This Module",
		CHOOSE_FROM_FOLLOWING : "Choose from following",
		LANGUAGES : "LANGUAGES",
		COMING_SOON : "More details coming soon ..",
		TITLE_EDUCATION : "Education",
		TITLE_EXPERIENCES : "Experiences",
		TITLE_ADDRESS : "Address",
		LAST_NAME : "Last Name",
		LAST_NAME_HINT : "Enter your last name",
		NAME : "NAME",
		NAME_HINT : "Enter your name",
		GENDER : "GENDER",
		DATE_OF_BIRTH : "DATE OF BIRTH",
		CURRENT_LOCATION : "CURRENT LOCATION",
		HINT_CURRENT_LOCATION : "Enter your location",
		MODULES : "MODULES",
		BTN_CLICK_TO_OPEN_CONTENT : "Click to open content",
		START_COURSE : "START COURSE",
		ERROR_INVALID_AADHAAR : "Please check the aadhaar number format",
		ERROR_BATCH_NOT_STARTED : "Batch not started",
		MSG_NO_NEW_NOTIFICATION : "No new notification",
		MSG_NO_DETAILS_TO_SHOW : "No details to show",
		MSG_IMPORTED_SUCCESSFULLY : "Imported Successfully",
		ERROR_CANT_OPEN_EMPTY_CONTENT : "Can't open empty content",
		ERROR_NO_BATCHES_FOUND : "No batches found",
		ANSWER : "Answer",
		BTN_SUBMIT : "SUBMIT",
		TOPIC_YOU_MIGHT_LIKE : "Topic you might like",
		OPEN_SETTINGS : "OPEN SETTINGS",
		LABEL_ADD_A_SKILL : "Add a skill",
		TYPE_TO_ADD_A_SKILL : "Type to add a skill",
		ERROR_ALREADY_ADDED : "Already Added",
		WARNING_PLEASE_ADD_MANDATORY_DETAILS : "Please add mandatory details",
		WARNING_PLEASE_MAKE_SOME_CHANGES : "Please make some change",
		WARNING_INVALID_YEAR_OF_PASSING : "Invalid year of passing",
		WARNING_INVALID_PERCENTAGE : "Invalid percentage",
		WARNING_INVALID_GRADE : "Invalid grade",
		DEGREE : "Degree",
		INSTITUION_NAME : "Instution name",
		IS_THIS_YOUR_CURRENT_JOB : "Is this your current job?",
		ERROR_MULTIPLE_CURRENT_JOB : "You already have a current job, please change that to not a current job",
		OPTION_INAPPROPRIATE_CONTENT : "Inappropriate content",
		OPTION_COPYRIGHT_VIOLATION : "Copyright violation",
		OPTION_PRIVACY_VIOLATION : "Privacy violation",
		OPTION_OTHER : "Other",
		MODULE_NAME : "Module name",
		HOBBIES : "Hobbies",
		EDIT_PROFILE : "Edit profile",
		ACTIVE : "Active",
		STORAGE : "Storage",
		PERMISSION_DENIED : "Permission denied",
		YEAR_OF_PASSING : "Year of passing",
		SELECT_ADDRESS_TYPE : "Select Address Type",
		CANCEL : "CANCEL",
		ERROR_NO_RESUME_CONTENT_AVAILABLE : "Error no resume content available",
		SELECT_LANGUAGE : "Select Language",
		READ_LESS : "Read Less",
		CONFIRM_DEL : "Confirm Delete?",
		ADDRESS_LINE1 : "Address Line 1",
		ADDRESS_LINE2 : "Address Line 2",
		CITY : "City",
		STATE : "State",
		COUNTRY : "Country",
		PINCODE : "Pincode",
		PERMANENT : "Permanent",
		CURRENT : "Current",
		JOB_NAME : "Job Name",
		ORGANIZATION : "Organization",
		POSITION : "Position",
		CHOOSE_FROM_FOLLOWING : "Choose from following",
		PERMISSION_SETTING_MSG : "To provide permissions, click on 'Open Settings' and provide suitable permissions.",
		DOWNLOADING : "DOWNLOADING %s %",
		CREATED_BY_SMALL : "Created by",
		ERROR_OFFLINE_MODE : "No internet, Offline mode",
		ADDITIONAL_INFORMATION : "Additional Information",
		FACEBOOK : "Facebook",
		TWITTER : "Twitter",
		LINKEDIN : "LinkedIn",
		STRENGTHEN_YOUR_PROFILE : "Strengthen your profile",
		CHANGE_LANGUAGE : "Change language",
		UPDATE : "UPDATE"
	},
	"hi_IN" : {
		ALREADY_HAVE_ACC : "मौजूदा उपयोगकर्ता, साइन इन करें",
		APPLY_FILTER : "फिल्टर लागू करें",
		AS_FILE : "फ़ाइल के रूप में साझा करें",
		AS_LINK : "लिंक के रूप में साझा करें",
		BACK_TO_EXIT : "ऐप से बाहर निकलने के लिए फिर से स्पर्श करें",
		CANCEL_DOWNLOAD : "डाउनलोड रद्द करें",
		COMING_SOON : "जल्द आ रहा है...",
		COMMUNITIES : "समुदायों",
		CONFIRM : "पुष्टि करें",
		COURSE : "कोर्स ",
		COURSE_ENROLLED : "कोर्स नामांकित",
		COURSE_PROGRESS_COMPLETED : "पूर्ण: %s",
		CONTENT_FLAGGED_MSG : "पाठ्यक्रम सफलतापूर्वक फ़्लैग किया गया",
		CONTENT_FLAG_FAIL : "पाठ्यक्रम फ़्लैगिंग विफल रहा",
		COURSES_BNAV : "कोर्स ",
		COURSES_IN_PROGRESS : " कोर्स प्रगति पर है",
		COURSES_LW : "कोर्स ",
		CREATED_BY : "के द्वारा बनाई गई",
		DELETE : "रद्द",
		DESCRIPTION : "विवरण",
		DOWNLOAD : "डाउनलोड ",
		DOWNLOADS : "डाउनलोड ",
		EDIT : "संपादित करें",
		EMAIL_ID : "ईमेल आईडी",
		EMPTY_SEARCH_RESULTS : "कोई खोज परिणाम नहीं मिला",
		ENROLL_COURSE : " कोर्स में नामांकित कराएं",
		ERROR_CONTENT_NOT_AVAILABLE : "पाठ्यक्रम अनुपलब्ध",
		ERROR_CONTENT_NOT_FOUND : "पाठ्यक्रम अभी तक उपलब्ध नहीं है",
		ERROR_DURATION_NOT_AVAILABLE : "अवधि अनुपलब्ध",
		ERROR_EMAIL_FORMAT : "गलत ईमेल प्रारूप",
		ERROR_EMPTY_EMAIL : "ईमेल आईडी दर्ज करें",
		ERROR_EMPTY_FIRSTNAME : "प्रथम नाम दर्ज करें",
		ERROR_EMPTY_LANGUAGE : "कम से कम एक भाषा चुनें",
		ERROR_EMPTY_MOBILE : "मोबाइल नंबर दर्ज करें",
		ERROR_EMPTY_PASSWORD : "पास वर्ड दर्ज करें",
		ERROR_EMPTY_USERNAME : "उपयोगकर्ता नाम दर्ज करें",
		ERROR_FETCHING_DATA : "डेटा लाने में त्रुटि",
		ERROR_NO_COURSES_ENROLLED : "कोर्स में दाखिला नहीं हुआ",
		ERROR_NO_INTERNET_MESSAGE : "इंटरनेट की सुविधा नहीं है",
		ERROR_NO_OFFLINE_RESOURCE : "कोई संसाधन संग्रहीत नहीं",
		ERROR_SERVER_CONNECTION : "सर्वर से संपर्क करने में असमर्थ",
		ERROR_SERVER_MESSAGE : " त्रुटि:",
		ERROR_SHORT_MOBILE : "मोबाइल नंबर 10 अंक होना चाहिए",
		ERROR_SHORT_PASSWORD : "पासवर्ड 8 वर्णों से कम नहीं हो सकता",
		FETCHING_CONTENTS : "पाठ्यक्रम प्राप्ति:%",
		FILE_SIZE : "आकार [%s]",
		FILTER : "फिल्टर",
		FILTER_BY : "के द्वारा फिल्टर",
		FIRST_NAME : "नाम",
		FIRST_NAME_HINT : "अपना नाम दर्ज करें",
		GROUPS : "समूहों",
		GROUPS_BNAV : "समूहों",
		HINT_EMAIL_ID : "नमूने का परीक्षण",
		HINT_LANGUAGE : "पसंदीदा भाषा चुनें",
		HINT_MOBILE_NUMBER : "मोबाइल नंबर दर्ज करें",
		HINT_PASSWORD : "पासवर्ड 8 वर्णों से कम नहीं हो सकता",
		HINT_USER_NAME : "उपयोगकर्ता नाम दर्ज करें",
		HOME_BNAV : "होम",
		JOIN : "शामिल",
		LATEST_COURSES : "नवीनतम पाठ्यक्रम",
		LOADING_CONTENT : "पाठ्यक्रम लोड करें",
		LOGGED_OUT : "लॉग आउट",
		MOBILE_NUMBER : "मोबाइल नंबर",
		MODULE_SIZE : "मॉड्यूल आकार: %s",
		MODULE_SIZE_UNAVAILABLE : "मॉड्यूल का आकार अनुपलब्ध है",
		NEW : "नया",
		NO_ACC_YET : "नया उपयोगकर्ता? अब साइन अप करें",
		NO_PREVIEW : "कोई प्रीव्यू उपलब्ध नहीं  है",
		NUMBER_OF_VOTES : "वोटों की संख्या",
		OPEN : "खुला",
		PASSWORD : "पासवर्ड",
		PHONE : "फ़ोन",
		PLAY : "प्ले",
		POPULAR_COURSES : "लोकप्रिय कोर्स",
		PREVIEWS : "प्रीव्यू",
		PROFILE_BNAV : "प्रोफ़ाइल",
		PROFILE_DETAILS_TITLE : "प्रोफ़ाइल विवरण",
		PROFILE_LW : "प्रोफ़ाइल",
		PUBLISHED_DATE : "प्रकाशन की तारीख",
		QUIZ : "प्रश्नोत्तरी",
		RESOURCES_BNAV : "रिसोर्सेज ",
		RESOURCES_LW : "रिसोर्सेज",
		RESUME : "पुनः आरंभ करें",
		RETRY_ACTION : "पुनः प्रयास करें",
		SAVED_ON : "सेव्ड",
		SAVED_RESOURCES : "सहेजे गए संसाधन",
		SEARCH_HINT : "खोज",
		SELECT : "चयनित",
		SELECT_A_REASON : "कोई कारण चुनें",
		SERVER_CONNECTION_ERROR : "सर्वर से संपर्क करने में असमर्थ",
		SHARE_THIS : "शेयर",
		SIGN_IN : "साइन इन करें",
		SIGN_UP : "साइन अप करें",
		SORT_BY : "आधार पर छाँटे",
		SPLASH_MESSAGE : "एनसीटीई",
		STRUCTURE : "संरचना",
		TO_DO : " टो डो",
		USER_NAME : "उपयोगकर्ता नाम",
		VIEW_ALL : "सभी को देखें",
		VIEW_ALL_COMMUNITIES : "सभी शामिल हुए समुदायों को देखें",
		VIEW_MORE : "अधिक...",
		WAIT_REQUEST : "कृपया प्रतीक्षा करें",
		WELCOME_BACK : "फिर से स्वागत, %s",
		WELCOME_M1 : "एनटीपी में आपका स्वागत है",
		WELCOME_M2 : "शिक्षकों के लिए ढांचे की संरचना",
		WELCOME_ON_BOARD : "एनटीपी में आपका स्वागत है",
		WHAT_WENT_WRONG : "क्या गलत हुआ",
		YOUR_PROGRESS : "आपकी प्रगति प्रतिशत",
		FLAG : "रिपोर्ट",
		ERROR_EMPTY_RESULT : "खोज परिणाम अनुपलब्ध",
		ERROR_FLAG_CONTENT_MIN_REASON : " पाठ्यक्रम फ्लैग करने के लिए कम से कम एक कारण चुनें",
		ERROR_INVALID_EMAIL : "अमान्य ईमेल आईडी",
		MSG_RESOURCE_DELETED : "डिवाइस से सामग्री हटाई गई",
		LOGOUT : "साइन आउट",
		CREATOR_NAME_NOT_AVAILABLE : "निर्माता का नाम अनुपलब्ध है",
		ENROLL : "नामांकन",
		VIEW_ONGOING_BATCHES : "चल रहे बैचों को देखें",
		VIEW_UPCOMING_BATCHES : "आगामी बैचों देखें",
		USER_NAME_PROFILE : "उपयोगकर्ता नाम",
		BATCHES_FOR_THIS_COURSE : "इस पाठ्यक्रम के लिए बैचों",
		ERROR_EMPTY_FIELDS : "विवरण दर्ज करें",
		INVALID_CONTENT : "सामग्री अमान्य है",
		TIME_OUT : "सर्वर का समय समाप्त हुआ बाद में पुन: प्रयास करें",
		OPTIONAL : "ऐच्छिक",
		PERCENTAGE : "प्रतिशत",
		SUBJECTS : "विषयों",
		FROM : "से",
		TO : "यहाँ",
		SELECT_DATE : "तारीख़ चुनें",
		SAVE : "सेव्ड",
		GRADE : "ग्रेड",
		INSTITUION_NAME : "संस्था का नाम",
		BOARD_UNIVERSITY : "बोर्ड / विश्वविद्यालय",
		APPLY : "लागू करें",
		MY_COMMUNITIES : "मेरे समुदाय",
		AVAILABLE_FILTERS : "फ़िल्टर लागू करें",
		DISMISS : "रद्द",
		NO_FILTERS_SELECTED : "कोई फ़िल्टर चयनित नहीं है",
		ACCOMPLISHMENTS : "उपलब्धियों",
		ADD : "जोड़",
		PERSONAL_DETAILS : "व्यक्तिगत विवरण",
		AFFILIATIONS : "जुड़ाव",
		SHOW_LESS : "कम दिखाएं",
		SHOW_MORE : "और दिखाएं",
		CREATOR_OF : "के द्वारा बनाई गई",
		USERNAME : "उपयोगकर्ता नाम: %s",
		YOUR_PROFILE_IS : "आपकी प्रोफ़ाइल %s पूर्ण है",
		FOLLOW : "का पालन करें",
		PEOPLE_YOU_FOLLOW : "लॉग जिनका आप अनुसरण करते हो",
		GROUPS_YOU_FOLLOW : "जिन समूहों का आप अनुसरण करते हैं",
		PEOPLE_WHO_FOLLOW_YOU : "जो लोग आपका अनुसरण करते हैं",
		SKILL_TAGS : "कौशल टैग",
		ENDORSE : "संलग्न",
		MODULE_NAME : "मोड्यूल का नाम",
		NIL : "शून्य",
		PINNED_BY_ADMIN : "व्यवस्थापक द्वारा पिन किया गया",
		READ_MORE : "आगे पढ़े",
		THIS_IS_A_RESTRICTED_COMMUNITY : "यह एक सीमित समुदाय है",
		DOWNLOAD_CONFIRMATION_TEXT : "क्या आप डाउनलोड करना चाहते हैं?",
		YES : "हाँ",
		NO : "नहीं",
		CHOOSE_FROM_FOLLOWING : "निम्नलिखित से चुनें",
		LANGUAGES : "भाषाओं",
		COMING_SOON : "विवरण जल्द ही आ रहे हैं",
		TITLE_EDUCATION : "शिक्षा",
		TITLE_EXPERIENCES : "अनुभव",
		TITLE_ADDRESS : "पता",
		LAST_NAME : "कुलनाम ",
		LAST_NAME_HINT : "अपना कुलनाम दर्ज करें",
		NAME : "नाम",
		NAME_HINT : "अपना नाम दर्ज करें",
		GENDER : "लिंग",
		DATE_OF_BIRTH : "जन्म की तारीख",
		MODULES : "मॉड्यूल",
		BTN_CLICK_TO_OPEN_CONTENT : "पाठ्यक्रम देखने के लिए ऐप स्पर्श करें",
		START_COURSE : "प्रारंभ",
		ERROR_BATCH_NOT_STARTED : "बैच शुरू नहीं हुआ",
		MSG_NO_NEW_NOTIFICATION : "कोई नई सूचना नहीं",
		MSG_NO_DETAILS_TO_SHOW : "विवरण अनुपलब्ध",
		MSG_IMPORTED_SUCCESSFULLY : "पाठ्यक्रम सफलतापूर्वक आयातित",
		ERROR_CANT_OPEN_EMPTY_CONTENT : "पाठ्यक्रम अनुपलब्ध",
		ERROR_NO_BATCHES_FOUND : "बैच भी उपलब्ध नहीं है",
		ANSWER : "उत्तर ",
		BTN_SUBMIT : "प्रस्तुत करें",
		TOPIC_YOU_MIGHT_LIKE : "विषय चुनें जो आपकी रुचि है",
		OPEN_SETTINGS : "सेटिंग्स खोलें",
		LABEL_ADD_A_SKILL : "अपने कौशल बताये",
		TYPE_TO_ADD_A_SKILL : "अपने कौशल को बताने के लिए टाइप करें",
		ERROR_ALREADY_ADDED : "यह कौशल पहले से ही जोड़ा गया है। अब नए कौशल जोड़ें",
		WARNING_PLEASE_ADD_MANDATORY_DETAILS : "सभी अनिवार्य विवरण दर्ज करें",
		WARNING_INVALID_YEAR_OF_PASSING : "उत्तीर्ण वर्ष के लिए चार (yyyy) अंक दर्ज करें",
		WARNING_INVALID_PERCENTAGE : "प्रतिशत के लिए अंक (0-100) दर्ज करें",
		WARNING_INVALID_GRADE : "ग्रेड के लिए किसी भी एक वर्णमाला (ए-एफ) का चयन करें",
		INSTITUION_NAME : "संस्था का नाम",
		IS_THIS_YOUR_CURRENT_JOB : "यह आपकी वर्तमान नौकरी है",
		ERROR_MULTIPLE_CURRENT_JOB : "समाप्ति तिथि दर्ज करें",
		OPTION_INAPPROPRIATE_CONTENT : "अनुचित पाठ्यक्रम",
		OPTION_COPYRIGHT_VIOLATION : "कॉपीराइट उल्लंघन",
		OPTION_PRIVACY_VIOLATION : "गोपनीयता उल्लंघन",
		OPTION_OTHER : "अन्य",
		HOBBIES : "शौक",
		EDIT_PROFILE : "प्रोफाइल एडिट करें",
		ACTIVE : "सक्रिय",
		STORAGE : "संग्रहण अनुमति अस्वीकृत",
		PERMISSION_DENIED : "अनुमति अस्वीकृत",
		YEAR_OF_PASSING : "उत्तीर्ण वर्ष",
		SELECT_ADDRESS_TYPE : "पता प्रकार का चयन करें (स्थायी/अस्थायी )",
		CANCEL : "रद्द ",
		ERROR_NO_RESUME_CONTENT_AVAILABLE : "पाठ्यक्रम अनुपलब्ध",
		SELECT_LANGUAGE : "भाषा चुनिए",
		READ_LESS : "कम ",
		CONFIRM_DEL : "हटाने की पुष्टि करें?",
		ADDRESS_LINE1 : "पता पंक्ति 1",
		ADDRESS_LINE2 : "पता पंक्ति 2",
		CITY : "शहर",
		STATE : "राज्य",
		COUNTRY : "देश",
		PINCODE : "पिन कोड",
		PERMANENT : "स्थायी",
		CURRENT : "अस्थायी ",
		JOB_NAME : "व्यवसाय",
		ORGANIZATION : "संगठन",
		POSITION : "पद",
		CHOOSE_FROM_FOLLOWING : "चयन",
		PERMISSION_SETTING_MSG : "उपयुक्त अनुमति के लिए ओपन सेटिंग्स स्पर्श करें",
		DOWNLOADING : "डाउनलोड ",
		CHANGE_LANGUAGE : "भाषा बदलो",
	},
	"ta_IN" : {
		ALREADY_HAVE_ACC : "முன்னரே அக்கௌன்ட் இருக்கிறதா? சைன் இன் செய்யுங்கள்.",
		APPLY_FILTER : "பில்ட்டர் செய்க",
		AS_FILE : "கோப்பு வடிவத்தில் ",
		AS_LINK : "லின்க் வடிவத்தில்",
		BACK_TO_EXIT : "குறுஞ்செயிலி விட்டு வெளியேற பேக் பட்டனை மற்றொன்று முறை அழுத்தவும்.",
		CANCEL_DOWNLOAD : "டவுன்லோடை ரத்துசெய்",
		COMING_SOON : "விரைவில் வரும்.........",
		COMMUNITIES : "சமூகங்கள்",
		CONFIRM : "உறுதிசெய்யுங்கள்",
		COURSE : "கோர்ஸ்",
		COURSE_ENROLLED : "கோர்ஸ் பதிவு செய்யப்பட்டது",
		COURSE_PROGRESS_COMPLETED : "%s % முடிந்தது",
		CONTENT_FLAGGED_MSG : "வெற்றிகரமாகப் பாடம் பிளாக் செய்யப்பட்டது",
		CONTENT_FLAG_FAIL : "பாடத்தை பிளாக் செய்வது தோல்வியடைந்தது",
		COURSES_BNAV : "கோர்ஸ்கள்",
		COURSES_IN_PROGRESS : "கோர்ஸ்கள் மேம்படுகிறது",
		COURSES_LW : "கோர்ஸ்கள்",
		CREATED_BY : "உருவாக்கியவர்",
		DELETE : "அகற்று",
		DESCRIPTION : "விவரங்கள்",
		DOWNLOAD : "டவுன்லோட்",
		DOWNLOADS : "டவுன்லோடுகள்",
		EDIT : "திருத்து",
		EMAIL_ID : "மின்னஞ்சல் ஐடி",
		EMPTY_SEARCH_RESULTS : "உங்கள் தேடலுக்குறிய முடிவுகள் இல்லை",
		ENROLL_COURSE : "இந்த கோர்ஸை பதிவு செய்யுங்கள்",
		ERROR_CONTENT_NOT_AVAILABLE : "பாடம் கிடைக்கவில்லை",
		ERROR_CONTENT_NOT_FOUND : "பாடங்கள் இன்னும் சேர்க்கவில்லை",
		ERROR_DURATION_NOT_AVAILABLE : "கால நேரம் கிடைக்கவில்லை",
		ERROR_EMAIL_FORMAT : "தவறான மின்னஞ்சல் வடிவம் ",
		ERROR_EMPTY_EMAIL : "தங்கள் மின்னஞ்சல் ஐடி யை பதியுங்கள்",
		ERROR_EMPTY_FIRSTNAME : "தங்கள் பெயரை பதியுங்கள்",
		ERROR_EMPTY_LANGUAGE : "குறைந்தது ஒரு மொழியாவது தேர்வுசெயுங்கள்",
		ERROR_EMPTY_MOBILE : "தங்கள் கைபேசி எண்ணை பதியுங்கள்",
		ERROR_EMPTY_PASSWORD : "தங்கள் கடவுச்சொல்லை பதியுங்கள்",
		ERROR_EMPTY_USERNAME : "பயனர் பெயரை பதியுங்கள்",
		ERROR_FETCHING_DATA : "டேட்டா பெறுவதில் பிழை ஏற்பட்டுள்ளது",
		ERROR_NO_COURSES_ENROLLED : "எந்த கோர்ஸும் இன்னும் பதிவு செய்யப்படவில்லை",
		ERROR_NO_INTERNET_MESSAGE : "தங்கள் கைப்பேசி இணையத்திடம் இணைக்கப்படவில்லை.",
		ERROR_NO_OFFLINE_RESOURCE : "இன்னும்  ஆஃப்லைன் ரிசோர்ஸ எதுவும் இல்லை",
		ERROR_SERVER_CONNECTION : "சேவையகத்துடன் தொடர்புகொள்ள முடியவில்லை",
		ERROR_SERVER_MESSAGE : "பிழை",
		ERROR_SHORT_MOBILE : "தொலைப்பேசி எண் வடிவத்தைப் பரிசோதிக்கவும்",
		ERROR_SHORT_PASSWORD : "கடவுச்சொல்லை எட்டு எழுத்துக்களுக்குக் குறைவாக இருக்கமுடியாது",
		FETCHING_CONTENTS : "பாடங்கள் பெறுகிறது: %s %",
		FILE_SIZE : "அளவு [%s]",
		FILTER : "பில்டர்",
		FILTER_BY : "இதன் அடிப்படையில் பில்டர் செய்க",
		FIRST_NAME : "பெயர்",
		FIRST_NAME_HINT : "தங்கள் பெயரை பதிவுசெய்யுங்கள்",
		GROUPS : "குழுக்கள்",
		GROUPS_BNAV : "குழுக்கள்",
		HINT_EMAIL_ID : "sample@test.com",
		HINT_LANGUAGE : "தங்களுக்கு அனுகூலமான மொழியைத் தேர்வு செய்துகொள்ளுங்கள்",
		HINT_MOBILE_NUMBER : "தங்கள் தொலைப்பேசி எண்ணைப் பதிவு செயுங்கள்",
		HINT_PASSWORD : "கடவுச்சொல் குறைந்தது எட்டு எழுத்துக்கல் இருக்கவேண்டும்.",
		HINT_USER_NAME : "பயனர் பெயரை பதியுங்கள்",
		HOME_BNAV : "ஹோம்",
		JOIN : "சேறுங்கள்",
		LATEST_COURSES : "புதிய கோர்ஸ்கள்",
		LOADING_CONTENT : "பாடம் லோடாகிறது",
		LOGGED_OUT : "வெளியேற்றப்பட்டீர்கள்",
		MOBILE_NUMBER : "தொலைப்பேசி எண்",
		MODULE_SIZE : "மாடியுள் அளவு: %s",
		MODULE_SIZE_UNAVAILABLE : "மாடியுள் அளவு கிடைக்கவில்லை",
		NEW : "புதியது",
		NO_ACC_YET : "புது பயனரா? இப்போது பதிவு செய்க",
		NO_PREVIEW : "முன்னோட்ட தற்சமயம் காணமுடியாது",
		NUMBER_OF_VOTES : "மொத்த வாக்குகள்",
		OPEN : "திறன்டிடுங்கள்",
		PASSWORD : "கடவுச்சொல்லை",
		PHONE : "தொலைப்பேசி",
		PLAY : "பிளே",
		POPULAR_COURSES : "பிரபலமான கோர்ஸ்கள்",
		PREVIEWS : "முன்னோட்டங்கள்",
		PROFILE_BNAV : "ப்ரொபைல்",
		PROFILE_DETAILS_TITLE : "ப்ரொபைல் விவரங்கள்",
		PROFILE_LW : "ப்ரொபைல்",
		PUBLISHED_DATE : "வெளியிடப்பட்ட தேதி",
		QUIZ : "வினாடி வினா",
		RESOURCES_BNAV : "ரிசோர்ஸ்கள்",
		RESOURCES_LW : "ரிசோர்ஸ்கள்",
		RESUME : "விட்ட இடத்தில் இருந்து தொடருக",
		RETRY_ACTION : "மீண்டும் முயற்ச்சிக்கவும்",
		SAVED_ON : "சேமித்தவை",
		SAVED_RESOURCES : "சேமித்த ரிசோர்ஸ்கள்",
		SEARCH_HINT : "தேடு",
		SELECT : "தேர்வு செய்யுங்கள்",
		SELECT_A_REASON : "காரணத்தை தேர்வு செய்யுங்கள்",
		SERVER_CONNECTION_ERROR : "சேவையகத்துடன் தொடர்புகொள்ள முடியவில்லை",
		SHARE_THIS : "பகிருங்கள்",
		SIGN_IN : "சைன் இன்",
		SIGN_UP : "சைன் அப்",
		SORT_BY : "மூலம் வரிசைப்படுட்டுங்கள்",
		SPLASH_MESSAGE : "என்.சி.டி.சி திட்டம்",
		STRUCTURE : "அமைப்பு",
		TO_DO : "செய்ய வேண்டியவை",
		USER_NAME : "பயனர் பெயர்",
		VIEW_ALL : "அனைத்தையும் காட்டு",
		VIEW_ALL_COMMUNITIES : "தாங்கள் அங்கமாக இருக்கும் அனைத்து சமூகங்களையும் காட்டு",
		VIEW_MORE : "மேலும் காட்டு",
		WAIT_REQUEST : "தயவுசெய்து காத்திருக்கவும்",
		WELCOME_BACK : "மீண்டும் வருக %s",
		WELCOME_M1 : "என்.டி.பிக்கு வரவேற்கிறோம்",
		WELCOME_M2 : "கல்வியாளர்களுக்கான கட்டமைக்கப்பட்ட கல்வி",
		WELCOME_ON_BOARD : "என்.டி.பிக்கு வரவேற்கிறோம், %s",
		WHAT_WENT_WRONG : "என்ன தவறு நடந்தது?",
		YOUR_PROGRESS : "தங்கள் முன்னேற்றம்: %s%",
		FLAG : "குறி",
		ERROR_EMPTY_RESULT : "எந்த முடிவுகளும் தற்போது இல்லை",
		ERROR_FLAG_CONTENT_MIN_REASON : "தயவுசெய்து பாடத்தை குறித்ததுக்காக குறைந்தது ஒரு காரணத்தை தேர்வு செய்யுங்கள்",
		ERROR_INVALID_EMAIL : "தவறான மின்னஞ்சல் ஐடி",
		MSG_RESOURCE_DELETED : "தங்கள் சாதனத்தில் இருந்து   பாடம் அழிக்க பட்டது",
		LOGOUT : "லாக் அவுட்",
		CREATOR_NAME_NOT_AVAILABLE : "உருவாக்கியவர் பெயர் கிடைக்கவில்லை",
		ENROLL : "பதிவு செய்யுங்கள்",
		VIEW_ONGOING_BATCHES : "நடப்பு பச்சஸ்கலை பாருங்கள்",
		VIEW_UPCOMING_BATCHES : "வரப்போகும் பச்சஸ்கலை பாருங்கள்",
		USER_NAME_PROFILE : "பயனர் பெயர்",
		BATCHES_FOR_THIS_COURSE : "இந்த கோர்ஸுக்காண பச்சஸ்",
		ERROR_EMPTY_FIELDS : "விவரங்களை பதிவுசெய்யுங்கள்",
		INVALID_CONTENT : "தவறான பாடம்",
		TIME_OUT : "சேவையக நேரம் முடிந்தது, பிறகு மீண்டும் முயற்சிக்கவும்",
		OPTIONAL : "கட்டாயம் அற்றவை",
		PERCENTAGE : "சதவீதம்",
		SUBJECTS : "பாடங்கள்",
		FROM : "இருந்து",
		TO : "அங்கே",
		SELECT_DATE : "தேதி தேர்வுசெய்யுங்கள்",
		SAVE : "செவ் செய்யுங்கள்",
		GRADE : "வகுப்பு",
		INSTITUION_NAME : "இயக்க பெயர்",
		BOARD_UNIVERSITY : "வாரியம் / பல்கலைக்கழகம்",
		APPLY : "பில்ட்டர் செய்யுங்கள்",
		MY_COMMUNITIES : "என் சமுதாயங்கள்",
		AVAILABLE_FILTERS : "பில்ட்டர்கள்",
		DISMISS : "ரத்து செய்யுங்கள்",
		NO_FILTERS_SELECTED : "எந்த பில்டரும் ஆய்வு செய்யவில்லை",
		ACCOMPLISHMENTS : "சாதனைகள்/சிறப்புத் தகுதிகள்",
		ADD : "சேறு",
		PERSONAL_DETAILS : "சொந்த விவரங்கள்",
		AFFILIATIONS : "தொடர்புகள்",
		SHOW_LESS : "குறைபாக காட்டவும்",
		SHOW_MORE : "இன்னும் நிறைய காட்டவும்",
		CREATOR_OF : "உருவாக்கியவர்",
		USERNAME : "பயனர் பெயர்",
		YOUR_PROFILE_IS : "தங்கள் ப்ரொபைல் %s முடிந்தது",
		FOLLOW : "பின்பற்று",
		PEOPLE_YOU_FOLLOW : "நீங்கள் பின்பற்றும் நபர்கள்",
		GROUPS_YOU_FOLLOW : "நீங்கள் பின்பற்றும் குழுக்கள்",
		PEOPLE_WHO_FOLLOW_YOU : "உங்களை பின்பற்றும் நபர்கள்",
		SKILL_TAGS : "திறன் குறிச்சொற்கள்",
		ENDORSE : "ஆதரியுங்கள்",
		MODULE_NAME : "மாடியுளின் பெயர்",
		NIL : "எதுவும் இல்லை",
		PINNED_BY_ADMIN : "நிர்வாகிப்பவரால் பின் செய்யப்பட்டுள்ளது",
		READ_MORE : "அதிகம் படிக்க",
		THIS_IS_A_RESTRICTED_COMMUNITY : "இது ஒரு வரையறைப்படுத்திய சமுகம்",
		DOWNLOAD_CONFIRMATION_TEXT : "தங்கள் இதை டவுன்லோட் செய்ய விரும்புகிறீர்களா?",
		YES : "ஆம்",
		NO : "இல்லை",
		ABOUT_MODULE : "இந்த மாடியுளை பற்றி அறிய",
		CANCEL : "ரத்து",
		ERROR_NO_RESUME_CONTENT_AVAILABLE : "உள்ளடக்கத்தை மறுதொடக்கம் செய்வதில் பிழை இல்ல",
		SELECT_LANGUAGE : "மொழியைத் தேர்ந்தெடுக்கவும",
		READ_LESS : "குறைவாகப் படிக்கவும",
		CONFIRM_DEL : "நீக்குதலை உறுதிப்படுத்தவா?",
		ADDRESS_LINE1 : "முகவரி வரி 1",
		ADDRESS_LINE2 : "முகவரி வரி 2",
		CITY : "நகரம்்",
		STATE : "நிலைை",
		COUNTRY : "நாட்டின்",
		PINCODE : "அஞ்சல் குறியீட",
		PERMANENT : "நிரந்தர",
		CURRENT : "தற்போதைய",
		JOB_NAME : "வேலை பெயர",
		ORGANIZATION : "அமைப்பு",
		POSITION : "நிலை",
		CHOOSE_FROM_FOLLOWING : "தொடர்ந்து இருந்து தேர்வு",
		CHANGE_LANGUAGE : "மொழியை மாற்று",
	},
	"te_IN" : {
		ALREADY_HAVE_ACC : "అకౌంట్ ఉందా? లాగిన్ అవ్వండి",
		APPLY_FILTER : "ఫిల్టర్ చెయ్యండి",
		AS_FILE : "ఫైల్‌గా",
		AS_LINK : "లింకుగా",
		BACK_TO_EXIT : "ఆప్ బయటకు వెళ్ళడానికి మళ్ళీ నొక్కండి",
		CANCEL_DOWNLOAD : "డౌన్‌లోడ్ వద్దు",
		COMING_SOON : "త్వరలో...",
		COMMUNITIES : "కమ్యూనిటీలు",
		CONFIRM : "నిర్ధారించండి",
		COURSE : "కోర్సు",
		COURSE_ENROLLED : "కోర్సులో నమోదు అయ్యారు",
		COURSE_PROGRESS_COMPLETED : "%s % పూర్తయింది",
		CONTENT_FLAGGED_MSG : "కంటెంట్ ఫ్లాగ్ చెయ్యబడింది ",
		CONTENT_FLAG_FAIL : "కంటెంట్ ఫ్లాగ్ చెయ్యడం అవ్వలేదు",
		COURSES_BNAV : "కోర్సులు",
		COURSES_IN_PROGRESS : "జరుగుతున్న కోర్సులు",
		COURSES_LW : "కోర్సులు",
		CREATED_BY : "తయారుచేసినది",
		DELETE : "తొలగించు",
		DESCRIPTION : "వివరణ",
		DOWNLOAD : "డౌన్‌లోడ్",
		DOWNLOADS : "డౌన్‌లోడ్ సంఖ్య",
		EDIT : "మార్చు",
		EMAIL_ID : "ఈమెయిల్ ఐడీ",
		EMPTY_SEARCH_RESULTS : "వెతికినవి లేవు",
		ENROLL_COURSE : "ఈ కోర్సులో నమోదు చెయ్యి",
		ERROR_CONTENT_NOT_AVAILABLE : "కంటెంట్ అందుబాటులో లేదు",
		ERROR_CONTENT_NOT_FOUND : "కంటెంట్ దొరక లేదు",
		ERROR_DURATION_NOT_AVAILABLE : "వ్యవధి తెలియదు",
		ERROR_EMAIL_FORMAT : "ఈమెయిల్ ఫార్మేట్ తప్పుగా ఉంది ",
		ERROR_EMPTY_EMAIL : "ఈమెయిల్ ఇవ్వండి",
		ERROR_EMPTY_FIRSTNAME : "పేరు ఇవ్వండి",
		ERROR_EMPTY_LANGUAGE : "కనీసం ఒక భాషను ఎంచుకోండి",
		ERROR_EMPTY_MOBILE : "మొబైల్ నెంబరు ఇవ్వండి",
		ERROR_EMPTY_PASSWORD : "పాస్‌వర్డ్ ఇవ్వండి",
		ERROR_EMPTY_USERNAME : "వాడకందారు పేరు ఇవ్వండి",
		ERROR_FETCHING_DATA : "డాటా తెచ్చుకోడంలో ఏదో ఇబ్బంది వచ్చింది",
		ERROR_NO_COURSES_ENROLLED : "ఏ కోర్సులోనూ నమోదు కాలేదు",
		ERROR_NO_INTERNET_MESSAGE : "ఇంటర్నెట్టు లేదు",
		ERROR_NO_OFFLINE_RESOURCE : "దిగుమతి అయిన రిసోర్సులు లేవు",
		ERROR_SERVER_CONNECTION : "సర్వర్‌కి కనెక్షన్ లేదు",
		ERROR_SHORT_MOBILE : "మొబైల్ నెంబర్ 10 అంకెల సంఖ్య అయ్యుండాలి",
		ERROR_SHORT_PASSWORD : "పాస్‌వర్డ్ 8 అక్షరాల కన్నా తక్కువ ఉండలేదు",
		FETCHING_CONTENTS : "కంటెంటు వస్తోంది: %s %",
		FILE_SIZE : "కంటెంటు పరిమాణం",
		FILTER : "వడపోత-ఫిల్టర్",
		FILTER_BY : "వడపోత వివరాలు",
		FIRST_NAME : "పేరు",
		FIRST_NAME_HINT : "మీ పేరు ఇవ్వండి",
		GROUPS : "గుంపులు",
		GROUPS_BNAV : "గుంపులు",
		HINT_LANGUAGE : "కావలసిన భాషని ఎన్నుకోండి",
		HINT_MOBILE_NUMBER : "మొబైల్ నెంబరు ఇవ్వండి",
		HINT_PASSWORD : "పాస్‌వర్డ్ కనీసం 8 అక్షరాల ఉండాలి",
		HINT_USER_NAME : "వాడకందారు పేరు ఇవ్వండి ",
		HOME_BNAV : "మొదటి పేజీ",
		JOIN : "చేరండి",
		LATEST_COURSES : "తాజా కోర్సులు",
		LOADING_CONTENT : "కంటెంటు లోడ్ అవుతోంది",
		LOGGED_OUT : "లాగౌట్ అయ్యారు",
		MOBILE_NUMBER : "మొబైల్ నెంబరు",
		MODULE_SIZE : "మాడ్యూల్ పరిమాణం",
		MODULE_SIZE_UNAVAILABLE : "మాడ్యూల్ పరిమాణం దొరకలేదు",
		NEW : "కొత్తది",
		NO_ACC_YET : "కొత్త వాడకందారా? లాగిన్ తయారు చేసుకోండి",
		NO_PREVIEW : "ప్రివ్యూ లేదు",
		NUMBER_OF_VOTES : "ఓట్ల సంఖ్య",
		OPEN : "తెరువండి",
		PASSWORD : "పాస్‌వర్డ్",
		PHONE : "ఫోను",
		PLAY : "ప్లే చెయ్యండి",
		POPULAR_COURSES : "జనాదరణ పొందిన కోర్సులు",
		PREVIEWS : "ప్రివ్యూలు",
		PROFILE_BNAV : "ప్రొఫైలు",
		PROFILE_DETAILS_TITLE : "ప్రొఫైల్ వివరాలు",
		PROFILE_LW : "ప్రొఫైలు",
		PUBLISHED_DATE : "ప్రచురించిన తేదీ",
		QUIZ : "క్విజ్",
		RESOURCES_BNAV : "రిసోర్సులు",
		RESOURCES_LW : "రిసోర్సులు",
		RESUME : "మళ్ళీ మొదలుపెట్టు",
		RETRY_ACTION : "మరోసారి ప్రయత్నించండి",
		SAVED_ON : "సేవ్ చేసిన తేదీ",
		SAVED_RESOURCES : "సేవ్ అయిన రిసోర్సులు",
		SEARCH_HINT : "వెతకండి",
		SELECT : "ఎన్నుకోండి",
		SELECT_A_REASON : "కారణం ఎన్నుకోండి",
		SERVER_CONNECTION_ERROR : "సర్వర్‌కి కనెక్షన్ లేదు",
		SHARE_THIS : "షేర్ చెయ్యండి",
		SIGN_IN : "లాగిన్ అవ్వండి",
		SIGN_UP : "లాగిన్ తయారుచేసుకోండి",
		SORT_BY : "క్రమంలో పెట్టండి",
		SPLASH_MESSAGE : "ఎన్.సి.టి.ఇ  ప్రాజెక్టు ",
		STRUCTURE : "నిర్మాణం",
		TO_DO : "చెయ్య వలసినవి",
		USER_NAME : "వాడకందారు పేరు",
		VIEW_ALL : "పూర్తిగా చూడండి",
		VIEW_ALL_COMMUNITIES : "మీరు నమోదైన కమ్యూనిటీలను చూడండి",
		VIEW_MORE : "మరిన్ని చూడండి",
		WAIT_REQUEST : "దయచేసి వేచి ఉండండి",
		WELCOME_BACK : "%s - మీకు తిరిగి స్వాగతం",
		WELCOME_M1 : "ఎన్‌టిపికి స్వాగతం",
		WELCOME_M2 : "అధ్యాపకులకు నిర్మాణాత్మక అధ్యాపనం",
		WELCOME_ON_BOARD : "ఎన్‌టిపికి స్వాగతం, %s",
		WHAT_WENT_WRONG : "ఏం పొరపాటు జరిగింది?",
		YOUR_PROGRESS : "మీ ప్రగతి: %s%",
		FLAG : "ఫ్లాగ్/రిపోర్టు చెయ్యండి",
		ERROR_EMPTY_RESULT : "వెతుకులాటకు ఫలితాలు లేవు",
		ERROR_FLAG_CONTENT_MIN_REASON : "కంటెంటు ఫ్లాగ్ చెయ్యడానికి కనీసం ఒక కారణాన్ని ఎన్నుకోండి.",
		ERROR_INVALID_EMAIL : "ఇమెయిల్ ఐడి సరికాదు",
		MSG_RESOURCE_DELETED : "కంటెంటు తొలగించబడింది",
		LOGOUT : "లాగౌట్",
		CREATOR_NAME_NOT_AVAILABLE : "తయారుచేసిన వారి పేరు లేదు",
		ENROLL : "నమోదు కండి",
		VIEW_ONGOING_BATCHES : "జరుగుతున్న బ్యాచులు చూడండి",
		VIEW_UPCOMING_BATCHES : "రాబోతున్న బ్యాచులు చూడండి",
		USER_NAME_PROFILE : "వాడకందారు పేరు",
		BATCHES_FOR_THIS_COURSE : "ఈ కోర్సుకు సంబంధించిన బ్యాచులు",
		ERROR_EMPTY_FIELDS : "వివరాలు ఇవ్వండి",
		INVALID_CONTENT : "కంటెంటు సరిగా లేదు",
		TIME_OUT : "సర్వర్ ఎక్కువ సమయం తీసుకుంటోంది. తరువాత మళ్ళీ ప్రయత్నించండి",
		OPTIONAL : "ఐచ్ఛికము",
		PERCENTAGE : "శాతం",
		SUBJECTS : "పాఠ్యాంశాలు",
		FROM : "మొదలు తేదీ",
		TO : "చివరి తేదీ",
		SELECT_DATE : "తేదీ ఇవ్వండి",
		SAVE : "సేవ్ చెయ్యండి",
		GRADE : "తరగతి",
		INSTITUION_NAME : "సంస్థ పేరు",
		BOARD_UNIVERSITY : "బోర్డు/విశ్వవిద్యాలయం",
		APPLY : "ఫిల్టర్ చెయ్యండి",
		MY_COMMUNITIES : "నా కమ్యూనిటీలు",
		AVAILABLE_FILTERS : "ఉన్న ఫిల్టర్లు",
		DISMISS : "రద్దు చెయ్యండి",
		NO_FILTERS_SELECTED : "ఫిల్టర్ ఎన్నుకోలేదు",
		ACCOMPLISHMENTS : "సాధించిన ఫలితాలు",
		ADD : "కలుపు",
		PERSONAL_DETAILS : "వ్యక్తిగత వివరాలు",
		AFFILIATIONS : "అనుబంధాలు",
		SHOW_LESS : "తక్కువ చూపించు",
		SHOW_MORE : "ఇంకా చూపించు",
		USERNAME : "వాడకందారు పేరు",
		YOUR_PROFILE_IS : "మీ ప్రొఫైలు",
		FOLLOW : "అనుసరించండి",
		PEOPLE_YOU_FOLLOW : "మీరు అనుసరిస్తున్న వ్యక్తులు",
		GROUPS_YOU_FOLLOW : "మీరు అనుసరిస్తున్నగుంపులు",
		PEOPLE_WHO_FOLLOW_YOU : "మిమ్మల్ని అనుసరిస్తున్న వ్యక్తులు",
		SKILL_TAGS : "నైపుణ్యపు గుర్తులు",
		ENDORSE : "ఆమోదించండి",
		MODULE_NAME : "మాడ్యూల్ పేరు",
		NIL : "ఏమీ లేదు",
		PINNED_BY_ADMIN : "నిర్వాహకుడు పిన్ చేసినది",
		READ_MORE : "ఇంకా చదవండి...",
		THIS_IS_A_RESTRICTED_COMMUNITY : "ఇది కొందరికే పరిమితమైన కమ్యూనిటీ",
		DOWNLOAD_CONFIRMATION_TEXT : "డౌన్‌లోడ్ చెయ్యాలా?",
		YES : "అవును",
		NO : "కాదు",
		ABOUT_MODULE : "ఈ మాడ్యూల్ గురించి",
		CHOOSE_FROM_FOLLOWING : "ఈ కిందవాటినుండి ఎంచుకోండి",
		LANGUAGES : "భాషలు",
		COMING_SOON : "వివరాలు త్వరలో...",
		CANCEL : "రద్దు",
		ERROR_NO_RESUME_CONTENT_AVAILABLE : "కంటెంట్ పునఃప్రారంభం అందుబాటులో లేనందున",
		SELECT_LANGUAGE : "భాషను ఎంచుకోండి",
		READ_LESS : "తక్కువ చదవండి",
		CONFIRM_DEL : "తొలగించాలా?",
		ADDRESS_LINE1 : "చిరునామా పంక్తి 1",
		ADDRESS_LINE2 : "చిరునామా లైన్ 2",
		CITY : "సిటీ",
		STATE : "రాష్ట్రం",
		COUNTRY : "దేశం",
		PINCODE : "పిన్ కోడ్",
		PERMANENT : "శాశ్వత",
		CURRENT : "ప్రస్తుత",
		JOB_NAME : "ఉద్యోగ పేర",
		ORGANIZATION : "సంస్థ",
		POSITION : "స్థానం",
		CHOOSE_FROM_FOLLOWING : "కింది నుండి ఎంచుకోండి",
		CHANGE_LANGUAGE : "భాష మార్చు",
	},
	"bn_IN" : {
	},
	"ml_IN" : {
	},
	"or_IN" : {
	},
	"gu_IN" : {
	},
	"kn_IN" : {
	},
	"as_IN" : {
	},
	"mr_IN" : {
	},
	"pa_IN" : {
	},
	"ur_IN" : {
	}
}

var decideString = function(){
	var val = window.__CurrentLanguage;
	var merged = {};
	return objectAssign({},merged,stringsRes["en_US"],stringsRes[val]);
}


var setLanguage = function(lang){
	window.__CurrentLanguage = lang;
	JBridge.setKey("languagePref",lang);
}


exports.setLanguage = setLanguage;
exports.strings = decideString;
exports.stringsRes = stringsRes;
