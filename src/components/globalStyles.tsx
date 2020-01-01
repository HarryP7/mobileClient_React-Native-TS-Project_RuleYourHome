
import {
  StyleSheet
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { h, w, ColorApp } from '../constants'

const globalStyles = StyleSheet.create({
  headDrawer: { 
    height: 200, 
    backgroundColor: '#BE8F6C' 
  },
  im: {
    position: 'absolute',
    height: h,
    width: w
  },
  imScroll: {
    position: 'absolute',
    height: h+h,
    width: w
  },
  cardStyle: {
    paddingBottom: 30,
    marginHorizontal: 5,
    borderRadius: 10
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  bodySp: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
  },
  body: {
    backgroundColor: '#d9d9d9',
    height: h,
  },
  background: {
    position: 'absolute',
    backgroundColor: 'lightsteelblue',
  },
  container: {
    marginTop: 10,
  },
  sectionContainer: {
    backgroundColor: '#009999',
    height: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'AwenirNext-DemiBold'
  },
  sectionDescription: {
    paddingTop: 50,
    paddingHorizontal: 24,
    fontSize: 18,
    color: Colors.dark,
    textAlign: 'justify',
    padding: 10,
  },
  image: {
    position: 'absolute',
    width: 150,
    height: 150,
    alignSelf: 'center',
    bottom: 70,
  },
  paddingBottom: {
    width: 200,
    position: 'absolute',
    bottom: 50,
  },
  buttonContainer: {
    backgroundColor: '#92582D',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 10
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
  },
  buttonContainerSp: {
    backgroundColor: '#009999',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonTitleSp: {
    fontSize: 18,
    color: '#fff',
  },
  imageIcon: {
    width: 130,
    height: 130,
    borderRadius: 60
  },
  imageCont: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginLeft: 20,
    marginTop: 20,
    paddingBottom: 30,
  },
  back: {
    marginLeft: 170,
    marginBottom: -60,
    borderRadius: 50,
    padding: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  menu: {
    marginTop: 20,
    marginLeft: 20,
    width: 140,
    height: 140,
  },
  flex: {
    marginLeft: 120,
    marginRight: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconMin: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    marginTop: 50,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },    
  button3: {
    marginTop: 20,
    width: 200,
  },
  button4: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  images: {
    width: w,
    height: w * 0.7,
    borderRadius: 10,
  },
  noImages: {
    alignSelf: 'center',
    width: w * 0.4,
    height: w * 0.4,
    borderRadius: 10,
  },
  h1: {
    paddingHorizontal: 15,
    fontSize: 24,
    width: w,
    fontWeight: 'bold',
  },
  h2: {
    padding: 15,
    fontSize: 18,
    textAlign: 'center'
  },
  h3: {
    paddingLeft: 15,
    marginVertical: 5,
    fontSize: 18,
  },
  icon2: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 18,
  },
  textInput: {
    width: w * 0.8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  flex2: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    paddingVertical: 15,
    color: ColorApp,
    textAlign: 'center',
    fontSize: 18,
  },
  error: {
    marginTop: 5,
    color: 'red',
    marginBottom: -10
  },
  labelDropdown: {
    marginLeft: -8,
    marginBottom: -25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 18,
    //color: 'white',
    fontWeight: 'bold',
    marginLeft: -7
  },
  label3: {
    backgroundColor: 'white', 
    borderRadius: 10,
    margin: 5, 
    paddingBottom: 8,
    borderColor: '#ccc'
  },
  label: {
    marginTop: -10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },  
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignContent: 'flex-start',
  },
  contStyle: {
    marginTop: -25,
    paddingHorizontal: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  dropdownStyle: {
    height: 500
  },  
  sub: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export { globalStyles };