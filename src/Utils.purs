

module Utils where

import Prelude
import Data.String
import Data.List (List(..), fromFoldable)
import Data.List.Types
import Data.Identity
import Data.Foreign.Index
import Data.NonEmpty (NonEmpty(..), singleton, head, tail, (:|))
import Data.Foldable
import Data.Array
import Control.Monad.Eff
import Control.Monad.Aff (launchAff, Aff, makeAff, attempt)
import Control.Monad.Eff.Exception (Error, error, try)
import Control.Monad.Eff.Class (liftEff)
import Network.HTTP.StatusCode
import Network.HTTP.RequestHeader
import Data.HTTP.Method (Method(..))
import Data.Either
import Data.Maybe
import Data.Foreign
import Data.Foreign.Class
import Data.Foreign.Generic
import Data.Foreign.Index
import Data.Argonaut.Core as A
import Data.StrMap as StrMap
import Data.Tuple
import Control.Monad.Except.Trans
import Partial.Unsafe
import Data.Bifoldable
import Control.Monad.Eff.Class(liftEff)
import Control.Monad.Aff
import Prelude
import Control.Monad.Eff (Eff,kind Effect)
import Control.Monad.Aff.Class (liftAff)
import Control.Monad.Aff.Console
import Control.Monad.Except (runExcept, throwError)
import Control.Monad.Except.Trans (ExceptT(..))
import Data.Either (Either(..))
import Data.Foreign (Foreign, ForeignError(..), F)
import Data.Foreign.Class (class Decode, class Encode)
import Data.Foreign.Generic (decodeJSON, defaultOptions, encodeJSON, genericDecode, genericEncode)
import Data.Foreign.Generic.Class (class GenericDecode, class GenericEncode)
import Data.Foreign.Generic.Types (SumEncoding)
import Data.Generic.Rep (class Generic)
import Data.Generic.Rep.Show (genericShow)
import Data.Identity (Identity(..))
import Data.List.NonEmpty (NonEmptyList(..))
import Utils
import UI

foreign import ui' :: forall a c e. (Error -> Eff e Unit) -> (a -> Eff e Unit) -> c -> String -> Eff e Unit


-- getEulerLocation = "https://qa.ekstep.in"


--getEulerLocation1 = "http://52.172.36.121:9000"
-- getApiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkMTc1MDIwNDdlODc0ODZjOTM0ZDQ1ODdlYTQ4MmM3MyJ9.7LWocwCn5rrCScFQYOne8_Op2EOo-xTCK5JCFarHKSs"


type State a = {screen :: String |a}

type AffError e = (Error -> Eff e Unit)
type AffSuccess s e = (s -> Eff e Unit)
type ApiResponse = {status :: Array String, statusCode :: Int, response :: A.Json}
type ExceptionableAff e a = ExceptT Error (Aff e) a
type ExceptionableEff e a = ExceptT Error (Eff e) a

foreign import showUI' :: forall e a b. (AffSuccess (State a) e) -> (AffError e) -> (State b) -> Boolean -> Eff e Unit
foreign import callbackListner' :: forall e a b. (AffSuccess ({|a}) e) -> (AffError e) -> ({|b}) -> Boolean -> Eff e Unit
foreign import updateState' :: forall a b s1 s2 e. (AffSuccess (State s2) e) -> (AffError e) -> a -> (State s1) -> Eff e Unit
foreign import callAPI' :: forall e. (AffSuccess ApiResponse e) -> (AffError e) -> Method -> String -> A.Json -> Array RequestHeader -> Eff e Unit



foreign import log' :: String -> String -> String
duiLog :: String ->String -> String
duiLog tag value = log' tag value

foreign import sendUpdatedState' :: forall a b.(State a)-> b
foreign import saveToMemory :: String -> String -> Unit
foreign import readFromMemory :: String -> String
foreign import getJsonFromString :: String -> A.Json
foreign import getApiUrl :: Unit -> String
foreign import getApiUrl1 :: Unit -> String
foreign import getUserToken :: Unit -> String
foreign import getUserAccessToken :: Unit -> String
foreign import getChannelId :: Unit -> String
foreign import isChannelIdSet :: Unit -> Boolean

