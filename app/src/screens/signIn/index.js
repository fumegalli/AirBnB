import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {StatusBar, AsyncStorage} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleCreateAccountPress() {
    navigation.navigate('SignUp');
  }

  async function handleSignInPress() {
    if (email.length === 0 || password.length === 0) {
      setError('Preencha usuário e senha para continuar!');
      return;
    }

    try {
      const {
        data: {token},
      } = await api.post('/sessions', {
        email,
        password,
      });

      await AsyncStorage.setItem('@AirBnbApp:token', token);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})],
      });

      navigation.dispatch(resetAction);
    } catch (_err) {
      setError('Houve um problema com o login, verifique suas credenciais!');
    }
  }

  return (
    <Container>
      <StatusBar hidden />
      <Logo
        source={require('../../images/airbnb_logo.png')}
        resizeMode="contain"
      />
      <Input
        placeholder="Endereço de e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
      <Button onPress={handleSignInPress}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <SignUpLink onPress={handleCreateAccountPress}>
        <SignUpLinkText>Criar conta grátis</SignUpLinkText>
      </SignUpLink>
    </Container>
  );
}

SignIn.PropTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};
