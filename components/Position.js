import * as Location from 'expo-location';
import Weather from './Weather';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Position() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setlongitude] = useState(0)
    const [message, setMessage] = useState('Retreiving location...')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted.")
                } else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setlongitude(position.coords.longitude)
                    setMessage('Location retrieved')
                }
            } catch (error) {
                setMessage("Error retrieving location.")
                console.log(error)
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <View>
            <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    coords: {
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });