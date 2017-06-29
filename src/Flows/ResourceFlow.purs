module Flows.ResourceFlow where

import Control.Monad.Aff
import Prelude (bind, ($), (<>), pure, discard)
import Control.Monad.Except.Trans (runExceptT)
import Utils
import Control.Monad.Eff (Eff)
import Control.Monad.Aff (launchAff)
import Control.Monad.Eff.Console
import Control.Monad.Eff.Class(liftEff)
import Data.Foreign.Class (class Decode, class Encode, encode)
import Data.Generic.Rep (class Generic)
import Flows.NotificationFlow
import Data.Foreign.Generic (encodeJSON)
import Control.Monad.Eff.Exception (EXCEPTION)
import Prelude
import PureTypes
    	

startResourceFlow state = do
	state <- ui $ HomeScreen
	case state of
		StartNotificationFlow -> startNotificationFlow state
		StartResourceDetailFlow -> startResourceDetailFlow state
		_ -> pure $ "default"




startResourceDetailFlow state = do
	state <- ui $ ResourceDetailScreen
	case state of
		DummyResourceDetailAction -> pure $ "handled"
		_ -> pure $ "default"