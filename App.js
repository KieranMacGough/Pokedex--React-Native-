// import { StatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import globalStyles from './styles/globalStyles.js';
import Home from './components/Home.js';

export default function App() {

  return (
    <>
        <View style={styles.container}>
          <Home />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: StatusBar.currentHeight 
  }
})