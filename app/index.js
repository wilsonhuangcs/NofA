import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'

const Home = () => {
    const router = useRouter();
    const [currProfilePic, setCurrProfilePic] = useState(null);
    const handleProfilePicChange = (newProfilePic) => {
        console.log("New profile pic:", newProfilePic);
        setCurrProfilePic(newProfilePic);
      }; 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options = {{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    // headerLeft: () => (
                    //     <Nearbyjobs iconUrl={icons.menu} dimension = '60%' />
                    // ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                        dimension="100%"
                        setCurrProfilePic={handleProfilePicChange}
                        currProfilePic={currProfilePic}
                    />
                    ),
                    headerTitle: "Nails of America"
                }}
            /> 
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium
                }}
            >
                <Welcome />
                <Popularjobs currProfilePic={currProfilePic} />

            </View>
        </SafeAreaView>
    )
}

export default Home;