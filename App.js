import React from 'react';
import { Clipboard } from 'react-native'
import { Container, Header, Item, Input, Title, Content, Left, Root, Toast, Footer, FooterTab, Button, Right, Body, Text } from 'native-base'
import { LinearGradient } from 'expo'

const darkGreen = '#3c9caa'
const lightGreen = '#73c2bd'
const white = '#f8f8f8'

const styles = {
  container: {
    backgroundColor: lightGreen,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  linearGradient: {
    flex: 1,
  },
  input: {
    backgroundColor: white,
  },
  button: {
    backgroundColor: darkGreen,
  },
  buttonText: {
    color: white,
    fontSize: 20,
    lineHeight: 20,
  },
}

export default class App extends React.Component {

  state = {
    url: ''
  }

  updateURL = url => this.setState({ url })

  async generateShortURL() {
    try {
      const raw = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(this.state.url)}`)
      const res = await raw.json()
      if (res.errormessage) {
        Toast.show({
          text: res.errormessage,
        })
      } else {
        Clipboard.setString(res.shorturl)
        Toast.show({
          text: 'Short URL copied!',
        })
      }
    } catch (e) {
      // Handle error
    }
  }

  render() {
    return (
      <Root>
        <Container style={styles.container}>
          <Header>
            <Left />
            <Body style={{ alignItems: 'center' }}>
              <Title>Tiny URL</Title>
            </Body>
            <Right />
          </Header>
          <LinearGradient
            colors={[darkGreen, lightGreen]}
            style={styles.linearGradient}
          >
            <Content contentContainerStyle={styles.content}>
              <Item rounded style={styles.input}>
                <Input
                  placeholder='Paste your long URL here'
                  onChangeText={url => this.updateURL(url)}
                  autoCapitalize='none'
                />
              </Item>
            </Content>
          </LinearGradient>
          <Footer>
            <FooterTab>
              <Button
                full
                style={styles.button}
                onPress={() => this.generateShortURL()}
              >
                <Text style={styles.buttonText}>Shorten!</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Root>
    )
  }
}