getEulerLocation1 = getApiUrl unit
getEulerLocation2 = getApiUrl1 unit

sendUpdatedState state = sendUpdatedState' state

get path headers =
  makeAff(\error success -> callAPI' success error GET ((getEulerLocation1) <> path) (A.jsonEmptyObject) headers')
  where headers' = cons (RequestHeader "Content-Type" "application/json") headers

get1 path headers =
  makeAff(\error success -> callAPI' success error GET ((getEulerLocation2) <> path) (A.jsonEmptyObject) headers')
  where headers' = cons (RequestHeader "Content-Type" "application/json") headers

post path headers body =
  makeAff(\error success -> callAPI' success error POST ((getEulerLocation1) <> path) body headers')
  where headers' = cons (RequestHeader "Content-Type" "application/json") headers


showUI screen state = ExceptT $ pure <$>
  let updatedState = state {screen = screen} in
  makeAff (\error success -> showUI' success error updatedState false)

genericUI :: forall a b e. Encode b => Decode b => a -> Array b -> Aff (ui::UI|e) b
genericUI a b = do
  res <- makeAff (\err sc -> (ui' err sc a (encodeJSON b)))
  isValidAction res

updateState changes state = makeAff(\error success -> updateState' success error changes state)

getUserId ::String
getUserId = readFromMemory "user_id"

getFilterParams isSet = if isSet
                    then [(Tuple "status" (A.fromString "Live")),(Tuple "channel" (A.fromString (getChannelId unit)))]
                    else [(Tuple "status" (A.fromString "Live"))]


--API CALLS
generateRequestHeaders user_access_token api_token=
  let filtered = filter (\x -> not $ snd(x) == "__failed")  [(Tuple "Authorization" ("Bearer " <> api_token))
                                                            ,(Tuple "x-authenticated-user-token" user_access_token) --getUserToken
                                                            ,(Tuple "Accept" "application/json")
                                                            ,(Tuple "Content-Type" "application/json")
                                                            ] in
  map (\x -> (RequestHeader (fst x) (snd x))) filtered


getDummyHeader api_token=
  let filtered = filter (\x -> not $ snd(x) == "__failed")  [(Tuple "Authorization" ("Bearer " <> api_token))
                                                            ,(Tuple "Accept" "application/json")
                                                            ,(Tuple "Content-Type" "application/json")
                                                            ] in
  map (\x -> (RequestHeader (fst x) (snd x))) filtered



-- enrollCourse user_access_token courseId api_token =
--   let requestUrl = "/course/v1/enrol"
--       headers = (generateRequestHeaders user_access_token api_token)
--       payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
--                                                    ,(Tuple "ts" (A.fromString "2013/10/15 16:16:39"))
--                                                    ,(Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "courseId" (A.fromString courseId))
--                                                                                                           , (Tuple "courseName" (A.fromString "Teacher Training Course"))
--                                                                                                           , (Tuple "description" (A.fromString "course description"))
--                                                                                                           , (Tuple "delta" (A.fromString "delta"))
--                                                                                                           , (Tuple "userId" (A.fromString user_access_token))
--                                                                                                           ])))
--                                                    ]) in
--  (post requestUrl headers payload)

enrollInBatch bodyToSend user_access_token api_token =
  let requestUrl = "/course/v1/enrol"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
        ,(Tuple "ts" (A.fromString "2013/10/15 16:16:39"))
        ,(Tuple "request" (getJsonFromString bodyToSend))
        ]) in
  (post requestUrl headers payload)



getCoursesPageApi user_access_token api_token =
  let filterParams = getFilterParams $ isChannelIdSet unit
      requestUrl = "/data/v1/page/assemble"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "name" (A.fromString "Course"))
                                                                                                          , (Tuple "source" (A.fromString "web"))
                                                                                                          , (Tuple "filters" (A.fromObject (StrMap.fromFoldable filterParams)))
                                                                                                          ])))
                                                   ]) in
  (post requestUrl headers payload)

