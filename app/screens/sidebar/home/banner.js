import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get("window");
const height = 150;

const images = [
    "1",
    "2",
    "3",
    "4"
]

export default class Banner extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state ={
            active: 0
        }
      }

    setInt = null

      componentDidMount(){
        this.setInt = setInterval(() => {
              this.setState(prev => ({active: prev.active === images.length -1 ? 0 : prev.active + 1}),
              () => {
                this.scrollRef.current.scrollTo({
                    animated: true,
                    y:0,
                    x: width * this.state.active
                })
              })
          }, 3000)
      }

      componentWillUnmount(){
        clearInterval(this.setInt)
      }

    change = event =>{
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const active = Math.floor(contentOffset / viewSize);
        this.setState({
            active
        })
    }

    render() {
        return (
            <View style={style.container}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    onMomentumScrollEnd={this.change}
                    ref={this.scrollRef}
                    showsHorizontalScrollIndicator={false}
                    style={style.scroll}>
                    <Image
                        source={require("../../../../assets/banner-restaurante-keola.jpg")}
                        style={style.imagen}
                    ></Image>
                    <Image
                        source={require("../../../../assets/ANUNCIOS-BANNERS-KEOLA.jpg")}
                        style={style.imagen}
                    ></Image>
                    <Image
                        source={require("../../../../assets/Reloj-Banner-Keola.jpg")}
                        style={style.imagen}
                    ></Image>
                    <Image
                        source={require("../../../../assets/Casa-banner-keola.jpg")}
                        style={style.imagen}
                    ></Image>
                    
                </ScrollView>
                <View style={style.pagination}>
                    {
                        images.map((i, k) => (
                            <Text key={i} style={k == this.state.active ? style.paginActiveText : style.paginText}>⬤</Text>
                        ))
                    }
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width, 
        height
    },
    scroll: {
        width, 
        height
    },
    imagen: { 
        marginTop: -150,
        width, 
        height: 450, 
        resizeMode: 'contain' 
    },
    pagination: { 
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 0, 
        alignSelf: 'center' 
    },
    paginText: { 
        color: '#fff',
        margin: 3
    },
    paginActiveText: { 
        color: '#ff9300',
        margin: 3
    }
})