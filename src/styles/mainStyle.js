import { StyleSheet } from 'react-native'

const primary = '#d46f4d'
const secondary = '#ffbf66'
const darkPrimary = '#430c05'
const darkBackground = '#00353f'
const background = '#08c5d1'
export const Styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: background
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: primary,
    borderRadius: 20
  },
  item_favourite: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: secondary,
    borderRadius: 20
  },
  title: {
    fontSize: 24
  },
  subtitle: {
    fontSize: 18
  },
  subtitle_favourite: {
    fontSize: 18,
    color: darkPrimary
  },
  container: {
    backgroundColor: '#08c5d1',
    flex: 1,
    width: '100%',
    alignContent: 'center'
  },
  itemImage: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'flex-start'
  },
  error: {
    fontSize: 16,
    color: darkBackground,
    fontWeight: 'bold'
  },
  review_body: {
    backgroundColor: 'white'
  },
  rating: {
    fontSize: 24
  }
})
