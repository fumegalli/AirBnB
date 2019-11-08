import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {StatusBar} from 'react-native';

import {UserService} from '../../services/user';
import {logo} from '../../assets';

import {StackActions, NavigationActions} from 'react-navigation';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleBackToLoginPress() {
    navigation.goBack();
  }

  async function handleSignUpPress() {
    if (email.length === 0 || password.length === 0) {
      setError('Preencha usuário e senha para continuar!');
    } else {
      try {
        await UserService.create(username, email, password);

        setSuccess('Conta criada com sucesso! Redirecionando para o login');
        setError('');

        setTimeout(goToLogin, 2500);
      } catch (_err) {
        debugger;
        setError(
          'Houve um problema com o cadastro, verifique os dados preenchidos',
        );
      }
    }
  }

  function goToLogin() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'SignIn'})],
    });
    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <StatusBar hidden />
      <Logo source={logo} resizeMode="contain" />
      {success.length !== 0 && <SuccessMessage>{success}</SuccessMessage>}
      <Input
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
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
      <Button onPress={handleSignUpPress}>
        <ButtonText>Criar conta</ButtonText>
      </Button>
      <SignInLink onPress={handleBackToLoginPress}>
        <SignInLinkText>Voltar ao login</SignInLinkText>
      </SignInLink>
    </Container>
  );
}

SignUp.navigationOptions = {
  header: null,
};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
