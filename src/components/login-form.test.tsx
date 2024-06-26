/* eslint-disable max-lines-per-function */
import React from 'react'

import {getLanguage} from '@/core'
import {cleanup, fireEvent, render, screen, waitFor} from '@/core/test-utils'

import type {LoginFormProps} from './login-form'
import {LoginForm} from './login-form'

afterEach(cleanup)

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn()

describe('LoginForm Form ', () => {
  it('renders correctly', async () => {
    const local = getLanguage()

    render(<LoginForm />)
    expect(
      await screen.findByText(local === 'en' ? /Sign in/i : /Iniciar sesión/i),
    ).toBeOnTheScreen()
  })

  it('should display required error when values are empty', async () => {
    render(<LoginForm />)

    const local = getLanguage()
    const button = screen.getByTestId('login-button')
    expect(
      screen.queryByText(
        local === 'en' ? /Invalid email format/i : /Se requiere correo electrónico/i,
      ),
    ).not.toBeOnTheScreen()
    fireEvent.press(button)
    expect(
      await screen.findByText(
        local === 'en' ? /Invalid email format/i : /Se requiere correo electrónico/i,
      ),
    ).toBeOnTheScreen()
    expect(
      screen.getByText(
        local === 'en' ? /Password is required/i : /Se requiere correo electrónico/i,
      ),
    ).toBeOnTheScreen()
  })

  it('should display matching error when email is invalid', async () => {
    render(<LoginForm />)

    const local = getLanguage()
    const button = screen.getByTestId('login-button')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    fireEvent.changeText(emailInput, 'yyyyy')
    fireEvent.changeText(passwordInput, 'test')
    fireEvent.press(button)

    expect(
      screen.queryByText(
        local === 'en' ? /Invalid email format/i : /Correo electrónico no válido/i,
      ),
    ).not.toBeOnTheScreen()
    expect(
      await screen.findByText(
        local === 'en' ? /Invalid email format/i : /Correo electrónico no válido/i,
      ),
    ).toBeOnTheScreen()
  })

  it('Should call LoginForm with correct values when values are valid', async () => {
    render(<LoginForm onSubmit={onSubmitMock} />)

    const button = screen.getByTestId('login-button')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    fireEvent.changeText(emailInput, 'youssef@gmail.com')
    fireEvent.changeText(passwordInput, 'password')
    fireEvent.press(button)
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })
    // undefined because we don't use second argument of the  SubmitHandler
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        email: 'youssef@gmail.com',
        password: 'password',
      },
      undefined,
    )
  })
})
