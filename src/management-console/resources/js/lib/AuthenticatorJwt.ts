import client from '@/api/client'
import { AxiosResponse } from 'axios'
import { Operator, LoginPostResponse } from '@/api'

class AuthenticatorJwt implements Authenticator<Operator> {
    async login(email: string, password: string): Promise<Operator> {
        const response: AxiosResponse<LoginPostResponse> = await client.postLogin(
            {
                email,
                password,
            }
        )

        localStorage.setItem('token', response.data.data.accessToken)
        localStorage.setItem(
            'tokenExpiresAt',
            expiresInToExpiresAt(response.data.data.expiresIn)
        )

        return response.data.data.operator
    }

    async logout(): Promise<void> {
        try {
            await client.postLogout()
        } catch (e) {
            console.log('e:', e)
        }
    }

    async getUser(): Promise<Operator> {
        const response: AxiosResponse<Operator> = await client.getMe()

        return response.data
    }
}

function expiresInToExpiresAt(expiresIn: number) {
    return new Date(new Date().getTime() + expiresIn * 1000).toString()
}

export default AuthenticatorJwt
