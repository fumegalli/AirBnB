import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {StatusBar, AsyncStorage, Platform} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import api from '../../services/api';
import {logo} from '../../assets';

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

const IS_IOS_DEVICE = Platform.OS === 'ios';

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
      const response = await api.post('/sessions', {
        email,
        password,
      });

      await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);

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
    <Container behavior="padding" enabled={IS_IOS_DEVICE}>
      <StatusBar hidden />
      <Logo source={logo} resizeMode="contain" />
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

SignIn.navigationOptions = {
  header: null,
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};
