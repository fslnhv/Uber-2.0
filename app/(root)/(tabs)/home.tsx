import { Text, View } from "react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useUser();
  return (
    <SafeAreaView>
      <View>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </SignedIn>
        <SignedOut>
          <Link href="../../(auth)/sign-in.tsx">
            <Text>Sign In</Text>
          </Link>
          <Link href="../../(auth)/sign-up.tsx">
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
};
export default Home;
