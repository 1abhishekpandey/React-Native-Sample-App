import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import rc, { RUDDER_LOG_LEVEL } from "@rudderstack/rudder-sdk-react-native";
import amplitude from "@rudderstack/rudder-integration-amplitude-react-native";
import appcenter from "@rudderstack/rudder-integration-appcenter-react-native";
import braze from "@rudderstack/rudder-integration-braze-react-native";
import clevertap from "@rudderstack/rudder-integration-clevertap-react-native";
import firebase from "@rudderstack/rudder-integration-firebase-react-native";
import moengage from "@rudderstack/rudder-integration-moengage-react-native";
import singular from "@rudderstack/rudder-integration-singular-react-native";
import appsflyer, {
  setOneLinkCustomDomains,
  setOptions,
} from "@rudderstack/rudder-integration-appsflyer-react-native";

const initialization = async () => {
  // TODO: get all secret details in .env file
  setOptions({
    devKey: "K5KLBfHL8S9jYRLwwDzcXH",
    isDebug: true,
    onInstallConversionDataListener: true,
    appleAppId: "id111145894",
  });

  const config = {
    dataPlaneUrl: "https://rudderstacbumvdrexzj.dataplane.rudderstack.com",
    trackAppLifecycleEvents: true,
    autoCollectAdvertId: true,
    recordScreenViews: true,
    logLevel: RUDDER_LOG_LEVEL.VERBOSE,
    withFactories: [
      appsflyer,
      amplitude,
      appcenter,
      braze,
      clevertap,
      firebase,
      moengage,
      singular,
    ],
  };

  const options = {
    externalIds: [
      {
        id: "2d31d085-4d93-4126-b2b3-94e651810673",
        type: "brazeExternalId",
      },
    ],
  };

  const props = {
    k1: "v1",
    k2: "v3",
    k3: "v3",
    name: "Miraj",
  };

  await rc.setup("20V6fgE2zxiBhzWQ7tzjycqFMY0", config);

  await rc.identify(
    "sanityId_iOS",
    {
      email: "sanityuseriOS@example.com",
      location: "UK",
    },
    options
  );
  await rc.track("WOOOW Sanity iOS", props);
  await rc.screen("WOOOW Sanity screen iOS", props);

  await rc.track("WOOOW React Native event", props);
  await rc.screen("WOOOW React Native screen", props);
  // await rc.group("group ID");
  // await rc.alias('test_userIdAndroid', "alias android newUserId");
  // await rc.flush();

  setOneLinkCustomDomains(
    "desu.rudderstack.com",
    () => {
      console.log("Successfully set");
    },
    () => {
      console.log("Failed to set");
    }
  );
};

export default function App() {
  useEffect(() => {
    const awaitInitialization = async () => {
      initialization();
    };

    awaitInitialization().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
