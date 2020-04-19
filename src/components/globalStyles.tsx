
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { h, w, appColor } from '../constants'

const globalStyles = StyleSheet.create({
  headDrawer: { 
    height: 210, 
    backgroundColor: appColor//'#BE8F6C' 
  },
  scrollView: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  im: {
    position: 'absolute',
    height: h,
    width: w
  },
  screenWH: {
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
    marginHorizontal: 10,
    borderRadius: 10
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
    fontSize: 26,
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
    bottom: 100,
  },
  paddingBottom: {
    position: 'absolute',
    bottom: 50,
  },
  buttonContainer: {
    backgroundColor: appColor,
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
  buttonContentSp: {
    width: w*0.95,
    height: 45,
  },
  buttonContainerSp: {
    backgroundColor: '#009999',
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
    marginLeft: 40,
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
    marginTop: h*0.4,
    position: 'absolute',
    alignSelf: 'center',
  },
  positionCard: {
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
    width: w * 0.9,
    height: w * 0.7,
    alignSelf: 'center',
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
    fontSize: 20,
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
    marginVertical: 2,
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
    color: appColor,
    textAlign: 'center',
    fontSize: 18,
  },
  error: {
    marginTop: 5,
    color: 'red',
    marginBottom: -10,
    fontSize: 14
  },
  labelDropdown: {
    marginLeft: -8,
    marginBottom: -25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey'
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
    fontSize: 16,
    color: 'grey',
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
    height: 500, 
    marginTop: 45 
  },  
  sub: {
    alignItems: 'center',
    flexDirection: 'row',
  },  
  inputStyle: {
    fontSize: 16,
    paddingVertical: 0,
  },
  inputPaperWhite: {
    backgroundColor: '#fff',
  },
  inputPaper: {
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 40,
    backgroundColor: 'white'
  },
  cardUsersStyle:{ 
    marginHorizontal: 7, 
    padding: 5, 
    borderRadius: 10 
  },
});

export { globalStyles };