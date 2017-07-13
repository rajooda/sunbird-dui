
module Main where

import Control.Monad.Aff
import Prelude (bind, ($), (<>), pure, discard)
import Control.Monad.Except.Trans (runExceptT)
import Utils
import Control.Monad.Eff (Eff)
import Control.Monad.Aff (launchAff)
import Control.Monad.Eff.Console
import Control.Monad.Eff.Class(liftEff)
import Data.Foreign.Class (class Decode, class Encode, encode)
import Data.Maybe
import Flows.CommunityFlow
import Flows.CourseFlow
import Flows.ProfileFlow
import Flows.ResourceFlow
import Flows.HomeFlow
import Flows.FilterFlow
import Flows.NotificationFlow
import Data.Generic.Rep (class Generic)
import Data.Foreign.Generic (encodeJSON)
import Control.Monad.Eff.Exception (EXCEPTION)
import Prelude
import Types.UITypes
import Types.APITypes
import UI


main :: Eff (exception::EXCEPTION, ui::UI, console::CONSOLE) Unit
main = void $ launchAff $ begin


begin :: Aff(ui::UI,console::CONSOLE) String
begin = do
  action <- ui $ InitScreen
  case action of
    StartInit -> userScreenFlow
    _ -> pure $ "aborted"


userScreenFlow = do
  action <- ui UserScreen
  case action of
    LoginApiAction{userName:x,userPass:y} -> do
      responseData <- userLogin x y
      --userScreenFlow {state:"tab3"}
      _ <- sendUpdatedState {response : responseData, responseFor : "LoginApiAction", screen:"asas"} 
      pure $ "Aborted 3"
    SignUpApiAction{userName:x1,email:x2,firstName:x3,password:x4,mobileNumber:x5,language:x6} -> do
      --liftEff $ log "FOR UN :" <> x <> " PASS :" <> y
      responseData <- userSignup x1 x2 x3 x4 x5 x6
      --userScreenFlow {state:"tab3"}
      _ <- sendUpdatedState {response : responseData, responseFor : "SignUpApiAction", screen:"asas"} 
      pure $ "Aborted 3"
    LoginAction -> do
      liftEff $ log $ "LoginAction"
      cFlow
    _ -> pure $ "Aborted"

cFlow = do
  liftEff $ log $ "Its in cFlow"
  action <- ui $ HomeScreen
  case action of
    ShowHome {name:x} -> do
      liftEff $ log $ "Action handled Show HomeScreen"
      pure $ "action handled"
    StartCourseFlow -> startCourseFlow action 
    StartResourceFlow -> startResourceFlow "Dummy"
    StartCommunityFlow -> startCommunityFlow action
    StartProfileFlow -> startProfileFlow action
    StartNotificationFlow -> startNotificationFlow action
    StartCoursePageApi -> do
                  liftEff $ log $ "START COURSE PAGE API"
                  responseData <- getCoursesPageApi
                  _ <- sendUpdatedState {response : responseData, responseFor : "StartCoursePageApi", screen:"asas"} 
                  pure $ "handled"
    StartResourcePageApi -> do
                  liftEff $ log $ "START RESOURCE PAGE API"
                  responseData <- getResourcePageApi
                  _ <- sendUpdatedState {response : responseData, responseFor : "StartResourcePageApi", screen:"asas"}
                  pure $ "handled"
    StartProfileApi -> do
                  liftEff $ log $ "START RESOURCE PAGE API"
                  responseData <- getProfileDetail
                  _ <- sendUpdatedState {response : responseData, responseFor : "StartProfileApi", screen:"asas"}
                  pure $ "handled"                  
    StartSearchFlow {filterDetails : details} -> startHomeSearchFlow details 

    _ -> pure $ "aborted"

changeFlow = void $ launchAff $ cFlow