getResourcePageApi user_access_token api_token =
  let filterParams = getFilterParams $ isChannelIdSet unit
      requestUrl = "/data/v1/page/assemble"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "name" (A.fromString "Resource"))
                                                                                                          , (Tuple "source" (A.fromString "web"))
                                                                                                          , (Tuple "filters" (A.fromObject (StrMap.fromFoldable filterParams)))
                                                                                                          ])))
                                                   ]) in
  (post requestUrl headers payload)

getCourcePageFilterApi user_access_token api_token filter_to_use=
  let requestUrl = "/data/v1/page/assemble"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "name" (A.fromString "Course"))
                                                                                                          , (Tuple "source" (A.fromString "web"))
                                                                                                          , (Tuple "filters" (getJsonFromString filter_to_use))

                                                                                                          ])))
                                                   ]) in
  (post requestUrl headers payload)


-- getContentStatus courseId user_access_token api_token =
--   let requestUrl = "/course/v1/content/state/read"
--       headers = (generateRequestHeaders user_access_token api_token)
--       payload = A.fromObject (StrMap.fromFoldable [(Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "userId" (A.fromString user_access_token))
--                                                                                                           , (Tuple "courseIds" (A.fromArray [(A.fromString courseId)]))
--                                                                                                           ])))
--                                                    ]) in
--   (post requestUrl headers payload)

flagContent user_access_token api_token request identifier=
  let requestUrl = "/content/v1/flag/" <> identifier
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [(Tuple "request" (getJsonFromString request))
                                                   ]) in
  (post requestUrl headers payload)


getResourcePageFilterApi user_access_token api_token filter_to_use=
  let requestUrl = "/data/v1/page/assemble"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (A.fromObject (StrMap.fromFoldable  [ (Tuple "name" (A.fromString "Resource"))
                                                                                                          , (Tuple "source" (A.fromString "web"))
                                                                                                          , (Tuple "filters" (getJsonFromString filter_to_use))

                                                                                                          ])))
                                                   ]) in
  (post requestUrl headers payload)

searchUser user_access_token api_token filter_to_use=
  let requestUrl = "/user/v1/search"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (getJsonFromString filter_to_use))
                                                   ]) in
  (post requestUrl headers payload)

compositeSearch user_access_token api_token filter_to_use=
  let requestUrl = "/composite/v1/search"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (getJsonFromString filter_to_use))
                                                   ]) in
  (post requestUrl headers payload)

getBatchList user_access_token api_token request_body=
  let requestUrl = "/course/v1/batch/list"
      headers = (generateRequestHeaders user_access_token api_token)
      payload = A.fromObject (StrMap.fromFoldable [ (Tuple "id" (A.fromString "unique API ID"))
                                                   , (Tuple "ts" (A.fromString "2013/10/15 16:16:3"))
                                                   , (Tuple "request" (getJsonFromString request_body))
                                                   ]) in
  (post requestUrl headers payload)




getBatchDetails user_access_token api_token batch_id=
  let requestUrl = "/course/v1/batch/read/" <> batch_id
      headers = (generateRequestHeaders user_access_token api_token) in
  (get requestUrl headers)



getUserEnrolledCourses user_access_token api_token =
  let requestUrl = "/course/v1/user/enrollment/list/" <> (getUserToken unit)
      headers = (generateRequestHeaders user_access_token api_token) in
  (get requestUrl headers)

getProfileDetail user_access_token api_token =
  let requestUrl = "/user/v1/read/" <> (getUserToken unit) <> "?fields=completeness,missingFields,lastLoginTime"
      headers = (generateRequestHeaders user_access_token api_token) in
  (get requestUrl headers)

getUserDetail user_id api_token =
  let requestUrl = "/user/v1/read/" <> user_id
      headers = (generateRequestHeaders (getUserAccessToken unit) api_token) in
  (get requestUrl headers)

getTenantDetail user_access_token api_token slug =
  let requestUrl = "/v1/tenant/info/" <> slug
      headers = (generateRequestHeaders user_access_token api_token) in
  (get1 requestUrl headers)

userSignup request api_token =
  let requestUrl = "/user/v1/create"
      headers = (getDummyHeader api_token)
      payload = A.fromObject (StrMap.fromFoldable [(Tuple "request" (getJsonFromString request))
                                                   ]) in
  (post requestUrl headers payload)


getExceptT value = ExceptT $ pure $ Right value
