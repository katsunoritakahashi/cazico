interface Authenticator<E> {
    login(email: string, password: string): Promise<E>
    logout(): void
    getUser(): Promise<E>
}
